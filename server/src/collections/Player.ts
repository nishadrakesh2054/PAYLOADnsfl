import { CollectionConfig } from 'payload'

const Player: CollectionConfig = {
  slug: 'players',
  admin: {
    useAsTitle: 'name',
    group: 'TEAMS',
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
      label: 'Player Name',
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      label: 'Position',
      options: [
        {
          label: 'Goalkeeper',
          value: 'goalkeeper',
        },
        {
          label: 'Defender',
          value: 'defender',
        },
        {
          label: 'Midfielder',
          value: 'midfielder',
        },
        {
          label: 'Forward',
          value: 'forward',
        },
      ],
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Player Image',
    },

    {
      name: 'appearance',
      type: 'number',
      required: false,
      label: 'Appearances',
      min: 0,
    },
    {
      name: 'cleansheet',
      type: 'number',
      required: false,
      label: 'Clean Sheets',
      min: 0,
    },
    {
      name: 'goals',
      type: 'number',
      required: false,
      label: 'Goals',
      min: 0,
    },
    {
      name: 'yellowcards',
      type: 'number',
      required: false,
      label: 'Yellow Cards',
      min: 0,
    },
    {
      name: 'redcards',
      type: 'number',
      required: false,
      label: 'Red Cards',
      min: 0,
    },
    {
      name: 'nationality',
      type: 'text',
      required: true,
      label: 'Nationality',
    },
    {
      name: 'dateofbirth',
      type: 'date',
      required: false,
      label: 'Date of Birth',
    },
    {
      name: 'height',
      type: 'group',
      required: false,
      label: 'Height',
      fields: [
        {
          name: 'feet',
          type: 'number',
          required: true,
          min: 0,
          max: 8,
          label: 'Feet',
        },
        {
          name: 'inches',
          type: 'number',
          required: true,
          min: 0,
          max: 11,
          label: 'Inches',
        },
      ],
    },
    {
      name: 'weight',
      type: 'group',
      required: false,
      label: 'Weight',
      fields: [
        {
          name: 'value',
          type: 'number',
          required: true,
          min: 0,
          max: 300,
          label: 'Weight (kg)',
        },
      ],
    },
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'teams',
      required: true,
      label: 'Team',
    },
  ],
}

export default Player
