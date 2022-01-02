import 'tailwindcss/dist/base.min.css'
import 'tailwindcss/dist/utilities.min.css'
import '../styles/app.css'

import {Hydrate, QueryClient, QueryClientProvider} from 'react-query'

import {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'

const queryClientOptions = {
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error?.response?.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
    },
  },
}

function App({Component, pageProps}: AppProps): JSX.Element {
  const [queryClient] = React.useState(
    () => new QueryClient(queryClientOptions),
  )

  return (
    <>
      <Head>
        <title>MojeKniha</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="MojeKniha - ukázková aplikace" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
