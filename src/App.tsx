import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { fetchCharacters } from 'src/store/slices/characters';
import { useAppDispatch } from 'src/hooks';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <>
      <Stack direction='column' spacing={2} sx={{ mb: 1 }}>
        <Card>
          <CardMedia
            component='img'
            alt='Disney Characters Dashboard'
            image='src/assets/images/disneyland.jpg'
            sx={{ maxHeight: 250, objectPosition: '30% 70%' }}
          />
          <Stack direction='row' alignItems='center' spacing={3} p={2} useFlexGap>
            <CardContent>
              <Typography variant='h4'>Disney Characters Dashboard (React)</Typography>
            </CardContent>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}

export default App;
