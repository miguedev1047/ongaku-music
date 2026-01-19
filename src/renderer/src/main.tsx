import '@/styles/main.css'

import { scan } from 'react-scan'
import ReactDOM from 'react-dom/client'
import { queryClient } from '@/services/react-query'
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

scan({ enabled: import.meta.env.DEV })

const hashHistory = createHashHistory()

// Create a new router instance
const router = createRouter({
  routeTree,
  history: hashHistory,
  defaultPendingMs: 0,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: { queryClient }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
