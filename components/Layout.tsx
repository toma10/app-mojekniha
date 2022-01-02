import React, {ReactNode} from 'react'

import Head from 'next/head'
import Navbar from '@components/Navbar'
import tw from 'twin.macro'

const Container = tw.div`
  max-w-6xl px-12 py-12 mx-auto sm:px-6 lg:px-8
`

const Header = tw.header``

const Main = tw.main`
  py-16
`

const Footer = tw.footer`
  text-sm text-center text-gray-700
`

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({children, title}: Props): JSX.Element => {
  return (
    <Container>
      {title && (
        <Head>
          <title>{title} | MojeKniha</title>
        </Head>
      )}
      <Header>
        <Navbar />
      </Header>
      <Main>{children}</Main>
      <Footer>© {new Date().getFullYear()} MojeKniha</Footer>
    </Container>
  )
}

export default Layout
