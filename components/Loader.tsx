import React from 'react'
import tw from 'twin.macro'

const Wrapper = tw.div`
  w-full my-16 text-center text-gray-700
`

const Loader = (): JSX.Element => {
  return <Wrapper>Loading...</Wrapper>
}

export default Loader
