import { CollectionConfig } from 'payload'
import { extractVideoId, fetchYouTubeStats, formatDuration } from '../services/YoutubeService'

const Highlight: CollectionConfig = {
  slug: 'highlights',
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

          const stats = await fetchYouTubeStats(videoId)
          if (stats) {
            return {
              ...data,
              views: stats.views,
              duration: formatDuration(stats.duration),
              publishedDate: stats.publishedDate ? new Date(stats.publishedDate) : null,
              lastUpdated: new Date(),
            }
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Untitled',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Thumbnail Image',
    },
    {
      name: 'views',
      type: 'number',
      label: 'Views',
    },
    {
      name: 'duration',
      type: 'text',
      required: false,
      label: 'Duration',
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: false,
      label: 'YouTube URL',
      validate: (value: string | string[] | null | undefined) => {
        if (!value) return true
        return extractVideoId(value as string) ? true : 'Please enter a valid YouTube URL'
      },
    },
    {
      name: 'videoId',
      type: 'text',
      required: false,
      label: 'Video ID',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: false,
      label: 'Published Date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Last Updated',
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default Highlight
