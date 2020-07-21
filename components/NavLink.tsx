import React, {ReactNode} from 'react'

import Link from 'next/link'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import {useRouter} from 'next/router'

type NavAProps = {
  isActive: boolean
}

const NavA = styled.a(({isActive}: NavAProps) => [
  tw`inline-flex items-center px-1 py-3 text-sm font-medium leading-5 transition duration-150 ease-in-out border-b-2 focus:outline-none`,
  isActive
    ? tw`text-gray-900 border-indigo-500 focus:border-indigo-700`
    : tw`text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300`,
])

type Props = {
  children: ReactNode
  href: string
}

const NavLink = ({children, href}: Props): JSX.Element => {
  const router = useRouter()

  return (
    <Link href={href} passHref>
      <NavA isActive={router.pathname === href}>{children}</NavA>
    </Link>
  )
}

export default NavLink
