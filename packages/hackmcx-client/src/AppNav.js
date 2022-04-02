import * as React from "react";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {Avatar, Box, IconButton, Typography} from "@mui/material";

export default function AppNav(){
    return (
        <React.Fragment>
            <AppBar position='fixed'>
                <Toolbar>
                    <Link to={"/"} color="inherit">
                        <IconButton size={"large"} sx={{ mr: 2 }}>
                            <Avatar src={'/imgs/logo.png'} />
                            <Typography variant="h6" sx={{marginLeft: 2}}>Warai</Typography>
                        </IconButton>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ marginRight: 2 }}>
                        <Link to={'/posts/create'}>
                            <Button variant='contained' sx={{ mt: 2 }} >Create Post</Button>
                        </Link>
                    </Box>
                        <Link to={'/login'}>
                            <Button variant='contained' sx={{ mt: 2}}>Sign In</Button>
                        </Link>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </React.Fragment>
    );
}