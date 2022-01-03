import {Author} from '@interfaces/index'
import Card from './Atoms/Card'
import CardBody from './Atoms/CardBody'
import CardImg from './Atoms/CardImg'
import CardSubtitle from './Atoms/CardSubtitle'
import CardTitleA from './Atoms/CardTitleA'
import Link from 'next/link'
import React from 'react'
import {formattedBornDie} from 'utils'

type Props = {
  author: Author
}

const AuthorListItem = ({author}: Props): JSX.Element => {
  return (
    <Card>
      <Link href="/authors/[id]" as={`/authors/${author.id}`}>
        <a>
          <CardImg src={author.portrait_url} alt={author.name} />
        </a>
      </Link>
      <CardBody>
        <Link href="/authors/[id]" as={`/authors/${author.id}`} passHref>
          <CardTitleA>
            <h2>{author.name}</h2>
          </CardTitleA>
        </Link>
        <CardSubtitle>{formattedBornDie(author)}</CardSubtitle>
      </CardBody>
    </Card>
  )
}

export default AuthorListItem
