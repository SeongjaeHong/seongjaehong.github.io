import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchHeader from './components/searchHeader';
import { Outlet } from 'react-router';
import { YoutubeApiProvider } from './context/YoutubeApiContext';

const queryclient = new QueryClient();

function App() {
  return (
    <>
      <SearchHeader />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryclient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
}

export default App;
