export interface Story {
  id: string;
  title: string;
  author: string;
  category: 'Legal' | 'Workplace' | 'Personal' | 'Other';
  content: string;
  date: string;
  likes: number;
  liked?: boolean;
}

export interface StoryFormData {
  title: string;
  author: string;
  category: Story['category'];
  content: string;
}