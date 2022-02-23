import React from 'react';
import { Card, CardContent, Skeleton, Typography } from '@mui/material';

/**
 * Generates a given number of minimal post skeletons.
 *
 * Caution: Do NOT use as a template for functional post elements.
 *
 * @param count The number of skeletons to generate.
 * @returns An array of skeleton elements.
 */
export default function SkeletonPostViewer(count = 16): JSX.Element[] {
  const ret: JSX.Element[] = [];
  for (let i = 0; i < count; i++) {
    ret.push(
      <Card
        raised
        key={i}
        style={{
          width: '275px',
          height: '400px',
          margin: '12px 6px',
          borderRadius: '10px',
        }}
      >
        <Skeleton animation="wave" variant="rectangular" height="150px" />
        <CardContent>
          <Typography color="textSecondary" variant="body2">
            <Skeleton width="15ch" />
          </Typography>

          <Typography
            color="textPrimary"
            variant="h5"
            style={{ fontWeight: 600 }}
            gutterBottom
            noWrap
          >
            <Skeleton />
          </Typography>

          <Typography style={{ height: '400px' }}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton width="10ch" />
          </Typography>
        </CardContent>
      </Card>,
    );
  }

  return ret;
}
