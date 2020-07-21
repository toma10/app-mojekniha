import {Book, Genre, PaginationLinks} from 'interfaces'
import {fetcher, url} from 'utils'

import BookList from '@components/BookList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import MutedSubTitle from '@components/Atoms/MutedSubTitle'
import Pagination from '@components/Pagination'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async context => {
  const {id} = context.params
  const page = context.query.page || '1'

  const genres = await fetcher(url(`genres/${id}`))
  const books = await fetcher(url(`books?filter[genres.id]=${id}&page=${page}`))

  return {
    props: {
      genres,
      books,
    },
  }
}

type Props = {
  genres: {
    data: Genre
  }
  books: {
    data: Book[]
    meta: {
      links: PaginationLinks
    }
  }
}

const GenresPage = (props: Props): JSX.Element => {
  const router = useRouter()
  const {id} = router.query
  const page = router.query.page || '1'

  const {data: genres} = useSWR(() => (id ? url(`genres/${id}`) : null), {
    initialData: props.genres,
  })
  const {data: books} = useSWR(
    () => (id ? url(`books?filter[genres.id]=${id}&page=${page}`) : null),
    {initialData: props.books},
  )

  return (
    <Layout>
      <Spacer y={4}>
        <MutedSubTitle>Žánr: {genres.data.name}</MutedSubTitle>
        <Spacer y={8}>
          <BookList books={books.data} />
          <Pagination url={`/genres/${id}`} links={books.meta.links} />
        </Spacer>
      </Spacer>
    </Layout>
  )
}

export default GenresPage
