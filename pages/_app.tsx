import 'tailwindcss/dist/base.min.css'
import 'tailwindcss/dist/utilities.min.css'

import {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'
import {SWRConfig} from 'swr'
import {fetcher} from 'utils'

const App = ({Component, pageProps}: AppProps): JSX.Element => (
  <>
    <Head>
      <title>MojeKniha</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="MojeKniha - ukázková aplikace" />
    </Head>
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  </>
)

export default App
