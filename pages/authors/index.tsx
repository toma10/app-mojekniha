import {QueryClient, dehydrate} from 'react-query'
import {authorKeys, fetchAuthors, useAuthorsQuery} from 'api'

import AuthorList from '@components/AuthorList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Pagination from '@components/Pagination'
import PlaceholdersList from '@components/PlaceholdersList'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const page = (context.query.page as string) || '1'

  await queryClient.prefetchQuery(authorKeys.list(page), () =>
    fetchAuthors(page),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const AuthorsPage = (): JSX.Element => {
  const router = useRouter()
  const page = (router.query.page as string) || '1'

  const {data: authors, isLoading, isError} = useAuthorsQuery(page)

  return (
    <Layout>
      {isLoading || isError ? (
        <PlaceholdersList items={15} />
      ) : (
        <Spacer y={8}>
          <AuthorList authors={authors.data} />
          <Pagination url="/" links={authors.meta.links} />
        </Spacer>
      )}
    </Layout>
  )
}

export default AuthorsPage
