import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { GET_CREATOR_BY_ID, GET_PATREON_POSTS_BY_CAMPAIGN_ID } from 'utils/MemoryServices';
import CreatorBanner from 'routes/creator/CreatorBanner';
import { DocumentNode, useQuery } from '@apollo/client';
import { Query, SortBy } from 'generated/graphql';
import PatreonPostViewer from './PostViewers/PatreonPosts';
import SkeletonPostViewer from './PostViewers/SkeletonPosts';
import SupportNotifier from 'routes/creator/SupportNotifier';
import { makeStyles } from 'utils/MemoryTheming';
import { useGetScrollPosition, useUpdateScrollPosition } from 'context/ScrollMangerContext';

type GenericSiteCreator = {
  name: string;
  site: string;
  siteId: string;
  postCount: number;
};

const useStyles = makeStyles()(() => ({
  dataSourceSelection: {
    borderRadius: '16px',
    padding: '0 8px',
  },
  favicon: {
    marginRight: '2px',
    verticalAlign: 'middle',
  },
  pagination: {
    // This element has additional styling passed directly to the element.
    // This is because MUI has default styling that overrides those settings.
    textAlign: 'center',
  },
}));

/* How this works
 * 1. On opening, get the Creator and basic site-specific information. (Name, banner, basic patreon info)
 * 2. Compile a list of dataSources. These are generics containing a name, site, site-specific ID, and post count.
 * 3. Send a query to get post information. The query sent depends on the site as specified by the data source.
 *
 * If the user selects a new data source, the post query is updated and resent.
 * This saves us from having to add another hook for each site we add.
 */

