import React from 'react';
import { Divider, Typography } from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import { PatreonAttachment } from 'generated/graphql';

export default function PatreonAttachments(attachments: PatreonAttachment[]): JSX.Element {
  /* If there are no attachments, do not do anything. */
  if (!attachments.length) return <></>;

  return (
    <>
      {/* Displays a divider */}
      <Divider style={{ margin: '.75rem 0' }} />

      {/* Displays the number of attachments */}
      <Typography color="textPrimary" variant="subtitle1" style={{ fontWeight: 600 }} gutterBottom>
        {attachments.length}
        {attachments.length === 1 ? ' Attachment' : ' Attachments'}
      </Typography>

      {/* The actual attachments */}
      {attachments.map((attachment: PatreonAttachment) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2px',
            }}
            key={attachment.id}
          >
            <AttachFile style={{ marginRight: '2px' }} />
            <a href={attachment.filename} target="_blank" rel="noopener noreferrer">
              <Typography>{attachment.displayName}</Typography>
            </a>
          </div>
        );
      })}
    </>
  );
}
