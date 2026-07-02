export type ContentBlockType = 'text' | 'image'

export type PageSlug =
  | 'home'
  | 'about'
  | 'contact'
  | 'book'
  | 'villas'
  | 'families'
  | 'faq'
  | 'promos'
  | 'rates'
  | 'terms'
  | 'global'
  | 'mawar'
  | 'jepun'
  | 'anggrek'
  | 'sandat'

export const VILLA_PAGE_SLUGS = ['mawar', 'jepun', 'anggrek', 'sandat'] as const

export function isVillaPageSlug(slug: string): slug is (typeof VILLA_PAGE_SLUGS)[number] {
  return (VILLA_PAGE_SLUGS as readonly string[]).includes(slug)
}

export type ContentBlockRow = {
  id: string
  pageSlug: string
  blockKey: string
  type: ContentBlockType
  value: string
  updatedAt: string
}

export type ContentBlockUpsertInput = {
  pageSlug: string
  blockKey: string
  type: ContentBlockType
  value: string
}
