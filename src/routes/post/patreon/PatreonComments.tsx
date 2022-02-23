import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { PatreonComment } from 'generated/graphql';
import { unescape } from 'html-escaper';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import UTC from 'dayjs/plugin/utc';

export default function PatreonComments(comments: PatreonComment[]): JSX.Element {
  // RelativeTime
  dayjs.extend(RelativeTime);
  dayjs.extend(UTC);

  return (
    <>
      {/* Displays the number of comments */}
      <Typography color="textPrimary" variant="subtitle1" style={{ fontWeight: 600 }} gutterBottom>
        {comments.length}
        {comments.length === 1 ? ' Comment' : ' Comments'}
      </Typography>

      {/* The actual comments */}
      {comments.map((comment: PatreonComment) => {
        return (
          <Grid key={comment.id} container spacing={2} style={{ margin: '8px' }}>
            <Grid item style={{ padding: '8px' }}>
              <Avatar alt={comment.authorUsername} src={comment.authorPicture || undefined} />
            </Grid>
            <Grid item xs style={{ padding: '8px' }}>
              <Typography>
                <Typography component="span">{comment.authorUsername}</Typography>
                <Typography
                  color="textSecondary"
                  component="span"
                  style={{ padding: '0px 0.25rem' }}
                >
                  |
                </Typography>
                <Typography color="textSecondary" component="span">
                  {dayjs(comment.postedAt).utc(true).fromNow()}
                </Typography>
              </Typography>
              <Typography>{unescape(comment.contents)}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
