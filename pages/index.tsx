import {QueryClient, dehydrate} from 'react-query'
import {bookKeys, fetchBooks, useBooksQuery} from 'api'

import BookList from '@components/BookList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Pagination from '@components/Pagination'
import PlaceholdersList from '@components/PlaceholdersList'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const page = (context.query.page as string) || '1'

  await queryClient.prefetchQuery(bookKeys.list(page), () => fetchBooks(page))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const HomePage = (): JSX.Element => {
  const router = useRouter()
  const page = (router.query.page as string) || '1'

  const {data: books, isLoading, isError} = useBooksQuery(page)

  return (
    <Layout>
      {isLoading || isError ? (
        <PlaceholdersList items={15} />
      ) : (
        <Spacer y={8}>
          <BookList books={books.data} />
          <Pagination url="/" links={books.meta.links} />
        </Spacer>
      )}
    </Layout>
  )
}

export default HomePage
