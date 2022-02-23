import React from 'react';
import { Skeleton } from '@mui/material';
import { useState } from 'react';

interface ImageOrSkeletonProps {
  src: string;

  /** Applies to both the Skeleton and img elements. */
  style?: React.CSSProperties;
}

/** Displays a Skeleton until an image has loaded. */
export function ImageOrSkeleton(props: ImageOrSkeletonProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton animation="wave" variant="rectangular" style={props.style} />}
      <img
        src={props.src}
        style={{ display: loaded ? undefined : 'none', ...props.style }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
