// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Contact from './collections/Contact'
import Subscriber from './collections/Subscriber'
import Sponsor from './collections/Sponsor'
import Blog from './collections/Blog'
import Team from './collections/Team'
import Player from './collections/Player'
import Table from './collections/Table'
import Match from './collections/Match'
import Highlight from './collections/Highlight'
import Watchlive from './collections/Watchlive'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
        titleSuffix: ' - Nsfl Admin',
        description: 'The best Football in the NEPAL',
        icons: [
          {
            rel: 'icon',
            type: 'image/png',
            url: '/nsflicon.png',
          },
        ],
      },
    components: {

      Nav: '../src/components/Nav.tsx',
      graphics: {
        Icon: '../src/components/NsflLogo.tsx',
        Logo: '../src/components/NsflBiglogo.tsx',
      },
      header: ['../src/components/Header.tsx'],

    },
  },
  cors: ['http://localhost:5173'], 
  collections: [
    Team,
    Player,
    Table,
    Match,
    Blog,
    Highlight,
    Watchlive,
    Contact,
    Subscriber,
    Sponsor,

    Users,
    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
