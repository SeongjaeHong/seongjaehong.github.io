import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import BlogList from './pages/BlogList.jsx';
import LanguageContext from './contexts/LanguageContext.jsx';
import { BLOG_TITLE } from '../literal.js';
import BlogPost from './pages/BlogPost.jsx';
import ScreenContextProvider from './contexts/ScreenContextProvider';
import CategoryList from './pages/CategoryList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <p>Error</p>,
    children: [
      { index: true, Component: BlogList },
      { path: '/:postId', Component: BlogPost },
      { path: '/category', Component: CategoryList },
    ],
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
        <ScreenContextProvider>
          <RouterProvider router={router} />
        </ScreenContextProvider>
      </LanguageContext>
    );
  }
});
