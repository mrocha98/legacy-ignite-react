import * as prismic from '@prismicio/client'
import { createClient as createUrqlClient, Client, gql } from 'urql'
import { Post } from '../types/post.type'

const repositoryName = process.env.PRISMIC_REPOSITORY_NAME
const accessToken = process.env.PRISMIC_ACCESS_TOKEN

export class PrismicService {
  private readonly client: Client

  constructor() {
    this.client = this._createClient()
  }

  private _createPrismicClient() {
    return prismic.createClient(prismic.getEndpoint(repositoryName), {
      accessToken,
    })
  }

  private _createClient() {
    return createUrqlClient({
      url: prismic.getGraphQLEndpoint(repositoryName),
      fetch: this._createPrismicClient().graphQLFetch,
      preferGetMethod: true,
    })
  }

  async getAllPosts() {
    return this.client
      .query<{ allPosts: { edges: Array<{ node: Post }> } }>(
        gql`
          query GET_ALL_POSTS {
            allPosts(sortBy: meta_firstPublicationDate_DESC) {
              edges {
                node {
                  title
                  _meta {
                    uid
                    firstPublicationDate
                  }
                  content
                }
              }
            }
          }
        `,
      )
      .toPromise()
  }
}
