import { BrowserRouter, Route, Routes } from 'react-router';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/blog' element={<BlogList />} />
        <Route path='/blog/:slug' element={<BlogPost />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
