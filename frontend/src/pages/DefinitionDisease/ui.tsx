import {
    TableRow,
    TableCell,
    Checkbox,
    IconButton,
    Collapse,
    Box,
    TableContainer,
    Paper,
    Table,
    TableBody,
    Button,
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import axios from 'axios'
import React from 'react'
import SideBar from '../../component/SideBar'
import './style.css'

function Row(props: { row: any; update: any }) {
    const { row, update } = props
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
                <TableCell component="th" scope="row">
                    <Checkbox onChange={() => update(row.code)} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div>
                                <div>Описание: {row.description}</div>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export const Definition = () => {
    const [rows, setRows] = React.useState<any>(null)
    const [answer, setAnswer] = React.useState<any>({})

    const handleClick = async () => {
        let query = {}
        for (let i = 0; i < rows.length; i++) {
            query = { ...query, [rows[i].code]: rows[i] }
        }
        const data: any = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/disease/`,
            {
                ...query,
            }
        )
        setAnswer(data.data)
    }
    React.useEffect(() => {
        const deirea = async () => {
            const data: any = (
                await axios.get(`${import.meta.env.VITE_BASE_URL}/api/symptom/`)
            ).data
            const arr = []
            for (var elem in data) {
                arr.push({ ...data[elem], code: elem })
            }
            setRows(arr)
        }

        deirea()
    }, [])

    const update = (code: string) => {
        const arr = rows.map((item: any) =>
            item.code === code ? { ...item, flag: !item.flag } : item
        )
        setRows(arr)
    }

    return (
        <Box className="App" sx={{ flexGrow: 1 }}>
            <SideBar />
            <div className="bg" style={{ marginTop: '1em' }}>
                {rows ? (
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
                                    Симптомы
                                </div>
                            </div>
                        </div>
                        <Table
                            sx={{ minWidth: 500 }}
                            aria-label="custom pagination table"
                        >
                            <TableBody>
                                {rows.map((row: any) => (
                                    <Row
                                        key={row.title}
                                        row={row}
                                        update={update}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    'load'
                )}
                <div className="rightColumn">
                    <div className="fixed">
                        <div className="responser">
                            <div>Болезнь: {answer.title}</div>
                            <div>Возраст от: {answer.age_from}</div>
                            <div>Возраст до: {answer.age_to}</div>
                            <div>Описание: {answer.description}</div>
                            <div>Муж. пол: {String(answer.is_female)}</div>
                            <div>Жен. пол: {String(answer.is_male)}</div>
                            <div>Профилактика: {answer.prophylaxis}</div>
                            <div>Лечение: {answer.treatment}</div>
                        </div>
                        <Button
                            variant="contained"
                            className="btn"
                            onClick={handleClick}
                        >
                            Отправить
                        </Button>
                    </div>
                </div>
            </div>
        </Box>
    )
}
