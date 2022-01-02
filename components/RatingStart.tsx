import {Rating} from 'react-simple-star-rating'
import React from 'react'
import tw from 'twin.macro'

const Wrapper = tw.div`
  flex items-end space-x-2
`

const TextRating = tw.div`
  text-gray-500 text-sm
`

type Props = {
  rating: number | null
  count: number
}

const maxCount = 5

const RatingStart = ({rating, count}: Props): JSX.Element => {
  const ratingValue = rating === null ? 0 : (rating / maxCount) * 100

  return (
    <Wrapper>
      <Rating
        iconsCount={maxCount}
        size={24}
        ratingValue={ratingValue}
        allowHalfIcon={false}
        readonly
      />
      <TextRating>{count} hodnocení</TextRating>
    </Wrapper>
  )
}

export default RatingStart
