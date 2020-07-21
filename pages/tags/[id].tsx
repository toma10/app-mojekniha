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

  const tags = await fetcher(url(`tags/${id}`))
  const books = await fetcher(url(`books?filter[tags.id]=${id}&page=${page}`))

  return {
    props: {
      tags,
      books,
    },
  }
}

type Props = {
  tags: {
    data: Genre
  }
  books: {
    data: Book[]
    meta: {
      links: PaginationLinks
    }
  }
}

const TagsPage = (props: Props): JSX.Element => {
  const router = useRouter()
  const {id} = router.query
  const page = router.query.page || '1'

  const {data: tags} = useSWR(() => (id ? url(`tags/${id}`) : null), {
    initialData: props.tags,
  })
  const {data: books} = useSWR(
    () => (id ? url(`books?filter[tags.id]=${id}&page=${page}`) : null),
    {initialData: props.books},
  )

  return (
    <Layout>
      <Spacer y={4}>
        <MutedSubTitle>Štítek: {tags.data.name}</MutedSubTitle>
        <Spacer y={8}>
          <BookList books={books.data} />
          <Pagination url={`/tags/${id}`} links={books.meta.links} />
        </Spacer>
      </Spacer>
    </Layout>
  )
}

export default TagsPage
