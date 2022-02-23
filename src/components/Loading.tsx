import React from 'react';
import { LinearProgress } from '@mui/material';

export function Loading(): JSX.Element {
  return <LinearProgress color="secondary" style={{ marginTop: '-20px' }} />;
}
