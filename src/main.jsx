import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import BlogList from './pages/BlogList.jsx';
import LanguageContext from './contexts/LanguageContext.jsx';
import { BLOG_TITLE } from '../literal.js';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <p>Error</p>,
    children: [{ index: true, Component: BlogList }],
  },
]);

document.title = BLOG_TITLE;

let container = null;
document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
      <LanguageContext>
        <RouterProvider router={router} />
      </LanguageContext>
    );
  }
});
