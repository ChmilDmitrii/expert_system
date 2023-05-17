import {
    Box,
    Button,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import axios from 'axios'
import React from 'react'
import SideBar from '../../component/SideBar'
import './style.css'

interface DeireaType {
    title: string
    age_from: string
    description: string
    age_to: string
    is_female: string
    is_male: string
    prophylaxis: string
    treatment: string
}
function Row(props: { row: DeireaType }) {
    const { row } = props
    const [open, setOpen] = React.useState(false)
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Описание
                            </Typography>
                            <div>
                                <div>Возраст от: {row.age_from}</div>
                                <div>Возраст до: {row.age_to}</div>
                                <div>Описание: {row.description}</div>
                                <div>Муж. пол: {row.is_female}</div>
                                <div>Жен. пол: {row.is_male}</div>
                                <div>Профилактика: {row.prophylaxis}</div>
                                <div>Лечение: {row.treatment}</div>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
export const Knowledge = () => {
    const [rows, setRows] = React.useState<DeireaType[] | null>(null)
    React.useEffect(() => {
        const deirea = async () => {
            const data: any = (
                await axios.get(`${import.meta.env.VITE_BASE_URL}/api/disease/`)
            ).data
            setRows(data)
        }
        deirea()
    }, [])

    return (
        <Box className="App" sx={{ flexGrow: 1 }}>
            <SideBar />
            {rows ? (
                <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '1rem' }}>
                    <TableContainer
                        style={{ background: '#fff' }}
                        component={Paper}
                    >
                        <div>
                            <div
                                style={{
                                    background: '#000',
                                    height: '50px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <div style={{ color: '#fff', border: 'none' }}>
                                    База знаний
                                </div>
                            </div>
                        </div>
                        <Table
                            sx={{ minWidth: 500 }}
                            aria-label="custom pagination table"
                        >
                            <TableBody>
                                {rows.map((row) => (
                                    <Row key={row.title} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh - 64px)',
                    }}
                >
                    load
                </div>
            )}
        </Box>
    )
}
