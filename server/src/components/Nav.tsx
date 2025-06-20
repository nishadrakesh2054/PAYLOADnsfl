
'use client'
import React, { useState } from 'react'
import { Link } from '@payloadcms/ui'
import '../style/custom.css'

const Nav: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    communication: true,
    content: true,
    teams: true,
    matches: true,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  return (
    <nav className="side-nav">
      {/* Header */}
      {/* <div className="nav-header">
        <Link href="/admin" className="nav-logo">
          <span className="logo-text">NSFL</span>
        </Link>
      </div> */}

      {/* Nav Groups */}
      <div className="nav-content">
        {/* TEAMS */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('teams')}>
            <span>Teams</span>
            <span className={`nav-arrow ${openGroups.teams ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.teams && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/teams">
                  <span className="nav-icon">⚽</span>
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/players">
                  <span className="nav-icon">🧍</span>
                  Players
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* MATCHES */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('matches')}>
            <span>Matches</span>
            <span className={`nav-arrow ${openGroups.matches ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.matches && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/tables">
                  <span className="nav-icon">📊</span>
                  Tables
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/matches">
                  <span className="nav-icon">📅</span>
                  Matches
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* CONTENT */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('content')}>
            <span>Content</span>
            <span className={`nav-arrow ${openGroups.content ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.content && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/blogs">
                  <span className="nav-icon">📝</span>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/highlights">
                  <span className="nav-icon">🎞️</span>
                  Highlights
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/watchlive">
                  <span className="nav-icon">📺</span>
                  Watchlives
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* COMMUNICATION */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('communication')}>
            <span>Communication</span>
            <span className={`nav-arrow ${openGroups.communication ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.communication && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/contacts">
                  <span className="nav-icon">📞</span>
                  Contacts
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/subscribers">
                  <span className="nav-icon">📧</span>
                  Subscribers
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/sponsors">
                  <span className="nav-icon">🤝</span>
                  Sponsors
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* MEDIA */}
        <div className="nav-group">
          <div className="nav-group-header">
            <span>Media</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/admin/collections/media">
                <span className="nav-icon">🖼️</span>
                Media
              </Link>
            </li>
          </ul>
        </div>
        {/* AUTHENTICATION */}
        <div className="nav-group">
          <div className="nav-group-header">
            <span>Authentication</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/admin/collections/users">
                <span className="nav-icon">👤</span>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="nav-footer">
        <Link href="/admin/logout" className="nav-logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-logout"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M9 12h12l-3 -3" />
            <path d="M18 15l3 -3" />
          </svg>
          Logout
        </Link>
      </div> */}
    </nav>
  )
}

export default Nav
