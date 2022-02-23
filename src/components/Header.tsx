import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Brightness4, Chat, CloudUpload, Dashboard } from '@mui/icons-material';
import LogoSVG from 'images/logo.svg';
import IconSVG from 'images/icon.svg';
import { makeStyles } from 'utils/MemoryTheming';
import { usePreferDarkTheme, useUpdatePreferDarkTheme } from 'context/PreferDarkThemeContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5',
    marginBottom: '20px',
    height: '75px',
  },
  toolbar: {
    height: 'inherit',
  },
  logo: {
    flexGrow: 1,
  },
  logoImg: {
    height: '55px',
    width: '275px',

    // Mobile/desktop UI
    content: `url(${LogoSVG})`,
    [theme.breakpoints.down('sm')]: {
      content: `url(${IconSVG})`,
      width: '5em',
    },
  },
  icon: {
    color: theme.palette.mode === 'dark' ? '#7b2c7a' : '#6c256b',
    padding: '2px',
  },
  button: {
    textTransform: 'none',
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: 'rgba(100, 100, 100, 0.08)',
    },
  },
  buttonWrapper: {
    [theme.breakpoints.up('sm')]: {
      padding: '0',
    },
  },
  importButton: {
    color: 'white',
    backgroundColor: '#6c256b',
    '&:hover': {
      backgroundColor: 'rgba(108, 37, 107, 0.8)',
    },
  },
  importIcon: {
    padding: '2px',
  },
}));

function CoreMenuItems(props: any) {
  const { classes, cx } = props;
  const toggleDarkMode = useUpdatePreferDarkTheme();

  return (
    <>
      {/* Light/Dark Mode */}
      <ListItem className={classes.buttonWrapper}>
        <Button className={classes.button} onClick={() => toggleDarkMode()}>
          <Brightness4 className={classes.icon} />
          <Typography noWrap variant="inherit">
            {usePreferDarkTheme() ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        </Button>
      </ListItem>

      {/* Creators */}
      <ListItem className={classes.buttonWrapper}>
        <Button className={classes.button} component={Link} to="/">
          <Dashboard className={classes.icon} />
          <Typography noWrap variant="inherit">
            Creators
          </Typography>
        </Button>
      </ListItem>

      {/* Board */}
      <ListItem className={classes.buttonWrapper}>
        <Button
          href="https://chan.kemono.party/memoryhole/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.button}
        >
          <Chat className={classes.icon} />
          <Typography noWrap variant="inherit">
            Board
          </Typography>
        </Button>
      </ListItem>

      {/* Import */}
      <ListItem className={classes.buttonWrapper}>
        <Button className={cx(classes.button, classes.importButton)} component={Link} to="/import">
          <CloudUpload className={classes.importIcon} />
          <Typography noWrap variant="inherit" color="inherit">
            Import Tool
          </Typography>
        </Button>
      </ListItem>
    </>
  );
}

function DesktopMenu(props: any) {
  return (
    <Box sx={{ width: 'auto' }}>
      <List sx={{ display: 'flex' }}>
        <CoreMenuItems {...props} />
      </List>
    </Box>
  );
}

function MobileMenu(props: any) {
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen((state) => !state);
  }

  return (
    <>
      <IconButton edge="end" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor={'right'} open={open} onClose={toggleDrawer}>
        <Box
          sx={{ width: 'auto', padding: '0.5em' }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List sx={{ display: 'flex', flexDirection: 'column' }}>
            <CoreMenuItems {...props} />
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default function Header(): JSX.Element {
  const { classes, cx } = useStyles();

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" className={classes.root}>
      <Container className={classes.toolbar}>
        <Toolbar disableGutters className={classes.toolbar}>
          {/* Logo */}
          <div className={classes.logo} id="hello">
            <Link
              to="/"
              style={{
                display: 'block',
                width: '0',
              }}
            >
              <div className={classes.logoImg}>Memory Hole Logo</div>
            </Link>
          </div>

          {isSmallScreen ? (
            <MobileMenu classes={classes} cx={cx} />
          ) : (
            <DesktopMenu classes={classes} cx={cx} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
