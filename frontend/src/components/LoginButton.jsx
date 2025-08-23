import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <button 
      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800"
      onClick={() => loginWithRedirect()}>Login</button>
  )
}

export default LoginButton