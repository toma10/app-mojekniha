import {QueryClient, dehydrate, useQuery} from 'react-query'
import {defaultListQueryOptions, fetchAuthors, fetchNationality} from 'api'

import AuthorList from '@components/AuthorList'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import MutedSubTitle from '@components/Atoms/MutedSubTitle'
import Pagination from '@components/Pagination'
import PlaceholdersList from '@components/PlaceholdersList'
import React from 'react'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const id = context.params.id as string
  const page = (context.query.page as string) || '1'

  await queryClient.prefetchQuery(['nationality', id], () =>
    fetchNationality(id),
  )
  await queryClient.prefetchQuery(['authors', page, 'nationality', id], () =>
    fetchAuthors(page, {'nationality.id': id}),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const NationalityPage = (): JSX.Element => {
  const router = useRouter()
  const id = (router.query.id as string) || '1'
  const page = (router.query.page as string) || '1'

  const {
    data: nationality,
    isLoading: nationalityIsLoading,
    isError: nationalityIsError,
  } = useQuery(['nationality', id], () => fetchNationality(id))
  const {
    data: authors,
    isLoading: authorsIsLoading,
    isError: authorsIsError,
  } = useQuery(
    ['authors', page, 'nationality', id],
    () => fetchAuthors(page, {'nationality.id': id}),
    defaultListQueryOptions(),
  )

  const isLoading = nationalityIsLoading || authorsIsLoading
  const isError = nationalityIsError || authorsIsError

  return (
    <Layout>
      {isLoading || isError ? (
        <PlaceholdersList items={15} />
      ) : (
        <Spacer y={4}>
          <MutedSubTitle>Národnost: {nationality.data.name}</MutedSubTitle>
          <Spacer y={8}>
            <AuthorList authors={authors.data} />
            <Pagination
              url={`/nationalities/${id}`}
              links={authors.meta.links}
            />
          </Spacer>
        </Spacer>
      )}
    </Layout>
  )
}

export default NationalityPage
