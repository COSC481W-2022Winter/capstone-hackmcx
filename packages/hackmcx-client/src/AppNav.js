import * as React from "react";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {Avatar, Box, IconButton} from "@mui/material";

export default function AppNav(){
    return (
        <React.Fragment>
            <AppBar position='fixed'>
                <Toolbar>
                    <Link to={"/"} color="inherit">
                        <IconButton size={"large"} sx={{ mr: 2 }}>
                            <Avatar src={'/imgs/logo.png'} />
                        </IconButton>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ marginRight: 2 }}>
                        <Link to={'/posts/create'}>
                            <Button variant='contained' sx={{ mt: 2 }} >Create Post</Button>
                        </Link>
                    </Box>
                    <Button variant='contained' sx={{ mt: 2}}>Sign In</Button>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </React.Fragment>
    );
}