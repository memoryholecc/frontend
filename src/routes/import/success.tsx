import React from 'react';
import { Container, Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from 'utils/MemoryTheming';
import { useParams } from 'react-router';

const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    fontWeight: 600,
    margin: '15px',
    marginTop: '40px',
  },
  infoBox: {
    background: theme.palette.mode == 'dark' ? '#1b5e20' : '#4caf50',
    borderRadius: '24px',
    padding: '1em',
  },
}));

export default function ImportSuccessPage(): JSX.Element {
  const { id } = useParams();
  const { classes } = useStyles();

  return (
    <Container>
      <Typography className={classes.header} variant={'h5'}>
        Post Importer
      </Typography>

      <Paper className={classes.infoBox} elevation={0}>
        <Typography>
          Thank you for your support! Your import has been queued!
          <br />
          <br />
          Please note that your import may not be immediately viewable and that media and
          attachments may temporarily return errors during the importing process.
          <br />
          <br />
          Your import id is{' '}
          <code>
            <b>{'"' + id + '"'}</b>
          </code>
          . Currently, this does not tell you much but in the case you feel something has gone
          wrong, it will be extremely helpful for us to debug the issue.
        </Typography>
      </Paper>
    </Container>
  );
}
