import React from 'react';
import { createTheme, Theme } from '@mui/material';
import { createMakeAndWithStyles } from 'tss-react';
import { usePreferDarkTheme } from 'context/PreferDarkThemeContext';

export const PREFER_DARK_THEME_KEY = 'prefer_dark_theme';

export const { makeStyles } = createMakeAndWithStyles({ useTheme: MemoryTheming });

export function MemoryTheming(): Theme {
  const prefersDarkMode = usePreferDarkTheme();

  return React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: [
            'Assistant',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1280,
            xl: 1536,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: 'rgba(0, 0, 0, 0.87)',
              },
            },
          },
          MuiContainer: {
            styleOverrides: {
              maxWidthLg: {
                maxWidth: '1280px',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                padding: '15px',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                // Paper elements by default have a gradient background-image.
                // This is not visible in light mode but causes issues in dark mode.
                backgroundImage: 'none',
              },
            },
          },
          MuiTypography: {
            defaultProps: {
              color: 'textPrimary',
            },
          },
        },
        palette: {
          background: {
            default: prefersDarkMode ? '#121212' : '#ffffff',
            paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
          },
          primary: {
            main: prefersDarkMode ? '#111111' : '#6c256b',
          },
          secondary: {
            main: prefersDarkMode ? '#4c134b' : '#ffd1bc',
          },
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
}
