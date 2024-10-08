import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <div style={{marginTop:"-115%",marginLeft:"-235.7%",marginRight:"-235.7%"}}>
      <AppBar position="static" style={{width:"100%"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
            // sx={{ mr: 100 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,marginLeft:"-85% "}}>
            Home Page
          </Typography>
          <Link to="/" style={{ textDecoration: "none" ,color:"white"}}>
            <Button color="inherit">
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      </div>
      <div style={{marginTop:"100%",color:"black"}}><h1>WELCOME</h1></div>
    </Box>
  );
}
