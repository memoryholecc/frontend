import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Container, Divider, Skeleton, Typography } from '@mui/material';
import { GET_PATREON_POST_BY_ID } from 'utils/MemoryServices';
import { useQuery } from '@apollo/client';
import { Query } from 'generated/graphql';
import DOMPurify from 'dompurify';
import PatreonComments from './PatreonComments';
import PatreonAttachments from './PatreonAttachments';
import PatreonEmbeds from './PatreonEmbed';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import UTC from 'dayjs/plugin/utc';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function PatreonPostPage(): JSX.Element {
  const { id } = useParams();

  const { data } = useQuery<Query>(GET_PATREON_POST_BY_ID, { variables: { postId: id } });

  // Set page title.
  useEffect(() => {
    if (data?.getPatreonPostById.title)
      document.title = data.getPatreonPostById.title + ' | Memory Hole';
  }, [data?.getPatreonPostById.title]);

  // Date format localization
  dayjs.extend(LocalizedFormat);
  dayjs.extend(UTC);

  return (
    <Container>
      <Card>
        <CardContent>
          <main>
            <article>
              {/* Post Date */}
              <Typography color="textSecondary">
                {data ? (
                  dayjs(data.getPatreonPostById.postedAt).utc(true).format('LL [at] LT')
                ) : (
                  <Skeleton width={'15ch'} />
                )}
              </Typography>

              {/* Post Title */}
              <Typography color="textPrimary" variant="h5" style={{ fontWeight: 600 }} gutterBottom>
                {data ? data.getPatreonPostById.title : <Skeleton width={'20ch'} />}
              </Typography>

              {/* Post Image */}
              {data?.getPatreonPostById.imageUrl && (
                <LazyLoadImage
                  src={data.getPatreonPostById.imageUrl}
                  alt="Post"
                  style={{
                    maxHeight: '40vh',
                    maxWidth: '40vw',
                  }}
                />
              )}

              {/* Post Body */}
              <Typography component="div" gutterBottom>
                {data ? (
                  <div
                    // TODO: Possibly replace this with a sandbox iframe.
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(data.getPatreonPostById.contents),
                    }}
                  />
                ) : (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width={'30ch'} />
                  </>
                )}
              </Typography>
            </article>
          </main>

          {/* Post Embeds */}
          {data && PatreonEmbeds(data.getPatreonPostById.embeds)}

          {/* Post Attachments */}
          {data && PatreonAttachments(data.getPatreonPostById.attachments)}

          <Divider style={{ margin: '.75rem 0' }} />

          {/* Post Comments */}
          {data ? PatreonComments(data.getPatreonPostById.comments) : <Skeleton />}
        </CardContent>
      </Card>
    </Container>
  );
}
