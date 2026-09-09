import React, { useEffect, useRef, useState, useCallback } from "react";

export default function ScrollCanvas({
  totalFrames = 240,
  containerRef,
  className = "",
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(totalFrames + 1).fill(null));
  const loadingStatusRef = useRef(new Array(totalFrames + 1).fill(false));
  const loadedCountRef = useRef(0);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const lastRenderedFrameRef = useRef(-1);
  const animationFrameIdRef = useRef(null);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const isReducedMotionRef = useRef(false);

  // Helper to format frame path: /frames/frame_001.png through /frames/frame_240.png
  const getFrameSrc = useCallback((index) => {
    const padded = String(index).padStart(3, "0");
    return `/frames/frame_${padded}.png`;
  }, []);

  // Find closest loaded frame if target is still loading during rapid scrub
  const getNearestLoadedImage = useCallback((targetIndex) => {
    const clampedTarget = Math.max(1, Math.min(totalFrames, Math.round(targetIndex)));
    const direct = imagesRef.current[clampedTarget];
    if (direct && direct.complete && direct.naturalWidth > 0) {
      return direct;
    }

    // Search outwards for closest available frame
    for (let offset = 1; offset < totalFrames; offset++) {
      const left = clampedTarget - offset;
      if (left >= 1) {
        const img = imagesRef.current[left];
        if (img && img.complete && img.naturalWidth > 0) return img;
      }
      const right = clampedTarget + offset;
      if (right <= totalFrames) {
        const img = imagesRef.current[right];
        if (img && img.complete && img.naturalWidth > 0) return img;
      }
    }
    return null;
  }, [totalFrames]);

  // 60FPS Hardware-accelerated canvas renderer
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = getNearestLoadedImage(frameIndex);
    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (!imgWidth || !imgHeight) return;

    // Cover scale calculation
    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (canvasWidth - imgWidth * ratio) / 2;
    const centerShiftY = (canvasHeight - imgHeight * ratio) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight,
      centerShiftX,
      centerShiftY,
      imgWidth * ratio,
      imgHeight * ratio
    );

    lastRenderedFrameRef.current = Math.round(frameIndex);
  }, [getNearestLoadedImage]);

  // Handle high-DPI responsive canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      renderFrame(currentFrameRef.current);
    }
  }, [renderFrame]);

  // Single frame image loader with caching
  const loadImage = useCallback((index) => {
    if (imagesRef.current[index]) {
      return Promise.resolve(imagesRef.current[index]);
    }
    if (loadingStatusRef.current[index]) {
      return Promise.resolve(null);
    }

    loadingStatusRef.current[index] = true;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (typeof img.decode === "function") {
          img.decode()
            .then(() => {
              imagesRef.current[index] = img;
              loadedCountRef.current++;
              setLoadProgress(Math.round((loadedCountRef.current / totalFrames) * 100));
              resolve(img);
            })
            .catch(() => {
              imagesRef.current[index] = img;
              loadedCountRef.current++;
              setLoadProgress(Math.round((loadedCountRef.current / totalFrames) * 100));
              resolve(img);
            });
        } else {
          imagesRef.current[index] = img;
          loadedCountRef.current++;
          setLoadProgress(Math.round((loadedCountRef.current / totalFrames) * 100));
          resolve(img);
        }
      };

      img.onerror = (err) => {
        loadingStatusRef.current[index] = false;
        reject(err);
      };

      img.src = getFrameSrc(index);
    });
  }, [getFrameSrc, totalFrames]);

  // Progressive 60FPS Preload Architecture
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isCancelled = false;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mediaQuery.matches;
    const motionListener = (e) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", motionListener);

    // 1. Instant priority load for starting frame
    loadImage(1)
      .then(() => {
        if (isCancelled) return;
        setIsFirstFrameReady(true);
        handleResize();
        renderFrame(1);
      })
      .catch((e) => {
        console.warn("Starting frame load issue:", e);
      });

    // 2. High-speed burst for first 30 frames
    const initialBurst = async () => {
      const burstFrames = [];
      for (let i = 2; i <= Math.min(30, totalFrames); i++) {
        burstFrames.push(i);
      }
      for (let i = 0; i < burstFrames.length; i += 4) {
        if (isCancelled) return;
        await Promise.allSettled(burstFrames.slice(i, i + 4).map(loadImage));
      }
    };

    // 3. Staggered keyframe coverage across all 240 frames (every 4th frame)
    const keyframeBurst = async () => {
      await initialBurst();
      const keyframes = [];
      for (let i = 31; i <= totalFrames; i += 4) {
        keyframes.push(i);
      }
      for (let i = 0; i < keyframes.length; i += 4) {
        if (isCancelled) return;
        await Promise.allSettled(keyframes.slice(i, i + 4).map(loadImage));
      }

      // 4. Fill in remaining frames smoothly in background pools
      const remaining = [];
      for (let i = 1; i <= totalFrames; i++) {
        if (!imagesRef.current[i]) remaining.push(i);
      }
      const BATCH_SIZE = 6;
      for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
        if (isCancelled) return;
        await Promise.allSettled(remaining.slice(i, i + BATCH_SIZE).map(loadImage));
      }
    };

    keyframeBurst();

    return () => {
      isCancelled = true;
      mediaQuery.removeEventListener("change", motionListener);
    };
  }, [totalFrames, loadImage, handleResize, renderFrame]);

  // Scroll tracking: Map scroll progress in container to frame index 1..totalFrames
  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculateScrollProgress = () => {
      const container = containerRef?.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDist = container.offsetHeight - viewportHeight;

      if (totalScrollableDist <= 0) {
        targetFrameRef.current = 1;
        return;
      }

      // Progress 0 when container top is at viewport top; 1 when container bottom reaches viewport bottom
      const scrolledPastTop = -rect.top;
      const totalProgress = Math.min(Math.max(scrolledPastTop / totalScrollableDist, 0), 1);

      // Complete 100% of the frames by 88% of the pinned scroll distance
      const FRAME_SCRUB_RATIO = 0.88;
      const frameProgress = Math.min(Math.max(totalProgress / FRAME_SCRUB_RATIO, 0), 1);

      // Map 0% -> frame 1, 100% -> frame 240
      const mapped = 1 + frameProgress * (totalFrames - 1);
      targetFrameRef.current = mapped;

      // Opportunistic Look-Ahead: dynamically preload neighboring frames around target
      const currentTargetInt = Math.round(mapped);
      for (let delta = 1; delta <= 8; delta++) {
        const next = currentTargetInt + delta;
        if (next <= totalFrames && !imagesRef.current[next]) {
          loadImage(next);
        }
        const prev = currentTargetInt - delta;
        if (prev >= 1 && !imagesRef.current[prev]) {
          loadImage(prev);
        }
      }

      // If user prefers reduced motion, snap immediately
      if (isReducedMotionRef.current) {
        currentFrameRef.current = mapped;
        renderFrame(mapped);
      }
    };

    window.addEventListener("scroll", calculateScrollProgress, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    calculateScrollProgress();
    handleResize();

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, totalFrames, loadImage, handleResize, renderFrame]);

  // Persistent 60 FPS RAF loop with sub-frame fluid lerp easing
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isActive = true;

    const loop = () => {
      if (!isActive) return;

      if (!isReducedMotionRef.current) {
        const target = targetFrameRef.current;
        const current = currentFrameRef.current;
        const diff = target - current;

        // 60FPS fluid ease: dynamic lerp factor adapts to scroll velocity
        if (Math.abs(diff) > 0.002) {
          const lerpFactor = Math.min(0.2, Math.max(0.12, Math.abs(diff) * 0.025));
          currentFrameRef.current += diff * lerpFactor;
          const frameToDraw = Math.round(currentFrameRef.current);
          if (frameToDraw !== lastRenderedFrameRef.current) {
            renderFrame(frameToDraw);
          }
        } else if (current !== target) {
          currentFrameRef.current = target;
          const frameToDraw = Math.round(target);
          if (frameToDraw !== lastRenderedFrameRef.current) {
            renderFrame(frameToDraw);
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isActive = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#06080e] ${className}`}>
      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover select-none pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isFirstFrameReady ? 1 : 0,
        }}
      />

      {/* Cinematic Vignette & Atmospheric Contrast Gradients */}
      <div 
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(6, 8, 14, 0.6) 100%),
            linear-gradient(to bottom, rgba(6, 8, 14, 0.65) 0%, transparent 20%, transparent 80%, rgba(6, 8, 14, 0.95) 100%)
          `
        }}
      />

      {/* Ambient Apple Sky Blue & Oceanic Depth Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-sky-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-blue-600/10 blur-[150px]" />

      {/* Loading Indicator Pill (Fades once first frame renders) */}
      {!isFirstFrameReady && (
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#080d1a]/80 border border-white/15 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span className="font-mono text-xs text-zinc-300">Initializing Cinema Stream...</span>
        </div>
      )}
    </div>
  );
}
