import {QueryClient, dehydrate, useQuery} from 'react-query'
import {defaultListQueryOptions, fetchBooks, fetchGenre} from 'api'

import BookList from '@components/BookList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import MutedSubTitle from '@components/Atoms/MutedSubTitle'
import Pagination from '@components/Pagination'
import PlaceholdersList from '@components/PlaceholdersList'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const id = context.params.id as string
  const page = (context.query.page as string) || '1'

  await queryClient.prefetchQuery(['genre', id], () => fetchGenre(id))
  await queryClient.prefetchQuery(['books', page, 'genre', id], () =>
    fetchBooks(page, {'genres.id': id}),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const GenrePage = (): JSX.Element => {
  const router = useRouter()
  const id = (router.query.id as string) || '1'
  const page = (router.query.page as string) || '1'

  const {
    data: genre,
    isLoading: genreIsLoading,
    isError: genreIsError,
  } = useQuery(['genre', id], () => fetchGenre(id))
  const {
    data: books,
    isLoading: booksIsLoading,
    isError: booksIsError,
  } = useQuery(
    ['books', page, 'genre', id],
    () => fetchBooks(page, {'genres.id': id}),
    defaultListQueryOptions(),
  )

  const isLoading = genreIsLoading || booksIsLoading
  const isError = genreIsError || booksIsError

  return (
    <Layout>
      {isLoading || isError ? (
        <PlaceholdersList items={15} />
      ) : (
        <Spacer y={4}>
          <MutedSubTitle>Žánr: {genre.data.name}</MutedSubTitle>
          <Spacer y={8}>
            <BookList books={books.data} />
            <Pagination url={`/genres/${id}`} links={books.meta.links} />
          </Spacer>
        </Spacer>
      )}
    </Layout>
  )
}

export default GenrePage
