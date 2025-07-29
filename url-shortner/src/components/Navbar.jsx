import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          URL Shortener
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/"
          sx={{ mx: 1 }}
        >
          Shortener
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/stats"
          sx={{ mx: 1 }}
        >
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
}