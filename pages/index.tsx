import {QueryClient, dehydrate, useQuery} from 'react-query'
import {defaultListQueryOptions, fetchBooks} from 'api'

import BookList from '@components/BookList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Pagination from '@components/Pagination'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const page = (context.query.page as string) || '1'

  await queryClient.prefetchQuery(['books', page], () => fetchBooks(page))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const HomePage = (): JSX.Element => {
  const router = useRouter()
  const page = (router.query.page as string) || '1'

  const {data: books, isLoading, isError} = useQuery(
    ['books', page],
    () => fetchBooks(page),
    defaultListQueryOptions(),
  )

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <Layout>
      <Spacer y={8}>
        <BookList books={books.data} />
        <Pagination url="/" links={books.meta.links} />
      </Spacer>
    </Layout>
  )
}

export default HomePage
