import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { env } from 'utils/MemoryEnvironment';
import { makeStyles } from 'utils/MemoryTheming';

type SupportedCreator = {
  id: string;
  name: string;
  toImport: boolean;
};

type ApiPatreonLookupResponse = { [id: string]: string };
type ApiPatreonEnqueueResponse = { importId: string };

const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    fontWeight: 600,
    margin: '15px',
    marginTop: '40px',
  },
  infoBox: {
    background: theme.palette.secondary.main,
    borderRadius: '25px',
    padding: '1em',
  },
  importBox: {
    borderRadius: '10px',
    boxShadow: `0px 0px 20px ${theme.palette.mode === 'dark' ? '#0c0c0c' : '#e1e1e1'}`,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px',
    padding: '1em',
    textAlign: 'center',
    maxWidth: '600px',
  },
  importButton: {
    marginTop: '10px',
    color: '#fff',
    background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : undefined,
  },
  textInput: {
    marginBottom: '10px',
    maxWidth: '450px',
    width: 'inherit',
    '& label.Mui-focused': {
      color: theme.palette.mode === 'dark' ? theme.palette.text.primary : undefined,
    },
  },
  buttons: {
    '&.Mui-checked': {
      color: theme.palette.mode === 'dark' ? '#fff' : undefined,
    },
  },
}));

export default function ImportPage(): JSX.Element {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [sessionCookie, setSessionCookie] = useState<string>('');
  const [inputLocked, setInputLocked] = useState(false); // Locks the user out of editing the input field
  const [validInput, setValidInput] = useState(true); // Highlights the input field in red
  const [supportedCreators, setSupportedCreators] = useState<SupportedCreator[]>([]);

  useEffect(() => {
    (async function () {
      if (sessionCookie && validInput) {
        setInputLocked(true);

        try {
          // Get list of supported creators.
          const response = await fetch(env.SCRAPER_ROOT + '/api/v1/lookup/patreon', {
            method: 'POST',
            body: 'sessionId=' + sessionCookie,
          });

          if (response.ok) {
            // sessionID is valid
            const data: ApiPatreonLookupResponse = await response.json();

            const list: SupportedCreator[] = [];
            Object.entries(data).forEach(([id, name]) => {
              list.push({ id, name, toImport: true });
            });

            // If the account does not support any creators, reset.
            if (list.length === 0) {
              setInputLocked(false);
            } else {
              setSupportedCreators(list);
            }
          } else {
            throw new Error('Invalid Session Id');
          }
        } catch (e) {
          // An error occurred. Likely either an invalid Session ID or a network error.
          setValidInput(false);
          setInputLocked(false);
        }
      }
    })();
  }, [sessionCookie, validInput]);

  // Set page title.
  useEffect(() => {
    document.title = 'Importer | Memory Hole';
  }, []);

  const handleCookieInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCookie = event.target.value;
    setSessionCookie(newCookie);

    // * \\ Patreon Session Cookies are 43 characters long.
    // * \\ This check needs to be overhauled when/if other sites are added.
    setValidInput(newCookie.length === 43);
  };

  const handleSubmit = async () => {
    const toImport: string[] = [];
    let postBody = `sessionId=${sessionCookie}&toImport=`;
    supportedCreators.forEach((sc) => {
      if (sc.toImport) {
        toImport.push(sc.id);
      }
    });
    postBody += toImport;

    const response = await fetch(env.SCRAPER_ROOT + '/api/v1/enqueue/patreon', {
      body: postBody,
      method: 'POST',
    });

    if (response.ok) {
      const data: ApiPatreonEnqueueResponse = await response.json();

      navigate('/import/success/' + data.importId);
    }
  };

  const handleToggleToImport = (index: number) => {
    // React will only update the state if the entire array is replaced.
    const newArr = Array.from(supportedCreators);
    newArr[index].toImport = !newArr[index].toImport;
    setSupportedCreators(newArr);
  };

  return (
    <Container>
      <Typography className={classes.header} variant={'h5'}>
        Post Importer
      </Typography>

      <Paper className={classes.infoBox} elevation={0}>
        <Typography>
          Welcome to the Memory Hole post importer! This tool allows you to import missing Patreon
          posts to the site.
          <br />
          <br />
          Your Session ID is used by our scraper to access posts using your account. Know that
          sharing your Session ID gives a level of access very close to sharing your username and
          password. Anyone with your Session ID has full access to your account and any information
          associated with it including your email, country, shipping address (if provided to
          Patreon), linked accounts, membership status, full billing history, and some payment
          information.
          <br />
          <br />
          <b>
            We do not store your Session ID nor any of the account information mentioned above and
            we will never ask you to send it to us.
            <br />
            Never share your Session ID with anyone you do not fully trust with your account.
          </b>
        </Typography>
      </Paper>

      <Paper className={classes.importBox} elevation={0}>
        <form>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <TextField
              autoFocus
              disabled={inputLocked}
              error={!validInput}
              className={classes.textInput}
              InputProps={{ disableUnderline: true }}
              label="Session ID"
              variant="filled"
              onChange={handleCookieInput}
            />
            {supportedCreators.map((sc, index) => {
              return (
                <Grid item key={sc.id}>
                  <FormControlLabel
                    control={<Checkbox className={classes.buttons} />}
                    //disabled={!sc.toImport}
                    checked={sc.toImport}
                    label={sc.name}
                    onChange={() => handleToggleToImport(index)}
                  />
                </Grid>
              );
            })}
            <Grid item>
              <Button
                className={cx(classes.buttons, classes.importButton)}
                startIcon={<CloudUpload />}
                variant="contained"
                disabled={supportedCreators.length === 0}
                onClick={handleSubmit}
              >
                Import
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
