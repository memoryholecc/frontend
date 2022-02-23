import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { PatreonPost } from 'generated/graphql';
import { Link } from 'react-router-dom';
import { GET_PATREON_POST_BY_ID } from 'utils/MemoryServices';
import { ApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import UTC from 'dayjs/plugin/utc';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ImageOrSkeleton } from 'components/ImageOrSkeleton';

export default function PatreonPostViewer(
  posts: PatreonPost[],
  apollo: ApolloClient<Record<string, unknown>>,
  updateScrollPosition: (num: number) => void,
): JSX.Element[] {
  // Date format localization
  dayjs.extend(LocalizedFormat);
  dayjs.extend(UTC);

  return posts.map((post: PatreonPost) => {
    return (
      <Link
        key={post.id}
        to={'/post/patreon/' + post.id}
        style={{ textDecoration: 'none', color: 'inherit', margin: '12px 6px' }}
        onMouseOver={() =>
          apollo.query({
            query: GET_PATREON_POST_BY_ID,
            variables: { postId: post.id },
          })
        }
        onClick={() => {
          updateScrollPosition(window.scrollY);
          window.scrollTo(0, 0);
        }}
      >
        <Card raised style={{ borderRadius: '10px' }}>
          <CardActionArea style={{ width: '275px', height: '400px' }}>
            {post.imageUrl && (
              <LazyLoadComponent>
                <ImageOrSkeleton
                  src={post.imageUrl}
                  style={{ height: '150px', width: '275px', objectFit: 'cover' }}
                />
              </LazyLoadComponent>
            )}
            <CardContent>
              <Typography color="textSecondary" variant="body2">
                {dayjs(post.postedAt).utc(true).format('LL [at] LT')}
              </Typography>

              <Typography
                color="textPrimary"
                variant="h5"
                style={{ fontWeight: 600 }}
                gutterBottom
                noWrap
              >
                {post.title}
              </Typography>

              {/* Min-height can be any number. */}
              <Typography style={{ height: '400px' }}>{post.plainContents}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    );
  });
}
