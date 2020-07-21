import React, {ReactNode} from 'react'

import styled from '@emotion/styled'
import tw from 'twin.macro'

const spaceX = {
  1: tw`space-x-1`,
  2: tw`space-x-2`,
  3: tw`space-x-3`,
  4: tw`space-x-4`,
  6: tw`space-x-6`,
  8: tw`space-x-8`,
}

const spaceY = {
  1: tw`space-y-1`,
  2: tw`space-y-2`,
  3: tw`space-y-3`,
  4: tw`space-y-4`,
  6: tw`space-y-6`,
  8: tw`space-y-8`,
}

const SpacerDiv = styled.div(({x, y}: SpacerProps) => [
  x && spaceX[x],
  y && spaceY[y],
])

type SpacerProps = {
  x?: 1 | 2 | 3 | 4 | 6 | 8
  y?: 1 | 2 | 3 | 4 | 6 | 8
}

type Props = SpacerProps & {
  children: ReactNode
}

const Spacer = ({children, x, y}: Props): JSX.Element => {
  return (
    <SpacerDiv x={x} y={y}>
      {children}
    </SpacerDiv>
  )
}

export default Spacer
