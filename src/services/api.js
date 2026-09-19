/**
 * DoableForge API Client Service
 * Connects frontend components to the FastAPI backend with resilient fallback.
 */
const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "");

// Helper fetch wrapper with timeout
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { ...config, signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.detail || `HTTP Error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[DoableForge API] Request to ${endpoint} failed:`, err.message);
    throw err;
  }
}

// ----------------------------------------------------------------------
// 1. Projects API
// ----------------------------------------------------------------------
export async function fetchProjects(category = "All", search = "") {
  try {
    const params = new URLSearchParams();
    if (category && category !== "All") params.append("category", category);
    if (search && search.trim()) params.append("search", search.trim());
    
    const queryStr = params.toString() ? `?${params.toString()}` : "";
    return await request(`/projects${queryStr}`);
  } catch (err) {
    return null; // Signals component to use cached state fallback
  }
}

export async function fetchProjectDetail(projectId) {
  return await request(`/projects/${projectId}`);
}

export async function createProject(projectData) {
  return await request("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  });
}

export async function claimMilestone(projectId, specialistHandle) {
  return await request(`/projects/${projectId}/claim`, {
    method: "POST",
    body: JSON.stringify({ specialist_handle: specialistHandle }),
  });
}

// ----------------------------------------------------------------------
// 2. Pre-Verified Specialists API
// ----------------------------------------------------------------------
export async function fetchSpecialists(search = "") {
  try {
    const params = new URLSearchParams();
    if (search && search.trim()) params.append("search", search.trim());
    
    const queryStr = params.toString() ? `?${params.toString()}` : "";
    return await request(`/specialists${queryStr}`);
  } catch (err) {
    return null;
  }
}

export async function applySpecialistAudit(applicationData) {
  return await request("/specialists/apply", {
    method: "POST",
    body: JSON.stringify(applicationData),
  });
}

// ----------------------------------------------------------------------
// 3. Topology Graph API
// ----------------------------------------------------------------------
export async function fetchTopology() {
  try {
    return await request("/topology");
  } catch (err) {
    return null;
  }
}

// ----------------------------------------------------------------------
// 4. Contact & Client Advisory API
// ----------------------------------------------------------------------
export async function submitContactInquiry(inquiryData) {
  return await request("/contact", {
    method: "POST",
    body: JSON.stringify(inquiryData),
  });
}

// ----------------------------------------------------------------------
// 5. System Health Check
// ----------------------------------------------------------------------
export async function checkHealth() {
  try {
    return await request("/health");
  } catch (err) {
    return { status: "offline", error: err.message };
  }
}
