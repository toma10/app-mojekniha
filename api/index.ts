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
import {UseQueryResult, useQuery} from 'react-query'

import {buildQueryString} from 'utils'
import instance from './instance'

type FiltersType = Record<string, string | number>

const authorKeys = {
  list: (page: string, filters: FiltersType = null): Array<unknown> => [
    'authors',
    'list',
    page,
    filters,
  ],
  detail: (id: string): Array<string> => ['authors', 'detail', id],
}

const bookKeys = {
  list: (page: string, filters: FiltersType = null): Array<unknown> => [
    'books',
    'list',
    page,
    filters,
  ],
  detail: (id: string): Array<string> => ['books', 'detail', id],
}

const genreKeys = {
  detail: (id: string): Array<string> => ['genres', 'detail', id],
}

const nationalityKeys = {
  detail: (id: string): Array<string> => ['nationalities', 'detail', id],
}

const seriesKeys = {
  detail: (id: string): Array<string> => ['series', 'detail', id],
}

const tagKeys = {
  detail: (id: string): Array<string> => ['tags', 'detail', id],
}

function defaultListQueryOptions(overrides = {}): Record<string, unknown> {
  return {
    keepPreviousData: true,
    staleTime: 5000,
    ...overrides,
  }
}

type AuthorListResponse = {
  data: Author[]
  meta: {
    links: PaginationLinks
  }
}

type AuthorDetailResponse = {
  data: AuthorDetail
}

async function fetchAuthors(
  page = '1',
  filters: Record<string, string | number> = null,
): Promise<AuthorListResponse> {
  const queryString = buildQueryString(page, filters)
  const response = await instance.get(`authors?${queryString}`)
  return response.data
}

async function fetchAuthor(id: string): Promise<AuthorDetailResponse> {
  return instance.get(`authors/${id}`).then(data => data.data)
}

function useAuthorsQuery(
  page: string,
  filters: FiltersType = null,
): UseQueryResult<AuthorListResponse, Error> {
  return useQuery(
    authorKeys.list(page, filters),
    () => fetchAuthors(page, filters),
    defaultListQueryOptions(),
  )
}

function useAuthorQuery(
  id: string,
): UseQueryResult<AuthorDetailResponse, Error> {
  return useQuery(authorKeys.detail(id), () => fetchAuthor(id))
}

type BookListResponse = {
  data: Book[]
  meta: {
    links: PaginationLinks
  }
}

type BookDetailResponse = {
  data: BookDetail
}

async function fetchBooks(
  page: string,
  filters: FiltersType = null,
): Promise<BookListResponse> {
  const queryString = buildQueryString(page, filters)
  const response = await instance.get(`books?${queryString}`)
  return response.data
}

async function fetchBook(id: string): Promise<BookDetailResponse> {
  const response = await instance.get(`books/${id}`)
  return response.data
}

function useBooksQuery(
  page: string,
  filters: FiltersType = null,
): UseQueryResult<BookListResponse, Error> {
  return useQuery(
    bookKeys.list(page, filters),
    () => fetchBooks(page, filters),
    defaultListQueryOptions(),
  )
}

function useBookQuery(id: string): UseQueryResult<BookDetailResponse, Error> {
  return useQuery(bookKeys.detail(id), () => fetchBook(id))
}

type GenreDetailResponse = {
  data: Genre
}

async function fetchGenre(id: string): Promise<GenreDetailResponse> {
  return instance.get(`genres/${id}`).then(data => data.data)
}

function useGenreQuery(id: string): UseQueryResult<GenreDetailResponse, Error> {
  return useQuery(genreKeys.detail(id), () => fetchGenre(id))
}

type NationalityDetailResponse = {
  data: Nationality
}
async function fetchNationality(
  id: string,
): Promise<NationalityDetailResponse> {
  return instance.get(`nationalities/${id}`).then(data => data.data)
}

function useNationalityQuery(
  id: string,
): UseQueryResult<NationalityDetailResponse, Error> {
  return useQuery(nationalityKeys.detail(id), () => fetchNationality(id))
}

type SeriesDetailResponse = {
  data: SeriesDetail
}

async function fetchSeries(id: string): Promise<SeriesDetailResponse> {
  return instance.get(`series/${id}`).then(data => data.data)
}

function useSeriesQuery(
  id: string,
): UseQueryResult<SeriesDetailResponse, Error> {
  return useQuery(seriesKeys.detail(id), () => fetchSeries(id))
}

type TagDetailResponse = {
  data: Tag
}

async function fetchTag(id: string): Promise<TagDetailResponse> {
  return instance.get(`tags/${id}`).then(data => data.data)
}

function useTagQuery(id: string): UseQueryResult<TagDetailResponse, Error> {
  return useQuery(tagKeys.detail(id), () => fetchTag(id))
}

export {
  authorKeys,
  bookKeys,
  genreKeys,
  nationalityKeys,
  seriesKeys,
  tagKeys,
  defaultListQueryOptions,
  fetchAuthors,
  fetchAuthor,
  useAuthorsQuery,
  useAuthorQuery,
  fetchBooks,
  fetchBook,
  useBooksQuery,
  useBookQuery,
  fetchGenre,
  useGenreQuery,
  fetchNationality,
  useNationalityQuery,
  fetchSeries,
  useSeriesQuery,
  fetchTag,
  useTagQuery,
}
