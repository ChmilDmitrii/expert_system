import './App.css'
import { Box } from '@mui/material'
import SideBar from './component/SideBar'

function App() {
    return (
        <>
            <Box className="App" sx={{ flexGrow: 1 }}>
                <SideBar />
            </Box>
        </>
    )
}

export default App
