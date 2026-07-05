// ======================
// Upload
// ======================

export interface UploadResponse {
  document_id: string;
  filename: string;
  file_type: string;
  file_path: string;
  status: string;
}

// ======================
// Query
// ======================

export interface QueryResponse {
  answer: string;
  sources: string[];
}

// ======================
// Insights
// ======================

export interface InsightsResponse {
  success_patterns: string[];
  recurring_problems: string[];
  recommendations: string[];
}

// ======================
// Compare
// ======================

export interface CompareResponse {
  differences: string;
  strengths: string;
  weaknesses: string;
  lessons: string;
}
// ======================
// Dashboard
// ======================

export interface DashboardStats {
  knowledge_assets: number;
  documents: number;
  insights: number;
  members: number;
}