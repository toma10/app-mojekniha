import {
  Author,
  AuthorDetail,
  Book,
  BookDetail,
  Genre,
  Nationality,
  PaginationLinks,
  SeriesDetail,
  Tag,
} from 'interfaces'

import axios from 'axios'
import {baseApiPath} from '../config'
import {buildQueryString} from 'utils'

const instance = axios.create({
  baseURL: baseApiPath,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

function defaultListQueryOptions(overrides = {}): Record<string, unknown> {
  return {
    keepPreviousData: true,
    staleTime: 5000,
    ...overrides,
  }
}

type AuthorsPromiseType = {
  data: Author[]
  meta: {
    links: PaginationLinks
  }
}

async function fetchAuthors(
  page = '1',
  filters: Record<string, string | number> = null,
): Promise<AuthorsPromiseType> {
  const queryString = buildQueryString(page, filters)
  return instance.get(`authors?${queryString}`).then(data => data.data)
}

type AuthorPromiseType = {
  data: AuthorDetail
}

async function fetchAuthor(id: string): Promise<AuthorPromiseType> {
  return instance.get(`authors/${id}`).then(data => data.data)
}

type BooksPromiseType = {
  data: Book[]
  meta: {
    links: PaginationLinks
  }
}

async function fetchBooks(
  page = '1',
  filters: Record<string, string | number> = null,
): Promise<BooksPromiseType> {
  const queryString = buildQueryString(page, filters)
  return instance.get(`books?${queryString}`).then(data => data.data)
}

type BookPromiseType = {
  data: BookDetail
}

async function fetchBook(id: string): Promise<BookPromiseType> {
  return instance.get(`books/${id}`).then(data => data.data)
}

type GenrePromiseType = {
  data: Genre
}

async function fetchGenre(id: string): Promise<GenrePromiseType> {
  return instance.get(`genres/${id}`).then(data => data.data)
}

type NationalityPromiseType = {
  data: Nationality
}

async function fetchNationality(id: string): Promise<NationalityPromiseType> {
  return instance.get(`nationalities/${id}`).then(data => data.data)
}

type SeriesPromiseType = {
  data: SeriesDetail
}

async function fetchSeries(id: string): Promise<SeriesPromiseType> {
  return instance.get(`series/${id}`).then(data => data.data)
}

type TagPromiseType = {
  data: Tag
}

async function fetchTag(id: string): Promise<TagPromiseType> {
  return instance.get(`tags/${id}`).then(data => data.data)
}

export {
  defaultListQueryOptions,
  fetchAuthors,
  fetchAuthor,
  fetchBooks,
  fetchBook,
  fetchGenre,
  fetchNationality,
  fetchSeries,
  fetchTag,
}
