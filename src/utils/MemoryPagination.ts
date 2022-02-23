/**
 * This is just a version of offsetLimitPagination() from Apollo that has been modified to suit our needs.
 * Original Source: https://github.com/apollographql/apollo-client/blob/main/src/utilities/policies/pagination.ts
 * Original License: MIT
 *
 * Changes:
 * - We use a 'skip' variable rather than 'offset'
 * - No args throws an error because Typescript throws an error if we attempt to recover.
 */

import { FieldPolicy, Reference } from '@apollo/client';

type KeyArgs = FieldPolicy<string>['keyArgs'];

// A basic field policy that uses options.args.{skip,limit} to splice
// the incoming data into the existing array. If your arguments are called
// something different (like args.{start,count}), feel free to copy/paste
// this implementation and make the appropriate changes.
export function skipLimitPagination<T = Reference>(keyArgs: KeyArgs = false): FieldPolicy<T[]> {
  return {
    keyArgs,
    merge(existing, incoming, { args }) {
      const merged = existing ? existing.slice(0) : [];
      if (args) {
        // Assume an skip of 0 if args.skip omitted.
        const { skip = 0 } = args;
        for (let i = 0; i < incoming.length; ++i) {
          merged[skip + i] = incoming[i];
        }
      } else {
        // It's unusual (probably a mistake) for a paginated field not
        // to receive any arguments, so you might prefer to throw an
        // exception here, instead of recovering by appending incoming
        // onto the existing array.
        //merged.push.apply(merged, incoming);

        // The thing above has a TS Error so I'm just going to make it spit an error if this happens.
        throw new Error('Pagination: No query arguments.');
      }
      return merged;
    },
  };
}
