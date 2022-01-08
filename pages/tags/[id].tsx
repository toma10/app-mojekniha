import {QueryClient, dehydrate} from 'react-query'
import {
  bookKeys,
  fetchBooks,
  fetchTag,
  tagKeys,
  useBooksQuery,
  useTagQuery,
} from 'api'

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

  await queryClient.prefetchQuery(tagKeys.detail(id), () => fetchTag(id))
  await queryClient.prefetchQuery(bookKeys.list(page, {'tags.id': id}), () =>
    fetchBooks(page, {'tags.id': id}),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const TagPage = (): JSX.Element => {
  const router = useRouter()
  const id = (router.query.id as string) || '1'
  const page = (router.query.page as string) || '1'

  const {data: tag, isLoading: tagIsLoading, isError: tagIsError} = useTagQuery(
    id,
  )
  const {
    data: books,
    isLoading: booksIsLoading,
    isError: booksIsError,
  } = useBooksQuery(page, {'tags.id': id})

  const isLoading = booksIsLoading || tagIsLoading
  const isError = booksIsError || tagIsError

  return (
    <Layout>
      {isLoading || isError ? (
        <PlaceholdersList items={15} />
      ) : (
        <Spacer y={4}>
          <MutedSubTitle>Štítek: {tag.data.name}</MutedSubTitle>
          <Spacer y={8}>
            <BookList books={books.data} />
            <Pagination url={`/tags/${id}`} links={books.meta.links} />
          </Spacer>
        </Spacer>
      )}
    </Layout>
  )
}

export default TagPage
