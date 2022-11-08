import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner/Spinner'
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { allUsers, reset,blockAndUnblock } from '../../../redux/features/adminUsers/adminUsersSlice'
import './UsersContent.scss'


export default function UsersContent() {
  const dispatch = useDispatch()
  const { users, isLoading, isSuccess, isError, message } = useSelector((state) => state.adminUsers)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if(isSuccess){
      toast.success(message.message)
    }
    dispatch(allUsers())
    return () => {
      dispatch(reset())
    }
  }, [dispatch, message, isError])

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
      field: 'isBlocked',
      headerName: 'Action',
      width: 150,
      renderCell: (value) => {
        return (<><button onClick={()=>dispatch(blockAndUnblock(value.row.id))} className={value.row.isBlocked?'unBlock_btn':'block_btn'}>{value.row.isBlocked?'Unblock':'Block'}</button></>)
      }
    },
  ];

  const rows = users.map((user, index) => {
    return {
      id: user._id,
      slNo: index + 1,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isBlocked: user.isBlocked
    }
  })



  if (isLoading) {
    return (<><Spinner /></>)
  }
  return (
    <Box mt={'100px'} sx={{ height: 500, width: '100%' }}>
      <h3>All Users</h3>
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
