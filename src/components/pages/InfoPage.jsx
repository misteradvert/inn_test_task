import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';

function InfoPage() {
  const [id, setId] = useState('');
  const [input, setInput] = useState('');
  const [data, setData] = useState({
    value: '',
    name: '',
    post: '',
    unrestricted_value: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalConfirm = () => {
    window.open(`https://yandex.ru/maps/?text=${data.unrestricted_value}`);
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const newId = pathParts[pathParts.length - 1];
    setId(newId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idAsNumber = Number(id);
        if (!Number.isNaN(idAsNumber)) {
          const response = await fetch(`/api/fetchData/${idAsNumber}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result = await response.json();
          const suggestion = result.suggestions[0];
          const { value } = suggestion;
          const { name, post } = suggestion.data.management;
          const { unrestricted_value } = suggestion.data.address;
          setData({
            value,
            name,
            post,
            unrestricted_value,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ value: 'Произошла ошибка при получении данных' });
      }
    };
    fetchData();
  }, [id]);

  const handleSearch = async () => {
    if (input.trim()) {
      try {
        window.location = `/info/${input}`;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '150px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ marginLeft: '20px', height: '36.5px' }}
          >
            Найти
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: '50px',
            '& > div': { marginBottom: '15px' },
            fontFamily: 'Arial, sansSerif',
          }}
        >
          <div style={{ fontSize: '20px' }}>{data.value}</div>
          <div>
            Основатель:
            {data.name}
          </div>
          <div>
            Должность:
            {data.post}
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => setModalVisible(true)}>
            Адрес: {data.unrestricted_value}
          </div>
        </Box>

        <Modal
          open={modalVisible}
          onClose={handleModalCancel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: 300,
              bgcolor: 'background.paper',
              fontFamily: 'Arial, sansSerif',
              p: 2,
            }}
          >
            <p id="modal-modal-title">Вы действительно хотите перейти на внешний ресурс?</p>
            <Box>
              <Button onClick={handleModalConfirm}>Перейти</Button>
              <Button onClick={handleModalCancel}>Отказаться</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default InfoPage;
