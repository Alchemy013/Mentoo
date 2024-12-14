import { useState } from 'react';
import type { StoryFormData } from '../types';
import { INITIAL_FORM_STATE } from '../constants';

interface FormErrors {
  title?: string;
  content?: string;
}

export function useStoryForm(onSubmit: (data: StoryFormData) => void) {
  const [formData, setFormData] = useState<StoryFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.title.length < 3 || formData.title.length > 200) {
      newErrors.title = 'Title must be between 3 and 200 characters';
    }

    if (formData.content.length < 10) {
      newErrors.content = 'Story must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof StoryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      resetForm();
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm
  };
}