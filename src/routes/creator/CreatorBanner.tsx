import { useEffect, useState } from 'react';
import { IconButton, Theme, Typography } from '@mui/material';
import { Skeleton } from '@mui/material';
import { Creator } from 'generated/graphql';
import { Star, StarOutline } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import default_banner from 'images/default_banner.svg';
import { makeStyles } from 'utils/MemoryTheming';
import {
  useGetFavoriteCollections,
  useUpdateFavoriteCreators,
} from 'context/FavoriteCreatorsContext';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '40px',
    height: '250px',
  },
  textArea: {
    background: theme.palette.background.default,
    borderRadius: '24px 24px 0 0',
    width: 'max-content',
    padding: '16px 24px',
    position: 'relative',
    top: '180px',
    left: '100px',
    display: 'flex',
  },
  text: {
    fontWeight: 700,
  },
  favoriteButton: {
    height: '24px',
    width: '24px',
    margin: '3px',
  },
}));

export default function CreatorBanner(creator?: Creator): JSX.Element {
  const { classes } = useStyles();

  const toggleCreatorFavorite = useUpdateFavoriteCreators();
  const listOfFavorites = useGetFavoriteCollections();
  const creatorId = creator?.id ?? '';

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const isFav = listOfFavorites.creators.find((fav) => fav.id === creatorId) !== undefined;
    setIsFavorite(isFav);
  }, [creator]);

  function toggleFavorite() {
    if (creator) {
      toggleCreatorFavorite(creator.id);
      setIsFavorite(!isFavorite);
    }
  }

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${default_banner})` }}>
      <div className={classes.root} style={{ backgroundImage: `url(${creator?.bannerPicture})` }}>
        <span className={classes.textArea}>
          <Typography className={classes.text} variant="h4">
            {creator?.name || <Skeleton width="10ch" />}
          </Typography>

          <IconButton
            className={classes.favoriteButton}
            size="small"
            title={isFavorite ? 'Remove from Favorites' : 'Mark as Favorite'}
            onClick={() => {
              if (creator) toggleFavorite();
            }}
          >
            {isFavorite ? <Star style={{ color: yellow[600] }} /> : <StarOutline />}
          </IconButton>
        </span>
      </div>
    </div>
  );
}
