import { useMemo } from 'react';
import { getAllPosts } from '../lib/blog';

export const useBlogPosts = () => {
  return useMemo(() => getAllPosts(), []);
};
