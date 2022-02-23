import { gql } from 'graphql-tag';

export const GET_ALL_CREATORS = gql`
  query getAllCreators($sortBy: sortBy, $skip: Int, $limit: Int) {
    getAllCreators(sortBy: $sortBy, skip: $skip, limit: $limit) {
      id
      name
      totalPostCount
      lastUpdated
    }
  }
`;

export const SEARCH_CREATORS_BY_NAME = gql`
  query searchCreatorByName($name: String!, $sortBy: sortBy, $limit: Int, $skip: Int) {
    searchCreatorByName(name: $name, sortBy: $sortBy, limit: $limit, skip: $skip) {
      id
      name
      totalPostCount
      lastUpdated
    }
  }
`;

export const GET_CREATOR_BY_ID = gql`
  query getCreatorById($id: ID!) {
    getCreatorById(creatorId: $id) {
      id
      name
      profilePicture
      bannerPicture
      patreon {
        campaignId
        username
        totalPostCount
      }
    }
  }
`;

export const GET_CREATORS_BY_IDS = gql`
  query getCreatorsByIds($ids: [ID!]!, $sortBy: sortBy) {
    getCreatorsByIds(creatorIds: $ids, sortBy: $sortBy) {
      id
      name
      profilePicture
      bannerPicture
      totalPostCount
      lastUpdated
    }
  }
`;

export const GET_PATREON_POSTS_BY_CAMPAIGN_ID = gql`
  query getPatreonPosts($id: ID!, $sortBy: sortBy, $limit: Int, $skip: Int) {
    getPatreonPosts(campaignId: $id, sortBy: $sortBy, limit: $limit, skip: $skip) {
      id
      postedAt
      title
      imageUrl
      plainContents
    }
  }
`;

export const GET_PATREON_POST_BY_ID = gql`
  query getPatreonPostById($postId: ID!) {
    getPatreonPostById(postId: $postId) {
      id
      postedAt
      title
      imageUrl
      contents
      attachments {
        id
        displayName
        filename
      }
      comments {
        id
        authorUsername
        authorPicture
        postedAt
        contents
      }
      embeds {
        id
        subject
        description
        provider
        url
      }
    }
  }
`;
