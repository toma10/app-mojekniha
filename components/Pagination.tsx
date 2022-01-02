import Link from 'next/link'
import {PaginationLinks} from '@interfaces/index'
import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const Nav = tw.nav`
  -m-3 flex items-center justify-between px-4 sm:px-0
`

const Icon = tw.svg`
  w-5 h-5 m-3 text-gray-400
`

type PrevNextAProps = {
  isDisabled: boolean
}

const PrevNextA = styled.a(({isDisabled}: PrevNextAProps) => [
  tw`inline-flex items-center px-1 pt-4 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none focus:text-gray-700`,
  isDisabled && tw`pointer-events-none`,
])

const Links = tw.div`
  hidden md:flex
`

type AProps = {
  isActive: boolean
}

const A = styled.a(({isActive}: AProps) => [
  tw`inline-flex items-center px-4 pt-4 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none`,
  isActive
    ? tw`text-gray-700 focus:text-indigo-800`
    : tw`text-gray-500 hover:text-gray-700 focus:text-gray-700`,
])

// const Dots = tw.span`
//   inline-flex items-center px-4 pt-4 text-sm font-medium leading-5 text-gray-500
// `

function LeftArrow(): JSX.Element {
  return (
    <Icon viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </Icon>
  )
}

function RightArrow(): JSX.Element {
  return (
    <Icon viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </Icon>
  )
}

type Props = {
  url: string
  links: PaginationLinks
}

const Pagination = ({url, links}: Props): JSX.Element => {
  if (links.pages.length === 1) {
    return null
  }

  const previousLinkDisabled = links.previous.url === null
  const previousLinkHref = previousLinkDisabled
    ? '/'
    : `${url}?page=${new URL(links.previous.url).searchParams.get('page')}`

  const nextLinkDisabled = links.next.url === null
  const nextLinkHref = nextLinkDisabled
    ? '/'
    : `${url}?page=${new URL(links.next.url).searchParams.get('page')}`

  return (
    <Nav>
      <Link href={previousLinkHref} passHref>
        <PrevNextA isDisabled={previousLinkDisabled}>
          <LeftArrow />
          {links.previous.label}
        </PrevNextA>
      </Link>
      <Links>
        {links.pages.map(link => (
          <Link key={link.label} href={`${url}?page=${link.label}`} passHref>
            <A isActive={link.active}>{link.label}</A>
          </Link>
        ))}
      </Links>
      <Link href={nextLinkHref} passHref>
        <PrevNextA isDisabled={nextLinkDisabled}>
          {links.next.label}
          <RightArrow />
        </PrevNextA>
      </Link>
    </Nav>
  )
}

export default Pagination
