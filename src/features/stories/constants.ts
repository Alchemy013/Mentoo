import { MdInfo, MdSecurity, MdPeople, MdGavel, MdReport } from 'react-icons/md';

export const GUIDELINES = [
  {
    icon: MdInfo,
    text: 'Share your experience respectfully'
  },
  {
    icon: MdSecurity,
    text: 'Maintain anonymity if preferred'
  },
  {
    icon: MdGavel,
    text: 'Focus on facts and personal experiences'
  },
  {
    icon: MdPeople,
    text: 'Be supportive of others'
  },
  {
    icon: MdReport,
    text: 'Avoid hate speech or discrimination'
  }
];

export const INITIAL_FORM_STATE = {
  title: '',
  author: 'Anonymous',
  category: 'Legal' as const,
  content: ''
};