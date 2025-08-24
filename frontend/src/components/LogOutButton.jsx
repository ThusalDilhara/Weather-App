import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <button  className="px-4 py-2 rounded-xl border border-slate-300 text-sm text-white
    hover:bg-red-400"
     onClick={() => logout()}>Logout</button>
  )
}

export default LogoutButton