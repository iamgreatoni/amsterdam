import { Search } from '@mui/icons-material';
import { IconButton, Paper } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmitHandler = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm('');
    }
  };
  return (
    <Paper
      component='form'
      onSubmit={handleSubmitHandler}
      sx={{
        pl: 2,
        mr: { sm: 5 },
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        boxShadow: 'none',
      }}
    >
      <input
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton
        type='submit'
        sx={{
          p: '10px',
          color: 'red',
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
