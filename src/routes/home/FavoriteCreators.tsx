import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CREATORS_BY_IDS, GET_CREATOR_BY_ID } from 'utils/MemoryServices';
import { Creator, Query } from 'generated/graphql';
import default_avatar from 'images/default_avatar.svg';
import { Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { makeStyles } from 'utils/MemoryTheming';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import UTC from 'dayjs/plugin/utc';
import { useGetFavoriteCollections } from 'context/FavoriteCreatorsContext';

const useStyles = makeStyles()(() => ({
  root: {
    justifyContent: 'center',
  },
  paperContainer: {
    margin: '20px',
    borderRadius: '12px',
    width: '370px',
  },
  linkContainer: {
    display: 'flex',
    textDecoration: 'none',
    padding: '8px',
  },
  profilePicture: {
    borderRadius: '10px',
    height: '80px',
    width: '80px',
    objectFit: 'cover',
  },
  textArea: {
    margin: 'auto 0 auto 4px',
    padding: '0px 6px',
  },
  text: {
    fontWeight: 600,
  },
  buttonArea: {
    textAlign: 'center',
  },
}));

// Note: Creators are sorted by the time they are added, not by "last updated."
// While sending a full list of favorites will work for smaller lists, it will quickly hit API restrictions.
export default function FavoriteCreators(): JSX.Element {
  const ITEMS_PER_PAGE = 9;

  const listOfFavories = useGetFavoriteCollections();

  const { classes, cx } = useStyles();
  const favorites = listOfFavories.creators.map((fav) => fav.id);
  const [page, setPage] = React.useState(0);
  const thisPage = favorites.reverse().slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  // RelativeTime
  dayjs.extend(RelativeTime);
  dayjs.extend(UTC);

  const { data, client: apollo } = useQuery<Query>(GET_CREATORS_BY_IDS, {
    variables: {
      ids: thisPage,
    },
  });

  // The API returns creators ordered by their ID. This sorts them to match the `thisPage` array.
  const sortedData: Creator[] = Array.from(data?.getCreatorsByIds || []).sort((a, b) => {
    return thisPage.indexOf(a.id) - thisPage.indexOf(b.id);
  });

  return (
    <>
      <Box className={classes.root} display="flex" flexWrap="wrap">
        {sortedData.length ? (
          sortedData.map((creator: Creator) => {
            return (
              <Paper key={creator.id} className={classes.paperContainer} elevation={4}>
                <Link
                  to={`/creator/${creator.id}`}
                  className={classes.linkContainer}
                  onMouseOver={() => {
                    apollo.query({
                      query: GET_CREATOR_BY_ID,
                      variables: { id: creator.id },
                    });
                  }}
                >
                  <img
                    src={creator.profilePicture ? creator.profilePicture : default_avatar}
                    alt={creator.name}
                    className={classes.profilePicture}
                  />

                  <div className={classes.textArea}>
                    {/* Top Line: Name*/}
                    <Typography className={classes.text} noWrap color="textPrimary">
                      {creator.name}
                    </Typography>

                    {/* Mid Line: Last Updated */}
                    <Typography className={classes.text} noWrap color="textSecondary">
                      Last updated {dayjs(creator.lastUpdated).utc(true).fromNow()}
                    </Typography>

                    {/* Bottom Line: Post Count */}
                    <Typography className={classes.text} noWrap color="textSecondary">
                      {creator.totalPostCount} {creator.totalPostCount > 1 ? 'Posts' : 'Post'}
                    </Typography>
                  </div>
                </Link>
              </Paper>
            );
          })
        ) : (
          <Paper className={cx(classes.paperContainer, classes.linkContainer)} elevation={4}>
            <img src={default_avatar} alt="Default Avatar" className={classes.profilePicture} />

            <div className={classes.textArea}>
              <Typography className={classes.text} color="textPrimary">
                Favorites
              </Typography>

              <Typography className={classes.text} color="textSecondary">
                Click on the star next to the name on a creator&apos;s page to favorite them!
              </Typography>
            </div>
          </Paper>
        )}
      </Box>
      <div className={classes.buttonArea}>
        <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
          <KeyboardArrowLeft /> Last Page
        </Button>
        <Button
          disabled={(page + 1) * ITEMS_PER_PAGE >= favorites.length}
          onClick={() => setPage(page + 1)}
        >
          Next Page <KeyboardArrowRight />
        </Button>
      </div>
    </>
  );
}
