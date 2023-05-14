import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Knowledge } from './pages/KnowledgeBase/ui.tsx';
import { Definition } from './pages/DefinitionDisease/ui.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }, 
   {
    path: "/definition-disease",
    element: <Definition />,
  },
  {
    path: "/knowledge-base",
    element: <Knowledge />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
