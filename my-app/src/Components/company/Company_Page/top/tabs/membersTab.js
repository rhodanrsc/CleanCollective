import React, { useState, useEffect } from "react";
import { Box, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Divider, Card } from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle';



export default function MembersTab(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);
    const [currentSearchValue, setCurrentSearchValue] = useState("")

    //Handles the onChange for search bar
    const handleSearchValue = (event) => {
        setCurrentSearchValue(event.target.value)
    }

    //Handle pages and rows
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Creating a member object
    function createData(key, name, role, joined) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let month = new Date(joined).getMonth()
        let thisMonthName = monthNames[month]
        let year = new Date(joined).getFullYear()
        joined = thisMonthName + " " + year

        return { key, name, role, joined };
    }

    //Constantly updates the members of the company
    useEffect(() => {
        let listOfMembers = props.members
        let newRowsList = []

        // eslint-disable-next-line array-callback-return
        listOfMembers.map((member) => {
            if (currentSearchValue === "") {
                newRowsList.push(createData(member._id, member.memberName, member.role, member.dateJoined))
            } else {
                if (member.memberName.toLowerCase().match(currentSearchValue.toLowerCase())) {
                    newRowsList.push(createData(member._id, member.memberName, member.role, member.dateJoined))
                }
            }
        })
        setRows(newRowsList)

    }, [currentSearchValue, props.members])

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'role', label: 'Role', minWidth: 100 },
        { id: 'joined', label: 'Joined', minWidth: 100 },

    ];

    return (

        <Card elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                {/*Search Bar*/}
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField onChange={handleSearchValue} value={currentSearchValue} id="memberSearchInput" label="Member" variant="standard" />
            </Box>
            <Divider sx={{ height: "10px" }} variant="middle" />

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow key="columnKey">
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={props.members.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Card>
    )
}