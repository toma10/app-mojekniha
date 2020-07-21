import {Book} from '@interfaces/index'
import BookListItem from '@components/BookListItem'
import Grid from './Atoms/Grid'
import React from 'react'

type Props = {
  books: Book[]
}

const BookList = ({books}: Props): JSX.Element => {
  return (
    <Grid>
      {books.map(book => (
        <BookListItem key={book.id} book={book} />
      ))}
    </Grid>
  )
}

export default BookList
