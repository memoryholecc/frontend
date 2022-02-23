import React from 'react';
import { Divider, Typography } from '@mui/material';
import { PatreonEmbed } from 'generated/graphql';
import { Code } from '@mui/icons-material';

export default function PatreonEmbeds(embeds: PatreonEmbed[]): JSX.Element {
  /* If there are no embeds, do not do anything. */
  if (!embeds.length) return <></>;

  return (
    <>
      {/* Displays a divider */}
      <Divider style={{ margin: '.75rem 0' }} />

      {/* Displays the number of embeds */}
      <Typography color="textPrimary" variant="subtitle1" style={{ fontWeight: 600 }} gutterBottom>
        {embeds.length}
        {embeds.length === 1 ? ' Embed' : ' Embeds'}
      </Typography>

      {/* The actual embeds */}
      {embeds.map((embed: PatreonEmbed) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2px',
            }}
            key={embed.id}
          >
            <Code style={{ marginRight: '2px' }} />
            <a href={embed.url} target="_blank" rel="noopener noreferrer">
              <Typography>{embed.subject || 'Open in New Tab'}</Typography>
            </a>
          </div>
        );
      })}
    </>
  );
}
