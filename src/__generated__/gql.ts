/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetCharacterQuery($characterId: ID!) {\n    character(id: $characterId) {\n      id\n      name\n      image\n      status\n      species\n    }\n  }\n": types.GetCharacterQueryDocument,
    "\n  query GetCharacter($characterId: ID!) {\n    character(id: $characterId) {\n      id\n      name\n      status\n      species\n      type\n      gender\n      origin {\n        name \n      }\n      image\n      episode {\n        name\n      }\n      created\n    }\n  }\n": types.GetCharacterDocument,
    "\nquery GetCharacters {\ncharacters{\n  results{\n    id\n    name\n    status\n    species\n    type\n    gender\n    image\n    __typename @skip(if: true) \n  }\n}\n}\n  ": types.GetCharactersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCharacterQuery($characterId: ID!) {\n    character(id: $characterId) {\n      id\n      name\n      image\n      status\n      species\n    }\n  }\n"): (typeof documents)["\n  query GetCharacterQuery($characterId: ID!) {\n    character(id: $characterId) {\n      id\n      name\n      image\n      status\n      species\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCharacter($characterId: ID!) {\n    character(id: $characterId) {\n      id\n      name\n      status\n      species\n      type\n      gender\n      origin {\n        name \n      }\n      image\n      episode {\n        name\n      }\n      created\n    }\n  }\n"): (typeof documents)["\n  query GetCharacter($characterId: ID!) {\n    character(id: $characterId) {\n      id\n      name\n      status\n      species\n      type\n      gender\n      origin {\n        name \n      }\n      image\n      episode {\n        name\n      }\n      created\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetCharacters {\ncharacters{\n  results{\n    id\n    name\n    status\n    species\n    type\n    gender\n    image\n    __typename @skip(if: true) \n  }\n}\n}\n  "): (typeof documents)["\nquery GetCharacters {\ncharacters{\n  results{\n    id\n    name\n    status\n    species\n    type\n    gender\n    image\n    __typename @skip(if: true) \n  }\n}\n}\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;