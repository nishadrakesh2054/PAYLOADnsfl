import { CollectionConfig } from 'payload'

const Sponsor: CollectionConfig = {
  slug: 'sponsors',
  admin: {
    useAsTitle: 'id',
    group: 'COMMUNICATION',
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Sponsor Name',
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      label: 'Website URL',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Sponsor Logo',
    },
  ],
}

export default Sponsor
