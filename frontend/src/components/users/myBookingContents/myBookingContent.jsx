import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import './myBookingContent.scss'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { userBookings, bookingReset } from '../../../redux/features/users/booking/bookingSlice'
import { useEffect } from 'react';



export default function MyBookingContent() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dispatch = useDispatch()
    const { bookings, bookingIsLoading, bookingIsError, bookingError } = useSelector(state => state.booking)
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        dispatch(userBookings(user._id))
        return () => {
            bookingReset()
        }
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        {
            id: 'slNo', label: 'slNo', minWidth: 50
        },
        {
            id: 'image', label: 'Image', minWidth: 170,
        },
        { id: 'car', label: 'Car', minWidth: 170 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'pickupDate',
            label: 'Pickup Date',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'dropoffDate',
            label: 'Dropoff Date',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'dropoffCity',
            label: 'Dropoff City',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'totalAmount',
            label: 'Total',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'payment',
            label: 'Payment',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 200,
            align: 'center',
        },

    ];

    function statusTextChange(status){
        if(status === 'booked'){
            return 'Booked'
        }
        if(status === 'delivered'){
            return 'Delivered'
        }
        if(status === 'returned'){
            return 'Returned'
        }
        if(status==='pending'){
            return 'Pending'
        }
        if(status === 'cancelled'){
            return 'Cancelled'
        }
        
    }

    const rows = bookings.map((booking,index) => {
        return {
            slNo:index+1,
            image: (<><Avatar sx={{ width: 90, height: 90 }} src={booking.carData[0]?.image.url} /></>),
            car: booking?.carData[0].name,
            status: <span className={booking.status}>{statusTextChange(booking.status)}</span>,
            pickupDate: moment(booking.bookedSlots.from).format('MMM DD yyyy hh:mm'),
            dropoffDate: moment(booking.bookedSlots.to).format('MMM DD yyyy hh:mm'),
            dropoffCity: booking.dropoffCity,
            totalAmount: `₹ ${booking.totalAmount}`,
            payment: booking.transactionId === 'pending' ? (<span className='pending'>Pending</span>) : (<span className='success'>Success</span>) ,

        }
    })

    return (
        <div className='bookings_container'>
            <div role="presentation">
                <Breadcrumbs sx={{ pb: '20px' }} aria-label="breadcrumb">
                    <Link to={'/profile'}>User Profile</Link>
                    <p style={{ fontWeight: 'bold' }}>My Bookings</p>
                </Breadcrumbs>
            </div>

            <div>

                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.slNo}
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
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}