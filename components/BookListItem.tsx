import {Book} from '@interfaces/index'
import Card from './Atoms/Card'
import CardBody from './Atoms/CardBody'
import CardImg from './Atoms/CardImg'
import CardSubtitleA from './Atoms/CardSubtitleA'
import CardTitleA from './Atoms/CardTitleA'
import Link from 'next/link'
import React from 'react'

type Props = {
  book: Book
}

const BookListItem = ({book}: Props): JSX.Element => {
  return (
    <Card>
      <Link href="/books/[id]" as={`/books/${book.id}`}>
        <a>
          <CardImg src={book.cover_url} alt={book.name} />
        </a>
      </Link>
      <CardBody>
        <Link href="/books/[id]" as={`/books/${book.id}`} passHref>
          <CardTitleA>
            <h2>{book.name}</h2>
          </CardTitleA>
        </Link>
        <Link href="/authors/[id]" as={`/authors/${book.author.id}`} passHref>
          <CardSubtitleA>
            <h3>{book.author.name}</h3>
          </CardSubtitleA>
        </Link>
      </CardBody>
    </Card>
  )
}

export default BookListItem
