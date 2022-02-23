import React from 'react';
import { Button, IconButton, Paper, Theme, Typography } from '@mui/material';
import { Skeleton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Creator } from 'generated/graphql';
import { makeStyles } from 'utils/MemoryTheming';

type GenericSiteCreator = {
  name: string;
  site: string;
  siteId: string;
};

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    // backgroundColor: '#ffe3c8',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '20px',
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    width: '350px',
    padding: '14px 14px 8px 14px',
  },

  title: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },

  content: {
    color: theme.palette.text.primary,
  },

  pledgeButtonContainer: {
    display: 'block',
    textAlign: 'center',
    marginTop: '4px',
  },

  pledgeButton: {
    paddingRight: '4px',
  },

  pledgeText: {
    color: theme.palette.text.primary,
  },
}));

/**
 * A box in the bottom right of the screen notifying the user to support the creator. Will return a skeleton if arguments are undefined.
 * @param creator - Used to get the creator's name (text). Will make a Skeleton if undefined.
 * @param genericCreator - Used to get the creator's site information (button). Will make a Skeleton if undefined.
 */
export default function SupportNotifier(
  creator?: Creator,
  genericCreator?: GenericSiteCreator,
): JSX.Element {
  const [display, setDisplay] = React.useState<boolean>(true);

  const { classes } = useStyles();

  const SupportButton = () => {
    if (genericCreator) {
      switch (genericCreator.site) {
        case 'patreon.com':
          return (
            <a
              href={'https://www.patreon.com/join/' + genericCreator.siteId}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.pledgeButtonContainer}
            >
              <Button>
                <img
                  src="https://www.google.com/s2/favicons?domain=patreon.com"
                  alt="Patreon icon"
                  className={classes.pledgeButton}
                />
                <span className={classes.pledgeText}>Make a pledge on Patreon</span>
              </Button>
            </a>
          );
      }
    } else {
      // Skeleton
      return <Skeleton width={'20ch'} />;
    }
  };

  return display ? (
    <Paper className={classes.root}>
      <IconButton
        size="small"
        style={{ float: 'right' }}
        onClick={() => {
          setDisplay(false);
        }}
      >
        <Close fontSize="inherit" />
      </IconButton>
      {/* The phrasing is almost identical to what was on YP */}
      <Typography gutterBottom variant="h5" className={classes.title}>
        {creator ? `Enjoying ${creator.name}'s content?` : <Skeleton />}
      </Typography>
      <Typography className={classes.content}>
        {creator ? (
          `Creators like ${creator.name} work hard to produce the content that you are viewing for free. If you like what you see, please consider supporting ${creator.name} to encourage them to create more great content!`
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton width={'20ch'} />
          </>
        )}
      </Typography>
      {SupportButton()}
    </Paper>
  ) : (
    <></>
  );
}
