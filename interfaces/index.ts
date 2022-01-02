export interface Nationality {
  id: number
  name: string
}

export interface Author {
  id: number
  name: string
  birth_date: string
  death_date: string | null
  biography: string
  formatted_biography: string
  portrait_url: string
  nationality: Nationality
}

export interface AuthorDetail extends Author {
  books: Book[]
  series: Series[]
}

export interface Series {
  id: number
  name: string
}

export interface SeriesDetail extends Series {
  author: Author
  books: Book[]
}

export interface Genre {
  id: number
  name: string
}

export interface Tag {
  id: number
  name: string
}

export interface PlainBook {
  id: number
  name: string
  original_name: string
  description: string
  formatted_description: string
  release_year: number
  average_rating: number | null
  ratings_count: number
  cover_url: string
}

export interface Book extends PlainBook {
  author: Author
}

export interface BookDetail extends Book {
  series: Series | null
  genres: Genre[]
  tags: Tag[]
}

interface PaginationLink {
  url: string | null
  label: string | number
  active: boolean
}

export interface PaginationLinks {
  next: PaginationLink
  pages: PaginationLink[]
  previous: PaginationLink
}
