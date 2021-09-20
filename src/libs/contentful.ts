import axios, { AxiosRequestConfig } from 'axios'
import type { Entry, EntryCollection } from 'contentful'

import type { PageFields } from '../types'

const api = axios.create({
  baseURL: 'https://cdn.contentful.com',
})

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_TOKEN

const getEntries = <T>(config: AxiosRequestConfig) => {
  return api.get<EntryCollection<T>>(
    `/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}`,
    config
  )
}

export const getPageBySlug = async (
  slug: string
): Promise<Entry<PageFields>> => {
  const entries = await getEntries<PageFields>({
    params: {
      content_type: 'page',
      'fields.slug': slug,
      include: '10',
    },
  })

  const entry = entries.data.items[0]
  entry.fields.components = entries.data.includes.Entry
  return entry
}

export const getPages = async (): Promise<EntryCollection<PageFields>> => {
  const entries = await getEntries<PageFields>({
    params: {
      content_type: 'page',
    },
  })

  return entries.data
}
