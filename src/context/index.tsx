import { FavoriteCreatorsProvider } from './FavoriteCreatorsContext';
import { PreferDarkThemeProvider } from './PreferDarkThemeContext';
import { ScrollMangerProvider } from './ScrollMangerContext';

/**
 * this is a context provider wrapper meant to help make the code a bit more clean
 *
 * it's meant to be used at the app root's index.tsx level
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GlobalContextProvider({ children }: { children: any }) {
  return (
    <PreferDarkThemeProvider>
      <FavoriteCreatorsProvider>
        <ScrollMangerProvider>{children}</ScrollMangerProvider>
      </FavoriteCreatorsProvider>
    </PreferDarkThemeProvider>
  );
}
