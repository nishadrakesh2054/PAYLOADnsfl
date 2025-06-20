import React from 'react'
import './styles.css'

export const metadata = {
  title: 'NSFL - Nepal School Football League',
  description:
    'Official site of NSFL - Nepal School Football League. Stay updated with fixtures, results, teams, and league standings.',
}
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
