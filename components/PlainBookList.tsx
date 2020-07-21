import Grid from './Atoms/Grid'
import {PlainBook} from '@interfaces/index'
import PlainBookListItem from './PlainBookListItem'
import React from 'react'

type Props = {
  books: PlainBook[]
}

const BookList = ({books}: Props): JSX.Element => {
  return (
    <Grid>
      {books.map(book => (
        <PlainBookListItem key={book.id} book={book} />
      ))}
    </Grid>
  )
}

export default BookList
