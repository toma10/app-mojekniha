import {Author, Book, Genre, Nationality, PaginationLinks} from 'interfaces'
import {fetcher, url} from 'utils'

import AuthorList from '@components/AuthorList'
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

  const nationalities = await fetcher(url(`nationalities/${id}`))
  const authors = await fetcher(
    url(`authors?filter[nationality.id]=${id}&page=${page}`),
  )

  return {
    props: {
      nationalities,
      authors,
    },
  }
}

type Props = {
  nationalities: {
    data: Nationality
  }
  authors: {
    data: Author[]
    meta: {
      links: PaginationLinks
    }
  }
}

const TagsPage = (props: Props): JSX.Element => {
  const router = useRouter()
  const {id} = router.query
  const page = router.query.page || '1'

  const {data: nationalities} = useSWR(
    () => (id ? url(`nationalities/${id}`) : null),
    {
      initialData: props.nationalities,
    },
  )
  const {data: authors} = useSWR(
    () =>
      id ? url(`authors?filter[nationality.id]=${id}&page=${page}`) : null,
    {initialData: props.authors},
  )

  return (
    <Layout>
      <Spacer y={4}>
        <MutedSubTitle>Národnost: {nationalities.data.name}</MutedSubTitle>
        <Spacer y={8}>
          <AuthorList authors={authors.data} />
          <Pagination url={`/nationalities/${id}`} links={authors.meta.links} />
        </Spacer>
      </Spacer>
    </Layout>
  )
}

export default TagsPage
