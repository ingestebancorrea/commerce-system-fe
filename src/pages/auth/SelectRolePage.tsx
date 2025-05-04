import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import client from '../../assets/client.jpg';
import { useNavigate } from 'react-router-dom';

export const SelectRolePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const aliasRole = (event.target as HTMLButtonElement).value;
    navigate(`/auth/register?role=${aliasRole}`);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 2 }}
    >
      <Grid
        item
        xs={10} sm={8} md={6} // Ancho responsivo
        sx={{
          padding: 3,
          bgcolor: 'white',
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            height: '40px',
            pt: '5px',
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'primary.main',
            borderRadius: 0.5,
            mb: 2,
          }}
        >
          <Typography variant="h5" color="white">
            Selecciona tu rol
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={2} 
          justifyContent="center" 
          direction={{ xs: 'column', sm: 'row' }} // Cambia la dirección según el tamaño de la pantalla
        >
          <Grid item xs={12} sm={12}>
            <Avatar
              alt="Cliente"
              src={client}
              sx={{ width: '100%', height: 'auto', mx: 'auto', borderRadius: 0 }}
            />
            <Box
              sx={{
                height: '40px',
                pt: '5px',
                pb: '5px',
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'white',
              }}
            >
              <Button variant='outlined' value="CLIENT" onClick={handleButtonClick}>
                Cliente
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};