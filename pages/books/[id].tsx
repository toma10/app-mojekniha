import {QueryClient, dehydrate, useQuery} from 'react-query'

import BookDetail from '@components/BookDetail'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import React from 'react'
import {fetchBook} from 'api'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const id = context.params.id as string

  await queryClient.prefetchQuery(['book', id], () => fetchBook(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const BookPage = (): JSX.Element => {
  const router = useRouter()
  const id = router.query.id as string

  const {data: book, isLoading, isError} = useQuery(['book', id], () =>
    fetchBook(id),
  )

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <Layout>
      <BookDetail book={book.data} />
    </Layout>
  )
}

export default BookPage
