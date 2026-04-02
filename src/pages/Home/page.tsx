import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import disneyImg from 'src/assets/images/disneyland.jpg';
import { StyledCardMedia } from './styles';
import { PfTable } from 'src/components';
import { CharacterModal } from 'src/components/Table/components/RowDataModal';

export const HomePage = () => (
  <>
    <Stack direction='column' spacing={2} sx={{ mb: 1 }}>
      <Card>
        <StyledCardMedia
          component='img'
          alt='Disney Characters Dashboard'
          image={disneyImg}
          data-testid='characters-img'
        />
        <CardContent>
          <Typography variant='h4' justifySelf={'start'} data-testid='characters-title'>
            Disney Characters Dashboard (React)
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CharacterModal />
          <PfTable />
        </CardContent>
      </Card>
    </Stack>
  </>
);
