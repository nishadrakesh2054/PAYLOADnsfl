import { CollectionConfig } from 'payload'

const Blog: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
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
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'preview',
      type: 'text',
      maxLength: 300,
      label: 'Preview',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Read Time',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Match Reports',
          value: 'Match Reports',
        },
        {
          label: 'League News',
          value: 'League News',
        },
        {
          label: 'Team News',
          value: 'Team News',
        },
        {
          label: 'Interviews',
          value: 'Interviews',
        },
      ],
      defaultValue: 'League News',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Blog image',
    },
  ],
}

export default Blog
