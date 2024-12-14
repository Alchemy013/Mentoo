import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../auth/context/AuthContext';
import type { Story, StoryFormData } from '../types';
import { formatDate } from '../utils';

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPostedStory, setHasPostedStory] = useState(false);
  const { user } = useAuth();

  const checkUserStory = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setHasPostedStory(!!data);
    } catch (error) {
      console.error('Error checking user story:', error);
    }
  }, [user]);

  const fetchStories = useCallback(async () => {
    try {
      const { data: storiesData, error: storiesError } = await supabase
        .from('stories')
        .select(`
          *,
          story_likes (
            user_id
          )
        `)
        .order('likes', { ascending: false })
        .order('created_at', { ascending: false });

      if (storiesError) throw storiesError;

      const formattedStories: Story[] = storiesData.map(story => ({
        id: story.id,
        title: story.title,
        author: story.author,
        category: story.category,
        content: story.content,
        date: formatDate(new Date(story.created_at)),
        likes: story.likes,
        liked: story.story_likes?.some(like => like.user_id === user?.id) || false
      }));

      setStories(formattedStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStories();
    checkUserStory();
  }, [fetchStories, checkUserStory]);

  const addStory = useCallback(async (formData: StoryFormData) => {
    if (!user) {
      toast.error('Please sign in to share your story');
      return;
    }

    if (hasPostedStory) {
      toast.error('You can only share one story');
      return;
    }

    try {
      const { error } = await supabase
        .from('stories')
        .insert([{
          title: formData.title,
          author: formData.author || 'Anonymous',
          category: formData.category,
          content: formData.content,
          likes: 0,
          user_id: user.id
        }]);

      if (error) throw error;

      toast.success('Story shared successfully!');
      setHasPostedStory(true);
      fetchStories();
    } catch (error: any) {
      console.error('Error adding story:', error);
      if (error.message.includes('content_length')) {
        toast.error('Story content must be at least 10 characters long');
      } else if (error.message.includes('title_length')) {
        toast.error('Title must be between 3 and 200 characters');
      } else {
        toast.error('Failed to share story');
      }
    }
  }, [user, hasPostedStory, fetchStories]);

  const likeStory = useCallback(async (storyId: string) => {
    if (!user) {
      toast.error('Please sign in to like stories');
      return;
    }

    try {
      const { error } = await supabase.rpc('increment_likes', {
        story_id: storyId,
        user_id: user.id
      });

      if (error) throw error;

      setStories(prevStories => 
        prevStories.map(story => {
          if (story.id === storyId) {
            return {
              ...story,
              liked: true,
              likes: story.likes + 1
            };
          }
          return story;
        })
      );

      fetchStories();
    } catch (error) {
      console.error('Error liking story:', error);
      toast.error('Failed to like story');
      fetchStories();
    }
  }, [user, fetchStories]);

  return {
    stories,
    loading,
    addStory,
    likeStory,
    hasPostedStory
  };
}