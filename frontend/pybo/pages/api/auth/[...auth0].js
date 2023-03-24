// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: 'pybo',
      scope: 'openid profile email edit:notice delete:notice create:notice' // or AUTH0_SCOPE
    }
  })
});