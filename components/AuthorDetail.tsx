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

const Shortener = tw.div`
  truncate w-144
`

const Bio = tw.div`
  w-144 text-gray-900 space-y-2
`

type BiographyProps = {
  author: AuthorDetailType
}

function Biography({author}: BiographyProps): JSX.Element {
  const [showFullBiography, setShowFullBiography] = React.useState(false)

  return showFullBiography ? (
    <Bio dangerouslySetInnerHTML={{__html: author.formatted_biography}} />
  ) : (
    <div>
      <Shortener
        dangerouslySetInnerHTML={{__html: author.biography}}
      ></Shortener>
      <button
        onClick={() => setShowFullBiography(true)}
        className="text-indigo-700 focus:outline-none"
      >
        Zobrazit celý životopis
      </button>
    </div>
  )
}

const Header = tw.div`
  flex items-center space-x-4
`

const Portrait = tw.img`
  flex-shrink-0 object-cover w-24 h-24 rounded-full
`

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
        <div>
          <Title>{author.name}</Title>
          <Info>
            {' '}
            <Link
              href="/nationalities/[id]"
              as={`/nationalities/${author.nationality.id}`}
              passHref
            >
              <A>{author.nationality.name}</A>
            </Link>
            , {formattedBornDie(author)}
          </Info>
        </div>
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
