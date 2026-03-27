export interface SurveyResponse {
  id: string;
  created_at: string;
  meetup_name: string;
  name: string | null;
  email: string | null;
  background: string;
  how_heard: string;
  overall_rating: number;
  most_valuable: string | null;
  improvement: string | null;
  venue_rating: number | null;
  would_return: string;
  ai_tools_used: string[];
  ai_use_cases: string[];
  tools_curious: string | null;
  experience_level: string;
  biggest_challenge: string | null;
  next_topics: string[];
  preferred_format: string | null;
  other_feedback: string | null;
}

export interface SurveyFormData {
  name: string;
  email: string;
  background: string;
  how_heard: string;
  overall_rating: number;
  most_valuable: string;
  improvement: string;
  venue_rating: number;
  would_return: string;
  ai_tools_used: string[];
  ai_use_cases: string[];
  tools_curious: string;
  experience_level: string;
  biggest_challenge: string;
  next_topics: string[];
  preferred_format: string;
  other_feedback: string;
}
