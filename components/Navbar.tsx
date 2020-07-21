import Link from 'next/link'
import NavLink from '@components/NavLink'
import React from 'react'
import tw from 'twin.macro'

const Wrapper = tw.div`
  space-y-4
`

const TopBar = tw.div`
  flex items-center justify-between
`

const Title = tw.h1`
  text-2xl font-semibold text-indigo-700
`

const Nav = tw.nav`
  flex border-b border-gray-300 space-x-8
`

const Navbar = (): JSX.Element => {
  return (
    <Wrapper>
      <TopBar>
        <Link href="/">
          <a>
            <Title>MojeKniha</Title>
          </a>
        </Link>
      </TopBar>
      <Nav>
        <NavLink href="/">Novinky</NavLink>
        <NavLink href="/authors">Autoři</NavLink>
      </Nav>
    </Wrapper>
  )
}

export default Navbar
