import React from 'react';
import { Container, Theme, Typography } from '@mui/material';
import { makeStyles } from 'utils/MemoryTheming';
import { env } from 'utils/MemoryEnvironment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    marginTop: '50px',
    height: '85px',
    alignItems: 'center',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  copyright: {
    padding: 0,
    textAlign: 'center',
  },
}));

export default function Footer(): JSX.Element {
  const { classes } = useStyles();

  return (
    <footer className={classes.root}>
      <Container>
        <Typography className={classes.copyright} color="textSecondary">
          <Link className={classes.link} to="/about">
            About
          </Link>
          <a
            className={classes.link}
            href={env.GRAPHQL_ENDPOINT}
            target="_blank"
            rel="noopener noreferrer"
          >
            {' | API'}
          </a>
          <a
            className={classes.link}
            href="https://github.com/memoryholecc"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' | Source Code'}
          </a>
        </Typography>
        <Typography className={classes.copyright} color="textSecondary">
          © 2022 Memory Hole | Released freely for all under AGPL-v3.
        </Typography>
      </Container>
    </footer>
  );
}
