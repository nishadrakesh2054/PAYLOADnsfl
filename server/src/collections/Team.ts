import { CollectionConfig } from 'payload'

const Team: CollectionConfig = {
  slug: 'teams',
  admin: {
    useAsTitle: 'team_name',
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
      name: 'team_name',
      type: 'text',
      required: true,
      label: 'Team Name',
    },
    {
      name: 'team_logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Team Logo',
    },
    {
      name: 'team_details',
      type: 'textarea',
      required: false,
      label: 'Team Details',
    },
    {
      name: 'team_manager',
      type: 'text',
      required: false,
      label: 'Team Manager',
    },
    {
      name: 'foundedYear',
      type: 'date',
      required: false,
      label: 'Founded Year',
      admin: {
        date: {
          pickerAppearance: 'dayOnly', // hides time selection
          displayFormat: 'yyyy', // optional: shows date only
        },
      },
    },
    {
      name: 'stadium',
      type: 'text',
      required: false,
      label: 'Stadium',
    },

    {
      name: 'players',
      label: 'Select Players',
      type: 'relationship',
      relationTo: 'players',
      hasMany: true,
      required: false,
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ id }) => {
        return {
          team: {
            equals: id,
          },
        }
      },
    },
  ],
}

export default Team
