import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
} from '@mui/material';
import UserIcon from '@mui/icons-material/Person';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/store/slices';

export const CharacterModal = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const { open, data } = useAppSelector((state) => state.modal);

  if (!data) return null;

  return (
    <Dialog open={open} onClose={() => dispatch(closeModal())} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '1.4rem', color: '#787878' }}>
        <UserIcon sx={{ pr: 1 }} />
        {data.name}
      </DialogTitle>

      <DialogContent dividers>
        <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
          <List dense={true}>
            <Box mb={2} display='flex' flexDirection={'column'}>
              <Typography variant='h6' pb={1}>Films:</Typography>
              {data.films.map((film, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={film} />
                </ListItem>
              ))}
            </Box>

            <Box mb={2} display='flex' flexDirection={'column'}>
              <Typography variant='h6' pb={1}>TV Shows:</Typography>
              {data.tvShows.map((show, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={show} />
                </ListItem>
              ))}
            </Box>

            <Box mb={2} display='flex' flexDirection={'column'}>
              <Typography variant='h6' pb={1}>Video Games:</Typography>
              {data.videoGames.map((vgame, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={vgame} />
                </ListItem>
              ))}
            </Box>
          </List>

          <Box display='flex'>
            <img src={data.imageUrl} alt={`${data.name} image`} style={{ maxWidth: '250px', height: 'auto' }} />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
