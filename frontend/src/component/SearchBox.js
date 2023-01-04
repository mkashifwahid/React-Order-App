import React from 'react';

export default function SearchBox() {
  const [query, setQuery] = setState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navivgate(query ? `/search/?query=${query}` : `/search`);
  };
  return <Form></Form>;
}
