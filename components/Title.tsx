import React from 'react'
import tw from 'twin.macro'

const Heading = tw.h1`
  text-blue-700 font-semibold
`

const Title = (): JSX.Element => {
  return (
    <Heading>
      Welcome to <a href="https://nextjs.org">Next.js!</a>
    </Heading>
  )
}

export default Title
