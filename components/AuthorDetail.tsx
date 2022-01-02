import A from './Atoms/A'
import {AuthorDetail as AuthorDetailType} from '@interfaces/index'
import Link from 'next/link'
import PlainBookList from './PlainBookList'
import React from 'react'
import Spacer from './Spacer'
import Subtitle from './Atoms/Subtitle'
import Title from './Atoms/Title'
import {formattedBornDie} from 'utils'
import tw from 'twin.macro'

const Bio = tw.div`
  w-full max-w-3xl text-gray-900 space-y-2
`

type BiographyProps = {
  author: AuthorDetailType
}

function Biography({author}: BiographyProps): JSX.Element {
  return <Bio dangerouslySetInnerHTML={{__html: author.formatted_biography}} />
}

const Header = tw.div`
  sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-4
`

const Portrait = tw.img`
  flex-shrink-0 object-cover w-24 h-24 rounded-full
`

const BasicInfo = tw.div``

const Info = tw.h3`
  text-sm text-gray-700
`

type Props = {
  author: AuthorDetailType
}

const AuthorDetail = ({author}: Props): JSX.Element => {
  return (
    <Spacer y={4}>
      <Header>
        <Portrait src={author.portrait_url} alt={author.name} />
        <BasicInfo>
          <Title>{author.name}</Title>
          <Info>
            <Link
              href="/nationalities/[id]"
              as={`/nationalities/${author.nationality.id}`}
              passHref
            >
              <A>{author.nationality.name}</A>
            </Link>
            , {formattedBornDie(author)}
          </Info>
        </BasicInfo>
      </Header>
      <Biography author={author} />
      {author.series.length > 0 && (
        <Spacer y={2}>
          <Subtitle>Série</Subtitle>
          {author.series.map(serie => (
            <Link
              key={serie.id}
              href="/series/[id]"
              as={`/series/${serie.id}`}
              passHref
            >
              <A>{serie.name}</A>
            </Link>
          ))}
        </Spacer>
      )}
      <Spacer y={2}>
        <Subtitle>Knihy autora</Subtitle>
        <PlainBookList books={author.books} />
      </Spacer>
    </Spacer>
  )
}

export default AuthorDetail
