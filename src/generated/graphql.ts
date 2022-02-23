import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Creator = {
  __typename?: 'Creator';
  bannerPicture?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  lastUpdated: Scalars['DateTime'];
  name: Scalars['String'];
  patreon?: Maybe<Array<PatreonCreator>>;
  profilePicture?: Maybe<Scalars['String']>;
  totalPostCount: Scalars['Int'];
};

export type CreatorDto = {
  bannerPicture?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  profilePicture?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPatreonPostAttachments: Array<PatreonAttachment>;
  addPatreonPostComments: Array<PatreonComment>;
  addPatreonPosts: Array<PatreonPost>;
  createCreator: Creator;
  createPatreon: PatreonCreator;
};


export type MutationAddPatreonPostAttachmentsArgs = {
  attachments: Array<PatreonAttachmentDto>;
  postId: Scalars['ID'];
};


export type MutationAddPatreonPostCommentsArgs = {
  comments: Array<PatreonCommentDto>;
  postId: Scalars['ID'];
};


export type MutationAddPatreonPostsArgs = {
  creatorCampaignId: Scalars['ID'];
  posts: Array<PatreonPostDto>;
};


export type MutationCreateCreatorArgs = {
  creator: CreatorDto;
};


export type MutationCreatePatreonArgs = {
  creatorId: Scalars['ID'];
  patreon: PatreonCreatorDto;
};

export type PatreonAttachment = {
  __typename?: 'PatreonAttachment';
  creator: Creator;
  displayName: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['ID'];
  post: PatreonPost;
};

export type PatreonAttachmentDto = {
  displayName: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['ID'];
};

export type PatreonComment = {
  __typename?: 'PatreonComment';
  authorPicture: Scalars['String'];
  authorUrl: Scalars['String'];
  authorUsername: Scalars['String'];
  contents: Scalars['String'];
  id: Scalars['ID'];
  post: PatreonPost;
  postedAt: Scalars['DateTime'];
};

export type PatreonCommentDto = {
  authorPicture?: InputMaybe<Scalars['String']>;
  authorUrl?: InputMaybe<Scalars['String']>;
  authorUsername: Scalars['String'];
  contents: Scalars['String'];
  id: Scalars['ID'];
  postedAt: Scalars['DateTime'];
};

export type PatreonCreator = {
  __typename?: 'PatreonCreator';
  campaignId: Scalars['ID'];
  creator: Creator;
  posts: Array<PatreonPost>;
  totalPostCount: Scalars['Int'];
  username: Scalars['String'];
};

export type PatreonCreatorDto = {
  campaignId: Scalars['ID'];
  username: Scalars['String'];
};

export type PatreonEmbed = {
  __typename?: 'PatreonEmbed';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  provider?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type PatreonEmbedDto = {
  description?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type PatreonPost = {
  __typename?: 'PatreonPost';
  attachments: Array<PatreonAttachment>;
  comments: Array<PatreonComment>;
  contents: Scalars['String'];
  creator: PatreonCreator;
  embeds: Array<PatreonEmbed>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  plainContents: Scalars['String'];
  postedAt: Scalars['DateTime'];
  title: Scalars['String'];
};

export type PatreonPostDto = {
  attachments?: InputMaybe<Array<PatreonAttachmentDto>>;
  comments?: InputMaybe<Array<PatreonCommentDto>>;
  contents: Scalars['String'];
  embeds?: InputMaybe<Array<PatreonEmbedDto>>;
  id: Scalars['Int'];
  imageUrl?: InputMaybe<Scalars['String']>;
  plainContents: Scalars['String'];
  postedAt: Scalars['DateTime'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllCreators: Array<Creator>;
  getCreatorById: Creator;
  getCreatorsByIds: Array<Creator>;
  getPatreonByCampaignId: PatreonCreator;
  getPatreonByCampaignIds: Array<PatreonCreator>;
  getPatreonPostById: PatreonPost;
  getPatreonPosts: Array<PatreonPost>;
  getPatreonsByCreatorId: Array<PatreonCreator>;
  searchCreatorByName: Array<Creator>;
  searchPatreonsByName: Array<PatreonCreator>;
};


export type QueryGetAllCreatorsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortBy>;
};


export type QueryGetCreatorByIdArgs = {
  creatorId: Scalars['ID'];
};


export type QueryGetCreatorsByIdsArgs = {
  creatorIds: Array<Scalars['ID']>;
  sortBy?: InputMaybe<SortBy>;
};


export type QueryGetPatreonByCampaignIdArgs = {
  campaignId: Scalars['ID'];
};


export type QueryGetPatreonByCampaignIdsArgs = {
  campaignIds: Array<Scalars['ID']>;
};


export type QueryGetPatreonPostByIdArgs = {
  postId: Scalars['ID'];
};


export type QueryGetPatreonPostsArgs = {
  campaignId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortBy>;
};


export type QueryGetPatreonsByCreatorIdArgs = {
  creatorId: Scalars['ID'];
};


export type QuerySearchCreatorByNameArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortBy>;
};


export type QuerySearchPatreonsByNameArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export enum SortBy {
  /** Sort by newest (DESC) */
  LastCreated = 'LAST_CREATED',
  /** Sort by last updated (DESC) */
  LastUpdated = 'LAST_UPDATED',
  /** Sort by name (ASC) */
  Name = 'NAME'
}
