import {QueryClient, dehydrate} from 'react-query'
import {authorKeys, fetchAuthor, useAuthorQuery} from 'api'

import AuthorDetail from '@components/AuthorDetail'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import React from 'react'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const id = context.params.id as string

  await queryClient.prefetchQuery(authorKeys.detail(id), () => fetchAuthor(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const AuthorPage = (): JSX.Element => {
  const router = useRouter()
  const id = router.query.id as string

  const {data: author, isLoading, isError} = useAuthorQuery(id)

  return (
    <Layout>
      {isLoading || isError ? (
        <Loader />
      ) : (
        <AuthorDetail author={author.data} />
      )}
    </Layout>
  )
}

export default AuthorPage
