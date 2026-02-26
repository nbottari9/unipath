import { gql } from "@urql/core";

export const list_pathways = gql`
query List_pathways($limit: Int!) {
  list_pathways(limit: $limit) {
    id
    name
  }
}
`