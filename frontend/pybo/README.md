# Pybo - A Next.js Web Application
Pybo is a web application built with Next.js and React that allows users to view and manage notices. Users can view a list of notices, view details for individual notices, and create, modify, or delete their own notices.

> This repository contains the source code for the Pybo web application.

## Installation and Setup
> To install and run Pybo locally, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal in the repository directory.
3. Run npm install to install the required dependencies.
4. Create a .env.local file in the root directory and set the following environment variables:
- AUTH0_DOMAIN: Your Auth0 domain.
- AUTH0_CLIENT_ID: Your Auth0 client ID.
- AUTH0_CLIENT_SECRET: Your Auth0 client secret.
- AUTH0_SCOPE: The Auth0 scope for your application.
- AUTH0_REDIRECT_URI: The redirect URI for Auth0.
- AUTH0_POST_LOGOUT_REDIRECT_URI: The post-logout redirect URI for Auth0.
- AUTH0_SESSION_COOKIE_SECRET: A secret key used to sign session cookies.

> Run `npm run dev` to start the development server.

Open a web browser and navigate to http://localhost:3000 to view the Pybo web application.


### Directory Structure
> The Pybo source code is organized as follows:

- pages/: Contains the Next.js pages for the application.
- components/: Contains React components used in the application.
- public/: Contains static assets used in the application.
- api/: Contains API routes for the application.

### Dependencies
> Pybo depends on the following libraries:

- react: A JavaScript library for building user interfaces.
- react-bootstrap: A React-based UI toolkit.
- next.js: A framework for building server-rendered React applications.
- swr: A React data fetching library.
- @auth0/nextjs-auth0: An Auth0 SDK for Next.js applications.
- dotenv: A module for loading environment variables from a .env file.
- node-fetch: A module that provides a global fetch function for making HTTP requests in Node.js.