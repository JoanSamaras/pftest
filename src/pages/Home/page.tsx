import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import disneyImg from 'src/assets/images/disneyland.jpg';
import { StyledCardMedia } from './styles';
import { PfTable } from 'src/components';

export const HomePage = () => (
  <>
    <Stack direction='column' spacing={2} sx={{ mb: 1 }}>
      <Card>
        <StyledCardMedia component='img' alt='Disney Characters Dashboard' image={disneyImg} />
        <CardContent>
          <Typography variant='h4' justifySelf={'start'}>
            Disney Characters Dashboard (React)
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <PfTable />
        </CardContent>
      </Card>
    </Stack>
  </>
);
