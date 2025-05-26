import { useEffect, useState } from 'react';
import './css/header.css';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Form, Link, useSearchParams } from 'react-router';

export default function SearchHeader() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('search_keyword');
  const [text, setText] = useState('');
  useEffect(() => setText(keyword || ''), [keyword]);

  return (
    <header>
      <Link className='logo' to={'/'}>
        <BsYoutube className='text-brand text-4xl' />
        <h3 className='font-bold ml-2 text-3xl'>Youtube</h3>
      </Link>
      <Form className='search' method='get' action={'/results'}>
        <input
          type='text'
          name='search_keyword'
          className='search-tab'
          id='search-tab'
          placeholder='검색'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className='search-button'>
          <BsSearch />
        </button>
      </Form>
    </header>
  );
}
