import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { fetchCharacters } from 'src/store/slices/characters';
import { useAppDispatch } from 'src/hooks';
import disneyImg from 'src/assets/images/disneyland.jpg';
import { StyledCardMedia } from './styles';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <>
      <Stack direction='column' spacing={2} sx={{ mb: 1 }}>
        <Card>
          <StyledCardMedia
            component='img'
            alt='Disney Characters Dashboard'
            image={disneyImg}
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
};
