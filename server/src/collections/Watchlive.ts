import { CollectionConfig } from 'payload'
import { extractVideoId } from '../services/YoutubeService'

const Watchlive: CollectionConfig = {
  slug: 'watchlive',
  admin: {
    useAsTitle: 'id',
    group: 'CONTENT',
  },
  access: {
    read: () => true,

    update: ({ req }) => {
      return (
        req.user?.role === 'admin' || req.user?.role === 'viewer' || req.user?.role === 'editor'
      )
    },

    create: ({ req }) => {
      return (
        req.user?.role === 'admin' || req.user?.role === 'viewer' || req.user?.role === 'editor'
      )
    },

    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.videoUrl) {
          const videoId = extractVideoId(data.videoUrl)
          if (!videoId) {
            throw new Error('Invalid YouTube URL')
          }
          data.videoId = videoId
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      label: 'YouTube URL',
      validate: (value: string | string[] | null | undefined) => {
        if (!value) return 'YouTube URL is required'
        return extractVideoId(value as string) ? true : 'Please enter a valid YouTube URL'
      },
    },
    {
      name: 'videoId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      label: 'Active Status',
    },
    // {
    //   name: 'match',
    //   type: 'relationship',
    //   relationTo: 'matches',
    //   required: true,
    //   label: 'Match',
    // },
  ],
}

export default Watchlive
