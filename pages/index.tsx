import {Book, PaginationLinks} from 'interfaces'
import {fetcher, url} from 'utils'

import BookList from '@components/BookList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Pagination from '@components/Pagination'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async context => {
  const page = context.query.page || '1'
  const books = await fetcher(url(`books?page=${page}`))

  return {
    props: {
      books,
    },
  }
}

type Props = {
  books: {
    data: Book[]
    meta: {
      links: PaginationLinks
    }
  }
}

const HomePage = (props: Props): JSX.Element => {
  const router = useRouter()
  const page = router.query.page || '1'
  const {data: books} = useSWR(() => url(`books?page=${page}`), {
    initialData: props.books,
  })

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
