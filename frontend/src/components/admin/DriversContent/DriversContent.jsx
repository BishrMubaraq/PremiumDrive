import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner/Spinner'
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { getAllDrivers, approveDriver, declineDriver, blockAndUnblockDriver, reset } from '../../../redux/features/adminDrivers/adminDriverSlice'
import '../UsersContent/UsersContent.scss'
import ImageModal from '../ImageModal/ImageModal'


export default function DriversContent() {
    const dispatch = useDispatch()
    const { drivers, isLoading, isSuccess, isError, message, error } = useSelector((state) => state.adminDrivers)

    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
        if (isSuccess) {
            toast.success(message.message)
        }
        dispatch(getAllDrivers())
        return () => {
            dispatch(reset())
        }
    }, [dispatch, message, isError, error])

    const pendingDrivers = drivers.filter((value) => {
        return !value.isApproved
    })
    const allDrivers = drivers.filter((value) => {
        return value.isApproved
    })

    const columns = [
        { field: 'id', headerName: 'id', width: 100, hide: true },
        { field: 'slNo', headerName: 'slNo', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 200,
        },
        {
            field: 'profilePhoto',
            headerName: 'Photo',
            width: 200,
            renderCell: (value) => {
                return (<><Avatar src={value.row.profilePhoto.url} /></>)
            }
        },
        {
            field: 'licenseFront',
            headerName: 'License Front',
            width: 200,
            renderCell: (value) => {
                return (<><ImageModal image={value.row.licenseFront.url} /></>)
            }
        },
        {
            field: 'licenseRear',
            headerName: 'License Rear',
            width: 200,
            renderCell: (value) => {
                return (<><ImageModal image={value.row.licenseRear.url} /></>)
            }
        },
        {
            field: 'isApproved',
            headerName: 'Action',
            width: 250,
            renderCell: (value) => {
                return (<>
                    <button onClick={() => { dispatch(approveDriver(value.row.id)) }} className='approve_btn'>Approve</button>
                    <button onClick={() => { dispatch(declineDriver(value.row.id)) }} className='decline_btn'>Decline</button>
                </>)
            }
        },
    ];

    const rows = pendingDrivers.map((driver, index) => {
        return {
            id: driver._id,
            slNo: index + 1,
            name: driver.name,
            email: driver.email,
            phoneNumber: driver.phoneNumber,
            profilePhoto: driver.profilePhoto,
            licenseFront: driver.drivingLicenceFront,
            licenseRear: driver.drivingLicenceRear,
            isApproved: driver.isApproved
        }
    })
    const columns1 = [
        { field: 'id', headerName: 'id', width: 100, hide: true },
        { field: 'slNo', headerName: 'slNo', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 200,
        },
        {
            field: 'profilePhoto',
            headerName: 'Photo',
            width: 200,
            renderCell: (value) => {
                return (<><Avatar src={value.row.profilePhoto.url} /></>)
            }
        },
        {
            field: 'licenseFront',
            headerName: 'License Front',
            width: 200,
            renderCell: (value) => {
                return (<><ImageModal image={value.row.licenseFront.url} /></>)
            }
        },
        {
            field: 'licenseRear',
            headerName: 'License Rear',
            width: 200,
            renderCell: (value) => {
                return (<><ImageModal image={value.row.licenseRear.url} /></>)
            }
        },
        {
            field: 'isBlocked',
            headerName: 'Action',
            width: 250,
            renderCell: (value) => {
                return (<><button onClick={() => dispatch(blockAndUnblockDriver(value.row.id))} className={value.row.isBlocked ? 'unBlock_btn' : 'block_btn'}>{value.row.isBlocked ? 'Unblock' : 'Block'}</button></>)
            }
        },
    ];

    const rows1 = allDrivers.map((driver, index) => {
        return {
            id: driver._id,
            slNo: index + 1,
            name: driver.name,
            email: driver.email,
            phoneNumber: driver.phoneNumber,
            profilePhoto: driver.profilePhoto,
            licenseFront: driver.drivingLicenceFront,
            licenseRear: driver.drivingLicenceRear,
            isBlocked: driver.isBlocked
        }
    })



    if (isLoading) {
        return (<><Spinner /></>)
    }
    return (
        <>
            <Box mt={'100px'} sx={{ height: 300, width: '100%' }}>
                <h3>Pending Driver Applications</h3>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSize={8}
                    rowsPerPageOptions={[5]}

                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
            <Box mt={'100px'} sx={{ height: 400, width: '100%' }}>
                <h3>All Drivers</h3>
                <DataGrid
                    columns={columns1}
                    rows={rows1}
                    pageSize={8}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </>
    );
}
