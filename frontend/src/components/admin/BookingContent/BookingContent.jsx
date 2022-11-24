import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../UsersContent/UsersContent.scss'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner/Spinner'
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import moment from 'moment'
import { getAllBookings, reset } from '../../../redux/features/adminBooking/adminBookingSlice'


export default function BookingContent() {
    const dispatch = useDispatch()
    const { bookings, isLoading, isSuccess, isError, message, error } = useSelector((state) => state.adminBooking)

    useEffect(() => {
        if (isError) {
            toast.error(error)
        }

        dispatch(getAllBookings())
        return () => {
            dispatch(reset())
        }
    }, [dispatch, isError, error])


    const columns = [
        { field: 'id', headerName: 'id', width: 100, hide: true },
        { field: 'slNo', headerName: 'slNo', width: 100 },
        { field: 'carName', headerName: 'Car', width: 200 },
        {
            field: 'userName',
            headerName: 'User Name',
            width: 200,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 200,
        },
        {
            field: 'payment',
            headerName: 'Payment',
            width: 200,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
        },
        {
            field: 'driverRequired',
            headerName: 'Driver',
            width: 200,
        },
        {
            field: 'pickupDate',
            headerName: 'Pickup Date',
            width: 200,
        },
        {
            field: 'droppOffDate',
            headerName: 'Dropoff Date',
            width: 200,
        },
        {
            field: 'totalHours',
            headerName: 'Total Hours',
            width: 200,
        },
        {
            field: 'totalAmount',
            headerName: 'Total Amount',
            width: 200,
        },
        {
            field: 'dropOffCity',
            headerName: 'Dropoff City',
            width: 200,
        },
    ];

    const rows = bookings.map((booking, index) => {
        return {
            id: booking._id,
            slNo: index + 1,
            carName: booking.carData.name,
            userName: booking.userData.name,
            phoneNumber: booking.userData.phoneNumber,
            payment: booking.transactionId === 'pending' ? 'Pending' : 'Success',
            driverRequired: booking.driverRequire ? 'Required' : 'Not Required',
            pickupDate: moment(booking.bookedSlots.from).format('MMM DD yyyy hh:mm'),
            droppOffDate: moment(booking.bookedSlots.to).format('MMM DD yyyy hh:mm'),
            totalHours: booking.totalHours,
            totalAmount: booking.totalAmount,
            dropOffCity: booking.dropoffCity,
        }
    })

    if (isLoading) {
        return (<><Spinner /></>)
    }

    return (
        <Box mt={'100px'} sx={{ height: 500, width: '100%' }}>
            <h3>All Bookings</h3>
            <DataGrid
                columns={columns}
                rows={rows}
                pageSize={8}
                rowsPerPageOptions={[5]}

                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}
