import React from 'react';
import { createContext, useContext, useState } from 'react';
import { PREFER_DARK_THEME_KEY } from 'utils/MemoryTheming';

const PreferDarkThemeContext = createContext(false);
export function usePreferDarkTheme() {
  return useContext(PreferDarkThemeContext);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const UpdatePreferDarkThemeContext = createContext(() => {});
export function useUpdatePreferDarkTheme() {
  return useContext(UpdatePreferDarkThemeContext);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PreferDarkThemeProvider(props: any) {
  const preferDarkThemeLocalStorage = localStorage.getItem(PREFER_DARK_THEME_KEY);
  const preferDarkThemeValue = preferDarkThemeLocalStorage === 'true';

  const [preferDarkTheme, setPreferDarkTheme] = useState(preferDarkThemeValue);

  function toggleDarkTheme() {
    localStorage.setItem(PREFER_DARK_THEME_KEY, String(!preferDarkTheme));
    setPreferDarkTheme((theme) => !theme);
  }

  return (
    <PreferDarkThemeContext.Provider value={preferDarkTheme}>
      <UpdatePreferDarkThemeContext.Provider value={toggleDarkTheme}>
        {props.children}
      </UpdatePreferDarkThemeContext.Provider>
    </PreferDarkThemeContext.Provider>
  );
}
