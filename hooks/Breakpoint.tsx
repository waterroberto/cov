import { useCallback, useEffect, useMemo, useState } from 'react';

// Define the breakpoints
const breakpoints = {
  xs: 0, // Extra small (mobile)
  sm: 640, // Small (tablet)
  md: 768, // Medium (small laptop)
  lg: 1024, // Large (desktop)
  xl: 1280, // Extra large (large desktop)
  xxl: 1356, // Extra large (large desktop)
} as const;

type Breakpoints = keyof typeof breakpoints;

export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<
    Breakpoints | undefined
  >();

  // Function to determine the current breakpoint based on window width
  const updateBreakpoint = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xxl');
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    }
  }, []);

  // Lifecycle management: Add and remove the resize event listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateBreakpoint(); // Initial check
      window.addEventListener('resize', updateBreakpoint);
    }

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, [updateBreakpoint]);

  // Memoized values for each breakpoint
  const xs = useMemo(() => currentBreakpoint === 'xs', [currentBreakpoint]);
  const sm = useMemo(() => currentBreakpoint === 'sm', [currentBreakpoint]);
  const md = useMemo(() => currentBreakpoint === 'md', [currentBreakpoint]);
  const lg = useMemo(() => currentBreakpoint === 'lg', [currentBreakpoint]);
  const xl = useMemo(() => currentBreakpoint === 'xl', [currentBreakpoint]);
  const xxl = useMemo(() => currentBreakpoint === 'xxl', [currentBreakpoint]);

  // Helper functions for comparisons
  const isGreater = useCallback((breakpoint: Breakpoints) => {
    if (typeof window !== 'undefined')
      return window.innerWidth > breakpoints[breakpoint];
  }, []);

  const isGreaterOrEqualTo = useCallback((breakpoint: Breakpoints) => {
    if (typeof window !== 'undefined')
      return window.innerWidth >= breakpoints[breakpoint];
  }, []);

  const isSmaller = useCallback((breakpoint: Breakpoints) => {
    if (typeof window !== 'undefined')
      return window.innerWidth < breakpoints[breakpoint];
  }, []);

  const isSmallerOrEqualTo = useCallback((breakpoint: Breakpoints) => {
    if (typeof window !== 'undefined')
      return window.innerWidth <= breakpoints[breakpoint];
  }, []);

  return {
    currentBreakpoint,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    isGreater,
    isGreaterOrEqualTo,
    isSmaller,
    isSmallerOrEqualTo,
  };
};