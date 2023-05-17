import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to={`/definition-disease`}>
                        <Button variant="text" style={{ color: '#fff' }}>
                            Определение болезни
                        </Button>
                    </Link>
                    <Link to={`/knowledge-base`} style={{ marginLeft: '40px' }}>
                        <Button variant="text" style={{ color: '#fff' }}>
                            База знаний
                        </Button>
                    </Link>
                </Typography>
                <Link to={`${import.meta.env.VITE_BASE_URL}/admin`} style={{ marginLeft: '40px' }}>
                    <Button variant="text" style={{ color: '#fff' }}>ADMIN</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default SideBar
