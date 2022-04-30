import { RichTextField } from '@prismicio/types'

export type Post = {
  title: string
  _meta: {
    uid: string
    firstPublicationDate: string
  }
  content: RichTextField
}
