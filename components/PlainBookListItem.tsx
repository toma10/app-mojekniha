import Card from './Atoms/Card'
import CardBody from './Atoms/CardBody'
import CardImg from './Atoms/CardImg'
import CardTitleA from './Atoms/CardTitleA'
import Link from 'next/link'
import {PlainBook} from '@interfaces/index'
import React from 'react'

type Props = {
  book: PlainBook
}

const PlainBookListItem = ({book}: Props): JSX.Element => {
  return (
    <Card>
      <Link href="/books/[id]" as={`/books/${book.id}`}>
        <a>
          <CardImg src={book.cover_url} alt={book.name} />
        </a>
      </Link>
      <CardBody>
        <Link href="/books/[id]" as={`/books/${book.id}`} passHref>
          <CardTitleA>{book.name}</CardTitleA>
        </Link>
      </CardBody>
    </Card>
  )
}

export default PlainBookListItem
