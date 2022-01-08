import {QueryClient, dehydrate} from 'react-query'
import {bookKeys, fetchBook, useBookQuery} from 'api'

import BookDetail from '@components/BookDetail'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import React from 'react'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const id = context.params.id as string

  await queryClient.prefetchQuery(bookKeys.detail(id), () => fetchBook(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const BookPage = (): JSX.Element => {
  const router = useRouter()
  const id = router.query.id as string

  const {data: book, isLoading, isError} = useBookQuery(id)

  return (
    <Layout>
      {isLoading || isError ? <Loader /> : <BookDetail book={book.data} />}
    </Layout>
  )
}

export default BookPage
