import {Author} from '@interfaces/index'
import AuthorListItem from '@components/AuthorListItem'
import Grid from './Atoms/Grid'
import React from 'react'

type Props = {
  authors: Author[]
}

const AuthorList = ({authors}: Props): JSX.Element => {
  return (
    <Grid>
      {authors.map(author => (
        <AuthorListItem key={author.id} author={author} />
      ))}
    </Grid>
  )
}

export default AuthorList
