import {QueryClient, dehydrate, useQuery} from 'react-query'

import AuthorDetail from '@components/AuthorDetail'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import React from 'react'
import {fetchAuthor} from 'api'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const id = context.params.id as string

  await queryClient.prefetchQuery(['author', id], () => fetchAuthor(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const AuthorPage = (): JSX.Element => {
  const router = useRouter()
  const id = router.query.id as string

  const {data: author, isLoading, isError} = useQuery(['author', id], () =>
    fetchAuthor(id),
  )

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <Layout>
      <AuthorDetail author={author.data} />
    </Layout>
  )
}

export default AuthorPage
