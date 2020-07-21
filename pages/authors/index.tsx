import {Author, PaginationLinks} from 'interfaces'
import {fetcher, url} from 'utils'

import AuthorList from '@components/AuthorList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Pagination from '@components/Pagination'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async context => {
  const page = context.query.page || '1'
  const authors = await fetcher(url(`authors?page=${page}`))

  return {
    props: {
      authors,
    },
  }
}

type Props = {
  authors: {
    data: Author[]
    meta: {
      links: PaginationLinks
    }
  }
}

const AuthorsPage = (props: Props): JSX.Element => {
  const router = useRouter()
  const page = router.query.page || '1'
  const {data: authors} = useSWR(() => url(`authors?page=${page}`), {
    initialData: props.authors,
  })

  return (
    <Layout>
      <Spacer y={8}>
        <AuthorList authors={authors.data} />
        <Pagination url="/" links={authors.meta.links} />
      </Spacer>
    </Layout>
  )
}

export default AuthorsPage
