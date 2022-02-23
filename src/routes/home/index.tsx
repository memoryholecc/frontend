import React, { useEffect } from 'react';
import { Container, Grid, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import AllCreatorsTable from './AllCreatorsTable2';
import { SortBy } from 'generated/graphql';
import FavoriteCreators from './FavoriteCreators';
import { makeStyles } from 'utils/MemoryTheming';

const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    fontWeight: 600,
    margin: '15px',
  },
  paper: {
    borderRadius: '10px',
  },
  styleStrip: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: '200px',
    marginTop: '75px',
    position: 'absolute',
    zIndex: -1,
  },
}));

export default function HomePage(): JSX.Element {
  const { classes } = useStyles();

  // Set page title.
  useEffect(() => {
    document.title = 'Memory Hole';
  }, []);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <div className={classes.styleStrip} />
      <Container>
        <Grid
          container
          direction={isSmallScreen ? 'column' : 'row'}
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item xs={6}>
            <Typography className={classes.header} variant={'h5'}>
              All Creators
            </Typography>
            <Paper elevation={4} className={classes.paper}>
              {AllCreatorsTable(SortBy.Name)}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.header} variant={'h5'}>
              Recent Activity
            </Typography>
            <Paper elevation={4} className={classes.paper}>
              {AllCreatorsTable(SortBy.LastUpdated)}
            </Paper>
          </Grid>
        </Grid>
        <Typography className={classes.header} variant={'h5'} style={{ paddingTop: '16px' }}>
          Favorite Creators
        </Typography>
        {FavoriteCreators()}
      </Container>
    </>
  );
}
