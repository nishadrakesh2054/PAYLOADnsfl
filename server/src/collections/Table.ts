import { CollectionConfig } from 'payload'

const Table: CollectionConfig = {
  slug: 'tables',
  admin: {
    useAsTitle: 'id',
    group: 'MATCHES',
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
        const won = data.won || 0
        const drawn = data.drawn || 0
        const goalsFor = data.goalsFor || 0
        const goalsAgainst = data.goalsAgainst || 0

        data.points = won * 3 + drawn
        data.goalDifference = goalsFor - goalsAgainst

        return data
      },
    ],
  },
  fields: [
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'teams',
      required: true,
      label: 'Team',
      unique: true,
    },
    {
      name: 'played',
      type: 'number',
      required: true,

      label: 'Matches Played',
    },
    {
      name: 'won',
      type: 'number',
      required: true,

      label: 'Matches Won',
    },
    {
      name: 'drawn',
      type: 'number',
      required: true,

      label: 'Matches Drawn',
    },
    {
      name: 'lost',
      type: 'number',
      required: true,

      label: 'Matches Lost',
    },
    {
      name: 'goalsFor',
      type: 'number',
      required: true,

      label: 'Goals For',
    },
    {
      name: 'goalsAgainst',
      type: 'number',
      required: true,

      label: 'Goals Against',
    },
    {
      name: 'goalDifference',
      type: 'number',
      required: true,

      label: 'Goal Difference',
    },
    {
      name: 'points',
      type: 'number',
      required: true,

      label: 'Points',
    },
    {
      name: 'form',
      type: 'text',
      required: false,
      label: 'Form',
    },
  ],
}

export default Table
