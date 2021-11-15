import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <title>include</title>
      </Head>

      <header >
        {home ? (
          <>
          </>
        ) : (
          <>
          </>
        )}
      </header>

      <main>{children}</main>

      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

    </div>
  )
}