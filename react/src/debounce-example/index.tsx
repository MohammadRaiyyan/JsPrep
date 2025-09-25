import { useState, type ChangeEvent } from 'react';
import useDebounce from '../hooks/useDebounce';

function search() {
  console.log('Search: ', ...arguments);
}

export default function DebounceExample() {
  const [value, setValue] = useState('');
  const debounce = useDebounce(search, 500, { leading: true });

  const handleChange = (e: ChangeEvent) => {
    const { value: _value } = e.target as HTMLInputElement;
    setValue(_value);
    debounce(_value);
  };
  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
