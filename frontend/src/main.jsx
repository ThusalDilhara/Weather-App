import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = import.meta.env.VITE_WEATHER_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_WEATHER_APP_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_WEATHER_APP_AUTH0_AUDIENCE;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience:audience
      }}  //redirect to current address of application
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
