import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Loading } from 'components/Loading';
import { makeStyles } from 'utils/MemoryTheming';
import { Theme } from '@mui/material';
import { useGetScrollPosition } from 'context/ScrollMangerContext';

const HomePage = lazy(() => import('./routes/home'));
const CreatorPage = lazy(() => import('./routes/creator'));
const PatreonPostPage = lazy(() => import('./routes/post/patreon'));
const ImportPage = lazy(() => import('./routes/import'));
const ImportSuccessPage = lazy(() => import('./routes/import/success'));
const AboutPage = lazy(() => import('./routes/about'));

// disabling the Browser scrollRestoration feature
window.history.scrollRestoration = 'manual';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
  },
}));

export default function App(): JSX.Element {
  // This hack is used to apply styling to the body element.
  const { classes } = useStyles();
  document.body.className = classes.root;

  return (
    <BrowserRouter>
      {/**
       * This is the only way I could think of to get the footer to go to the bottom of the screen if the page does not take up the full screen.
       * 85px is the height of the footer and 50px is the padding between it and the page content.
       */}
      <div style={{ minHeight: 'calc(100vh - 85px - 50px)' }}>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/creator/:id" element={<CreatorPage />} />
            <Route path="/post/patreon/:id" element={<PatreonPostPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/import/success/:id" element={<ImportSuccessPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
