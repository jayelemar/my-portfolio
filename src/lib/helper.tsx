'use client';

export const getOffset = (desktopOffset:number, mobileOffset:number): number => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 1024 ? desktopOffset : mobileOffset;
  }
  return 0;
};