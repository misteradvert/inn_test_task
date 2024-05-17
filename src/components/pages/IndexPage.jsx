import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function IndexPage() {
  const [input, setInput] = useState('');
  const [data, setData] = useState('');

  const handleSearch = async () => {
    if (input.trim()) {
      try {
        const response = await fetch(`/api/fetchData/${input}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(JSON.stringify(result, null, 4));
        window.location = `/info/${input}`;
      } catch (error) {
        console.error('Error fetching data:', error);
        setData('Произошла ошибка при получении данных');
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '150px',
      }}
    >
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          display: 'flex',
        }}
      >
        <TextField
          fullWidth
          label="Укажите ИНН"
          id="fullWidth"
          value={input}
          name="id"
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: '20px' }}>
        Найти
      </Button>
    </Box>
  );
}
