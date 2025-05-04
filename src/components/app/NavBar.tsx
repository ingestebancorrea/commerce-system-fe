import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/auth/authSlice';

interface Props {
  toggleDrawer: () => void;
}

export const NavBar = ({ toggleDrawer }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout({}));
    navigate('/auth/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Icono de hamburguesa */}
          <Box sx={{ display: 'flex' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}  
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, paddingTop: 0.5 }}
              >
                COMMERCE SYSTEM
              </Typography>
            </Link>
          </Box>

          {/* Botón de logout */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
