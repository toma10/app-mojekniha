import {QueryClient, dehydrate, useQuery} from 'react-query'
import {defaultListQueryOptions, fetchAuthors} from 'api'

import AuthorList from '@components/AuthorList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Pagination from '@components/Pagination'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const page = (context.query.page as string) || '1'

  await queryClient.prefetchQuery(['authors', page], () => fetchAuthors(page))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const AuthorsPage = (): JSX.Element => {
  const router = useRouter()
  const page = (router.query.page as string) || '1'

  const {data: authors, isLoading, isError} = useQuery(
    ['authors', page],
    () => fetchAuthors(page),
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
        <AuthorList authors={authors.data} />
        <Pagination url="/" links={authors.meta.links} />
      </Spacer>
    </Layout>
  )
}

export default AuthorsPage