// This is a mess.
export default function CreatorPage(): JSX.Element {
  // Configuration
  const ITEMS_PER_PAGE = 48; // This number is nicely divisible by both 4 and 3.
  const { classes } = useStyles();

  // URL parameters
  const { id } = useParams(); // Creator ID
  const [searchParams, setSearchParams] = useSearchParams(); // Url parameters
  const page = parseInt(searchParams.get('page') ?? '1'); // Page 5number

  // Hooks
  const dataSources: GenericSiteCreator[] = []; // Data Source: List of sources
  const [selectedDsIndex, setSelectedDsIndex] = React.useState(0); // Data Sources: Index of DS to use.
  const [dsmAnchorEl, setDsmAnchorEl] = React.useState<null | HTMLElement>(null); // Data Source Menu: Anchor Element
  const [skipPostQuery, setSkipPostQuery] = React.useState(true); // Data Sources: Do not query posts (Only true before initial creator query returns because siteIds are unknown at that point)
  const [pageNumber, setPageNumber] = React.useState(page); // Pagination: Page number.

  const scrollPosition = useGetScrollPosition();
  const updateScrollPosition = useUpdateScrollPosition();


  // API Queries: Get Basic Creator Data
  const { data: creatorData } = useQuery<Query>(GET_CREATOR_BY_ID, { variables: { id } });

  /* Data Sources: Populate List of Data Sources */
  if (creatorData?.getCreatorById) {
    creatorData?.getCreatorById.patreon?.forEach((pCreator) => {
      dataSources.push({
        name: pCreator.username,
        site: 'patreon.com',
        siteId: pCreator.campaignId,
        postCount: pCreator.totalPostCount,
      });
    });

    // This only executes when the page first loads.
    // Forces the query to execute for the first item in the list.
    if (skipPostQuery) {
      setSkipPostQuery(false);
    }
  }

  /* Commonly used variables. */
  const creator = creatorData?.getCreatorById;
  const dataSource = dataSources[selectedDsIndex];

  /* API Queries: Get post data. */
  /* Determine query to use to get post data. */
  let POST_QUERY: DocumentNode;
  switch (dataSource?.site) {
    case 'patreon.com':
    default:
      POST_QUERY = GET_PATREON_POSTS_BY_CAMPAIGN_ID;
  }

  /* Determine arguments. */
  const POST_QUERY_OPTIONS = {
    id: dataSource?.siteId,
    sortBy: SortBy.LastCreated,
    limit: ITEMS_PER_PAGE,
    skip: (pageNumber - 1) * ITEMS_PER_PAGE,
  };

  /* Send query. */
  const {
    client: apollo,
    data: postData,
    loading,
    refetch: fetchMorePosts, // TODO: Refetch bypasses InMemoryCache.
  } = useQuery<Query>(POST_QUERY, {
    variables: POST_QUERY_OPTIONS,
    skip: skipPostQuery,
    // Bypassing the Apollo cache, and using the browser cache
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (scrollPosition > 0 && !loading) {
      setTimeout(() => {
        // wait until the stack is not busy
        window.scrollTo(0, scrollPosition);
      }, 0);
      updateScrollPosition(0);
    }
  }, [scrollPosition, loading]);

  /* Set page title. */
  useEffect(() => {
    if (creator) document.title = creator.name + ' | Memory Hole';
  }, [creator]);

  /* Data Source Menu */
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setDsmAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, newIndex: number) => {
    if (selectedDsIndex !== newIndex) {
      setSelectedDsIndex(newIndex);
      setPageNumber(1);
    }
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setDsmAnchorEl(null);
  };

  /* Pagination */
  const handlePageChange = async (event: React.ChangeEvent<unknown>, newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    setPageNumber(newPage);
    fetchMorePosts({
      skip: (newPage - 1) * ITEMS_PER_PAGE,
    });
    window.scrollTo(0, 0);
  };

  // As there is no guarantee future sites will be have compatible data with Patreon, this was made to simplify adding future sites.
  const GenerateSitePosts = () => {
    // If the post query has data, return the posts.
    // Otherwise, it is assumed to be loading (it may have errored but this is not accounted for).
    if (dataSource && postData && !loading) {
      switch (dataSource.site) {
        case 'patreon.com':
        default:
          return PatreonPostViewer(postData.getPatreonPosts, apollo, updateScrollPosition);
      }
    } else {
      return SkeletonPostViewer();
    }
  };

  function PaginationBar() {
    if (!dataSource) return null;
    return (
      <Pagination
        className={classes.pagination}
        count={Math.ceil(dataSource.postCount / ITEMS_PER_PAGE)}
        page={pageNumber}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      />
    );
  }

  return (
    <Container>
      <Stack spacing={4}>
        {/* This is the banner thingy. The bit with the name and banner. */}
        {CreatorBanner(creator)}

        <PaginationBar />

        {/* This is a selector allowing you to chose which site/account to view posts from. */}
        {/* The conditional prevents it from showing unless it is actually useful. */}
        {creator && dataSources.length > 1 ? (
          <Paper className={classes.dataSourceSelection}>
            <List component="nav" aria-label="Data Source">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                onClick={handleClickListItem}
              >
                <ListItemText
                  primary="Data Source:"
                  secondary={
                    <Typography noWrap>
                      <img
                        className={classes.favicon}
                        src={`https://www.google.com/s2/favicons?domain=${dataSource.site}`}
                        alt="Site icon"
                      />
                      {'\t' + dataSource.name}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Menu
              anchorEl={dsmAnchorEl}
              keepMounted
              open={Boolean(dsmAnchorEl)}
              onClose={handleMenuClose}
            >
              {dataSources.map((option, index) => (
                <MenuItem
                  key={index}
                  selected={index === selectedDsIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  <Typography noWrap>
                    <img
                      className={classes.favicon}
                      src={`https://www.google.com/s2/favicons?domain=${option.site}`}
                      alt="Site icon"
                    />
                    {'\t' + option.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Paper>
        ) : undefined}

        {/* This is where the posts go. */}
        <Box
          display="flex"
          style={{
            alignItems: 'center',
            marginTop: '24px',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {GenerateSitePosts()}
        </Box>

        <PaginationBar />
      </Stack>

      {/* This is a box notifying the user to support this creator if they like their content. */}
      {SupportNotifier(creator, dataSource)}
    </Container>
  );
}
