import React from 'react';
import {
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_CREATORS, GET_CREATOR_BY_ID, SEARCH_CREATORS_BY_NAME } from 'utils/MemoryServices';
import { Creator, Query, SortBy } from 'generated/graphql';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import dayjs from 'dayjs';

import UTC from 'dayjs/plugin/utc';
import RelativeTime from 'dayjs/plugin/relativeTime';

// This is far too complex for its own good.
export default function AllCreatorsTable(sortBy: SortBy): JSX.Element {
  const ITEMS_PER_PAGE = 6;
  const PAGES_TO_PRELOAD = 3;
  const [page, setPage] = React.useState(0);
  const [totalCreatorCount, setTotalCreatorCount] = React.useState(-1); // Used to determine if the user is at the last page. '-1' means unknown.
  const [displaySearch, setDisplaySearch] = React.useState(false); // Used to switch between the default and search queries.

  // RelativeTime
  dayjs.extend(RelativeTime);
  dayjs.extend(UTC);

  const {
    data,
    fetchMore,
    client: apollo,
  } = useQuery<Query>(GET_ALL_CREATORS, {
    variables: {
      sortBy,
      limit: ITEMS_PER_PAGE * (PAGES_TO_PRELOAD + 1),
    },
  });

  const [searchQuery, { data: searchResult }] = useLazyQuery<Query>(SEARCH_CREATORS_BY_NAME, {
    variables: {
      sortBy,
      limit: ITEMS_PER_PAGE * (PAGES_TO_PRELOAD + 1),
    },
  });

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value;
    setPage(0);
    setTotalCreatorCount(-1);
    setDisplaySearch(searchTerm.length !== 0);
    if (searchTerm) {
      searchQuery({
        variables: {
          name: event.target.value,
          skip: ITEMS_PER_PAGE * page,
        },
      });
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    fetchMore({ variables: { skip: ITEMS_PER_PAGE * newPage } }).then((newData) => {
      if (newData.data.getAllCreators.length < ITEMS_PER_PAGE * (PAGES_TO_PRELOAD + 1))
        setTotalCreatorCount(data?.getAllCreators.length || -1);
    });
    setPage(newPage);
  };

  /**
   * Generates TableRows containing the data of input `creators`.
   * If a creator is null, an empty cell is created.
   * @param creators Creators to make rows for.
   * @returns Array of TableRows filled with data from the input Creators.
   */
  const generateTableRows = (creators: Array<Creator | null>): JSX.Element[] => {
    return creators.map((creator, index) => {
      return (
        <TableRow key={creator?.id || index} style={{ height: '51px' }}>
          {creator && (
            <>
              <TableCell>
                <Link
                  to={`/creator/${creator.id}`}
                  style={{ textDecoration: 'none' }}
                  onMouseOver={() => {
                    apollo.query({
                      query: GET_CREATOR_BY_ID,
                      variables: { id: creator.id },
                    });
                  }}
                >
                  {creator.name}
                </Link>
              </TableCell>
              <TableCell align="right">{creator.totalPostCount}</TableCell>
              <TableCell align="right">{dayjs(creator.lastUpdated).utc(true).fromNow()}</TableCell>
            </>
          )}
        </TableRow>
      );
    });
  };

  /**
   * Returns an array `ITEMS_PER_PAGE` long. Input `data` is used to fill the array (sliced based on page number).
   * If the input `data` does not fill the array, empty cells are filled in with `null`.
   * @param data Array of data to slice.
   * @returns Array `ITEMS_PER_PAGE` long, containing input `data` at that page number. Empty cells are filled with `null`.
   */
  function sliceToPage<T>(data: T[]) {
    const ret: Array<T | null> = data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
    for (let i = ret.length; i < ITEMS_PER_PAGE; i++) ret[i] = null;
    return ret;
  }

  const generateSkeletonCells = (): JSX.Element[] => {
    const ret: JSX.Element[] = [];
    for (let index = 0; index < ITEMS_PER_PAGE; index++) {
      ret.push(
        <TableRow key={index}>
          <TableCell colSpan={6}>
            <Skeleton />
          </TableCell>
        </TableRow>,
      );
    }
    return ret;
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Creator</TableCell>
            <TableCell align="right" style={{ width: '60px' }}>
              Posts
            </TableCell>
            <TableCell align="right" style={{ width: '20ch' }}>
              Last Update
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Skeletons are displayed when first loading the page, and when loading new search results */}
          {displaySearch
            ? searchResult
              ? generateTableRows(sliceToPage(searchResult.searchCreatorByName))
              : generateSkeletonCells()
            : data
            ? generateTableRows(sliceToPage(data.getAllCreators))
            : generateSkeletonCells()}
        </TableBody>
      </Table>
      <TableFooter component="div" style={{ display: 'flex' }}>
        <TablePagination
          count={totalCreatorCount}
          rowsPerPage={ITEMS_PER_PAGE}
          rowsPerPageOptions={[ITEMS_PER_PAGE]}
          page={page}
          onPageChange={handleChangePage}
          component="div"
          labelDisplayedRows={({ page }) => `Page ${page + 1}`}
        />
        <InputBase
          placeholder="Search Creators"
          inputProps={{ 'aria-label': 'naked' }}
          onChange={handleSearchInput}
          style={{ flexGrow: 1 }}
        />
      </TableFooter>
    </TableContainer>
  );
}
