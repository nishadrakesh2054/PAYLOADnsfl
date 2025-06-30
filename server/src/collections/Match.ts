import { CollectionConfig } from 'payload'

const Match: CollectionConfig = {
  slug: 'matches',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['match_date', 'homeTeam', 'awayTeam', 'status', 'scoreHome', 'scoreAway'],
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
  fields: [
    {
      name: 'match_date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime', 
          displayFormat: 'yyyy-MM-dd',        },
      },
    },
    {
      name: 'time',
      type: 'text', // Payload has no TIME type, so store as string (e.g., 'HH:mm:ss')
      required: true,
    },
    {
      name: 'homeTeam',
      type: 'relationship',
      relationTo: 'teams',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'homePlayers',
      label: 'Home Team Players',
      type: 'relationship',
      relationTo: 'players',
      hasMany: true,
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data.homeTeam),
      },
      filterOptions: ({ siblingData }) => {
        // Type-safe access to homeTeam
        if (siblingData && typeof siblingData === 'object' && 'homeTeam' in siblingData) {
          const teamId = (siblingData as { homeTeam?: string }).homeTeam
          if (teamId) return { team: { equals: teamId } }
        }
        return false
      },
    },
    {
      name: 'awayTeam',
      type: 'relationship',
      relationTo: 'teams',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'awayPlayers',
      label: 'Away Team Players',
      type: 'relationship',
      relationTo: 'players',
      hasMany: true,
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data.awayTeam),
      },
      filterOptions: ({ siblingData }) => {
        // Type-safe access to awayTeam
        if (siblingData && typeof siblingData === 'object' && 'awayTeam' in siblingData) {
          const teamId = (siblingData as { awayTeam?: string }).awayTeam
          if (teamId) return { team: { equals: teamId } }
        }
        return false
      },
    },
    {
      name: 'venue',
      type: 'text',
      required: true,
    },
    {
      name: 'week',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Upcoming',
          value: 'upcoming',
        },
        {
          label: 'Running',
          value: 'running',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      defaultValue: 'upcoming',
      required: true,
    },
    {
      name: 'scoreHome',
      label: 'Home Team Score',
      type: 'number',
      required: false,
    },
    {
      name: 'scoreAway',
      label: 'Away Team Score',
      type: 'number',
      required: false,
    },
    {
      name: 'referee',
      type: 'text',
      required: false,
    },
    {
      name: 'assistantReferee1',
      type: 'text',
      required: false,
    },
    {
      name: 'assistantReferee2',
      type: 'text',
      required: false,
    },
    {
      name: 'fourthOfficial',
      type: 'text',
      required: false,
    },
  ],
  timestamps: true,
}

export default Match
