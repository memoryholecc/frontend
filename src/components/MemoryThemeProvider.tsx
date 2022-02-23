import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { MemoryTheming, PREFER_DARK_THEME_KEY } from '../utils/MemoryTheming';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MemoryThemeProvider(props: any) {
  useEffect(() => {
    let theme = localStorage.getItem(PREFER_DARK_THEME_KEY);
    // default base case: if the user has not set a preference, it will automatically assume using light mode
    if (theme === null) {
      localStorage.setItem(PREFER_DARK_THEME_KEY, 'false');
      theme = 'false';
    }

    // check if the result is neither "true" or "false"
    if (theme !== 'true' && theme !== 'false') {
      // the option is malformed, so we will default to light mode
      localStorage.setItem(PREFER_DARK_THEME_KEY, 'false');
    }
  }, []);

  return (
    <ThemeProvider theme={MemoryTheming()}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
