import { Entry } from 'contentful'
import { GetStaticProps, GetStaticPaths } from 'next'

import Page, { PageProps } from '../components/Page/Page'
import { getPageBySlug, getPages } from '../libs/contentful'
import { PageFields } from '../types'

export default Page

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  let slug = context.params?.slug || '/'

  if (slug && typeof slug !== 'string') {
    slug = `${slug.join('/')}`
  }

  const page = await getPageBySlug(slug)

  return {
    props: {
      page: page.fields,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages()

  const slugs = pages.items.map((page: Entry<PageFields>) => {
    if (page.fields.slug.charAt(0) !== '/') {
      return `/${page.fields.slug}`
    }
    return page.fields.slug
  })

  return {
    paths: slugs,
    fallback: false,
  }
}
