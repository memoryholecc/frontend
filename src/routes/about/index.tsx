import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Paper,
  Theme,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { makeStyles } from 'utils/MemoryTheming';
import { Link } from 'react-router-dom';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    paddingTop: '16px',
  },
  accordionRoot: {
    padding: '0px 16px',
    /* Summary Text */
    '& .MuiAccordionSummary-root > .MuiAccordionSummary-content': {
      padding: '8px 0px',
    },
    /* Indicator */
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    /* A horizontal line at the top of the accordion disappears if this isn't set. */
    // TODO: This doesn't work.
    '&:before': {
      opacity: 1,
    },
  },
  heading: {
    fontWeight: 600,
  },
  link: {
    color: 'inherit',
  },
  codeblock: {
    background: theme.palette.secondary.main,
    padding: '8px',
    border: `${theme.palette.divider} 1px solid`,
    borderRadius: '16px',
  },
}));

export default function AboutPage(): JSX.Element {
  const { classes } = useStyles();

  useEffect(() => {
    document.title = 'About | Memory Hole';
  });

  return (
    <Container className={classes.root}>
      <Paper elevation={3}>
        {/* What is Memory Hole? */}
        <Accordion className={classes.accordionRoot} disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading} variant={'h5'}>
              What is Memory Hole?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The goal of Memory Hole is to be a fast, easy, and free method for you to preview a
              creator&apos;s content before pledging your support and to provide a publicly and
              freely accessible archive of said content.
              <br />
              <br />
              We will never require any form of payment or support to access any site features or
              content. Everything is and will always be freely available for all.
              <br />
              <br />
              If you enjoy a creator&apos;s content, we very strongly urge you to consider
              supporting them if you are capable of doing so.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* How is Memory Hole supported? */}
        <Accordion className={classes.accordionRoot} disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading} variant={'h5'}>
              How may I support Memory Hole?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The best and easiest method to support Memory Hole is to use our{' '}
              <Link to="/import" className={classes.link}>
                importer
              </Link>{' '}
              to add new content to the site. This will make all available content of the creators
              you select freely available for all to see.
              <br />
              <br />
              If you are a developer, you may support in the development of Memory Hole by making a
              PR on our{' '}
              <a
                className={classes.link}
                href="https://github.com/memoryholecc"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
              <br />
              <br />
              If you wish to financially support the project and assist funding our server costs,
              you may make a donation. More information is available in the tab below.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* How are donations used? */}
        <Accordion className={classes.accordionRoot} disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading} variant={'h5'}>
              How may I donate and how are the donations used?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              As stated in &quot;What is Memory Hole?&quot;, a large part of our goal is to be fast.
              To do this, we need fast servers capable of handling the load.
              <br />
              <br />
              Donations are used to cover the costs of our existing server infrastructure and, if
              funds permit, to expand our network, allowing us to host more content at faster
              speeds.
              <br />
              <br />
              <b>Our current costs are approximately $25 USD monthly.</b> As our storage and
              bandwidth requirements increase, our costs will also increase.
              <br />
              <br />
              BTC: bc1q0yaw92unjxpfyp6d9gvgf9fkglt9f4y7kzqsrm
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Privacy? */}
        <Accordion className={classes.accordionRoot} disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading} variant={'h5'}>
              How private is Memory Hole?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              TL;DR We use Cloudflare.
              <br />
              <br />
              Memory Hole does not use any invasive third-party tracking or display ads. We do not
              store cookies or make unnecessary requests to any server, our own or third-party, for
              the purpose of tracking our users.
              <br />
              <br />
              Memory Hole does use third-party services to assist in hosting our content, protecting
              our site from attacks, and to provide certain basic analytics. Additionally, our
              servers may temporarily store some information in log files. Together, the information
              information which may be stored includes:
              <br />
              <br />
              <Typography className={classes.codeblock}>
                <code>
                  The date and time our site was accessed.
                  <br />
                  The IP address of the system accessing our site.
                  <br />
                  The internet service provider and rough location of the system accessing our site
                  (determined through through the IP address).
                  <br />
                  The files accessed from our site and API requests that were made.
                  <br />
                  If any, the website from which you were directed to this site (the referrer).
                  <br />
                  Basic information about the system and browser making the request (the user
                  agent).
                  <br />
                  Any additional related information that may be useful in investigations in the
                  event of attacks on our systems.
                </code>
              </Typography>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
}
