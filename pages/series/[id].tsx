import {QueryClient, dehydrate, useQuery} from 'react-query'

import A from '@components/Atoms/A'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Link from 'next/link'
import MutedSubTitle from '@components/Atoms/MutedSubTitle'
import PlaceholdersList from '@components/PlaceholdersList'
import PlainBookList from '@components/PlainBookList'
import React from 'react'
import Spacer from '@components/Spacer'
import {fetchSeries} from 'api'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const id = context.params.id as string

  await queryClient.prefetchQuery(['series', id], () => fetchSeries(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const SeriesPage = (): JSX.Element => {
  const router = useRouter()
  const id = router.query.id as string

  const {data: series, isLoading, isError} = useQuery(['series', id], () =>
    fetchSeries(id),
  )

  return (
    <Layout>
      {isLoading || isError ? (
        <PlaceholdersList items={15} />
      ) : (
        <Spacer y={4}>
          <div>
            <MutedSubTitle>Série: {series.data.name}</MutedSubTitle>
            <MutedSubTitle>
              Autor:{' '}
              <Link
                href="/authors/[id]"
                as={`/authors/${series.data.author.id}`}
                passHref
              >
                <A>{series.data.author.name}</A>
              </Link>
            </MutedSubTitle>
          </div>
          <Spacer y={8}>
            <PlainBookList books={series.data.books} />
          </Spacer>
        </Spacer>
      )}
    </Layout>
  )
}

export default SeriesPage
