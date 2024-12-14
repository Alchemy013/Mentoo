export interface Database {
  public: {
    Tables: {
      stories: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          author: string;
          category: 'Legal' | 'Workplace' | 'Personal' | 'Other';
          content: string;
          likes: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          author: string;
          category: 'Legal' | 'Workplace' | 'Personal' | 'Other';
          content: string;
          likes?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          author?: string;
          category?: 'Legal' | 'Workplace' | 'Personal' | 'Other';
          content?: string;
          likes?: number;
        };
      };
      story_likes: {
        Row: {
          user_id: string;
          story_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          story_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          story_id?: string;
          created_at?: string;
        };
      };
    };
    Functions: {
      increment_likes: {
        Args: {
          story_id: string;
          user_id: string;
        };
        Returns: void;
      };
    };
  };
}