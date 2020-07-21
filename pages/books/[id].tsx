import {fetcher, url} from 'utils'

import BookDetail from '@components/BookDetail'
import {BookDetail as BookDetailType} from 'interfaces'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import React from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async context => {
  const {id} = context.params
  const books = await fetcher(url(`books/${id}`))

  return {
    props: {
      books,
    },
  }
}

type Props = {
  books: {
    data: BookDetailType
  }
}

const BookPage = (props: Props): JSX.Element => {
  const router = useRouter()
  const {id} = router.query
  const {data: books} = useSWR(() => (id ? url(`books/${id}`) : null), {
    initialData: props.books,
  })

  return (
    <Layout>
      <BookDetail book={books.data} />
    </Layout>
  )
}

export default BookPage
