import {BookDetail as BookDetailType, Genre, Tag} from 'interfaces'

import A from './Atoms/A'
import Link from 'next/link'
import LinksList from './LinksList'
import React from 'react'
import Spacer from './Spacer'
import Title from './Atoms/Title'
import tw from 'twin.macro'

const Header = tw.div``

const Content = tw.div`
  grid gap-12 sm:grid-cols-2
`

const Img = tw.img`
  w-full
`

const Description = tw.div`
  text-gray-900 space-y-2
`

const Ul = tw.ul`
  space-y-1
`

const Li = tw.li``

type Props = {
  book: BookDetailType
}

function renderGenre(genre: Genre) {
  return (
    <Link href="/genres/[id]" as={`/genres/${genre.id}`} passHref>
      <A>{genre.name}</A>
    </Link>
  )
}

function renderTag(tag: Tag) {
  return (
    <Link href="/tags/[id]" as={`/tags/${tag.id}`} passHref>
      <A>{tag.name}</A>
    </Link>
  )
}

const BookDetail = ({book}: Props): JSX.Element => {
  return (
    <Spacer y={3}>
      <Header>
        <Title>{book.name}</Title>
        <Link href="/authors/[id]" as={`/authors/${book.author.id}`} passHref>
          <A>{book.author.name}</A>
        </Link>
      </Header>
      <Content>
        <Img src={book.cover_url} alt={book.name} />
        <Spacer y={3}>
          <Ul>
            <Li>Originální název: {book.original_name}</Li>
            <Li>Vydáno: {book.release_year}</Li>
            {book.series && (
              <Li>
                Série:{' '}
                <Link
                  href="/series/[id]"
                  as={`/series/${book.series.id}`}
                  passHref
                >
                  <A>{book.series.name}</A>
                </Link>
              </Li>
            )}
            <Li>
              Žánry: <LinksList items={book.genres} renderItem={renderGenre} />
            </Li>
            <Li>
              Tagy: <LinksList items={book.tags} renderItem={renderTag} />
            </Li>
          </Ul>
          <Description
            dangerouslySetInnerHTML={{__html: book.formatted_description}}
          />
        </Spacer>
      </Content>
    </Spacer>
  )
}

export default BookDetail
