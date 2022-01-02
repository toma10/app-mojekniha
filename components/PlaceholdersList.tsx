import Card from './Atoms/Card'
import CardBody from './Atoms/CardBody'
import CardImgContainer from './Atoms/CardImgContainer'
import CardImgPlaceholder from './Atoms/CardImgPlaceholder'
import CardSubtitlePlaceholder from './Atoms/CardSubtitlePlaceholder'
import CardTitlePlaceholder from './Atoms/CardTitlePlaceholder'
import Grid from './Atoms/Grid'
import React from 'react'
import Spacer from './Spacer'

type Props = {
  items: number
}

const PlaceholdersList = ({items}: Props): JSX.Element => {
  return (
    <Grid>
      {[...Array(items)].map((_, index) => (
        <Card key={index}>
          <CardImgContainer>
            <CardImgPlaceholder />
          </CardImgContainer>
          <CardBody>
            <Spacer y={2}>
              <CardTitlePlaceholder />
              <CardSubtitlePlaceholder />
            </Spacer>
          </CardBody>
        </Card>
      ))}
    </Grid>
  )
}

export default PlaceholdersList
