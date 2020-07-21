import {fetcher, url} from 'utils'

import A from '@components/Atoms/A'
import {GetServerSideProps} from 'next'
import Layout from '@components/Layout'
import Link from 'next/link'
import MutedSubTitle from '@components/Atoms/MutedSubTitle'
import PlainBookList from '@components/PlainBookList'
import React from 'react'
import {SeriesDetail as SeriesDetailType} from 'interfaces'
import Spacer from '@components/Spacer'
import {useRouter} from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async context => {
  const {id} = context.params
  const series = await fetcher(url(`series/${id}`))

  return {
    props: {
      series,
    },
  }
}

type Props = {
  series: {
    data: SeriesDetailType
  }
}

const SeriesPage = (props: Props): JSX.Element => {
  const router = useRouter()
  const {id} = router.query
  const {data: series} = useSWR(() => (id ? url(`series/${id}`) : null), {
    initialData: props.series,
  })
  console.log(series)

  return (
    <Layout>
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
    </Layout>
  )
}

export default SeriesPage
