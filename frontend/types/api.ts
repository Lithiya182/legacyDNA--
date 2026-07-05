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
  supporting_memories: string[];
}

// ======================
// Insights
// ======================

export interface InsightItem {
  insight: string;
  source_documents: string[];
}

export interface RecommendationItem {
  recommendation: string;
  reason: string;
  supporting_evidence: string;
  source_documents: string[];
}

export interface InsightsResponse {
  success_patterns: InsightItem[];
  recurring_problems: InsightItem[];
  recommendations: RecommendationItem[];
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