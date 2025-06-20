import { CollectionConfig } from 'payload'

const Subscriber: CollectionConfig = {
  slug: 'subscribers',
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
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
  ],
}

export default Subscriber
