const API_URL = "http://localhost:8000/api";

// ======================
// Upload Document
// ======================

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}

// ======================
// Query AI
// ======================

export async function queryAI(question: string) {
  try {
    const response = await fetch(`${API_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    });

    if (!response.ok) {
      throw new Error("Query failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
}

// ======================
// AI Insights
// ======================

export async function getInsights() {
  try {
    const response = await fetch(`${API_URL}/insights`);

    if (!response.ok) {
      throw new Error("Failed to load insights");
    }

    return await response.json();
  } catch (error) {
    console.error("Insights Error:", error);
    throw error;
  }
}

// ======================
// Compare Documents
// ======================

export async function compareDocuments(
  documentA: string,
  documentB: string
) {
  try {
    const response = await fetch(`${API_URL}/compare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_a: documentA,
        event_b: documentB,
      }),
    });

    if (!response.ok) {
      throw new Error("Comparison failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Compare Error:", error);
    throw error;
  }
}
// ======================
// Dashboard Stats
// ======================

export async function getDashboardStats() {
  try {
    const response = await fetch(`${API_URL}/dashboard`);

    if (!response.ok) {
      throw new Error("Failed to load dashboard");
    }

    return await response.json();
  } catch (error) {
    console.error("Dashboard Error:", error);

    return {
      knowledge_assets: 0,
      documents: 0,
      insights: 0,
      members: 0,
    };
  }
}