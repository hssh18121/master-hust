import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Set the height to full viewport height
      }}>
      <CircularProgress />
    </Box>
  );
}