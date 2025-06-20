import { Link } from '@payloadcms/ui'

// Your custom SVG icon (you can customize this path).
function LogoutIcon() {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
  )
}

export const Logout = () => {
  return (
<Link
  href="/admin/logout"
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(90deg, #f013ac, #9e0e8f)',
    padding: '10px 24px',
    borderRadius: '8px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  }}

>
  <LogoutIcon style={{ fontSize: '16px' }} />
  Logout
</Link>

  )
}
