import {fetcher, url} from 'utils'

import AuthorDetail from '@components/AuthorDetail'
import {AuthorDetail as AuthorDetailType} from 'interfaces'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import React from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async context => {
  const {id} = context.params
  const author = await fetcher(url(`authors/${id}`))

  return {
    props: {
      author,
    },
  }
}

type Props = {
  author: {
    data: AuthorDetailType
  }
}

const AuthorPage = (props: Props): JSX.Element => {
  const router = useRouter()
  const {id} = router.query
  const {data: author} = useSWR(() => (id ? url(`authors/${id}`) : null), {
    initialData: props.author,
  })

  return (
    <Layout>
      <AuthorDetail author={author.data} />
    </Layout>
  )
}

export default AuthorPage
