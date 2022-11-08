import React, { useState, useEffect } from 'react'
import AddCar from '../AddCar/AddCar'
import './CarsContent.scss'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getCars, deleteCar } from '../../../redux/features/cars/carSlice'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner/Spinner'
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';


const CarsContent = () => {

  const [addCarModal, setAddCarModal] = useState(false)


  const { isLoading, isError, isSuccess, message, cars } = useSelector((state) => state.cars)
  const dispatch = useDispatch()


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getCars())
  
    return () => {
      dispatch(reset())
    }

  }, [isError, message, dispatch])

  const columns = [
    { field: 'id', headerName: 'id', width: 100, hide: true },
    { field: 'slNo', headerName: 'slNo', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'rent', headerName: 'Rent', width: 200 },
    {
      field: 'image',
      headerName: 'Image',
      width: 250,
      renderCell: (value) => {
        console.log(value);
        return (<><Avatar sx={{ width: 90, height: 90}} src={value.row.image.url} /></>)
      }
    },
    {
      field: 'place',
      headerName: 'Place',
      width: 200,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 200,
    },
    {
      field: 'transmission',
      headerName: 'Transmission',
      width: 200,
    },
    {
      field: 'fuel',
      headerName: 'Fuel',
      width: 200,
    },
    {
      field: 'body',
      headerName: 'Body',
      width: 200,
    },
    {
      field: 'registrationNo',
      headerName: 'Registration NO',
      width: 200,
    },
    {
      field: 'isBlocked',
      headerName: 'Action',
      width: 150,
      renderCell: (value) => {
        return (<><button >edit</button></>)
      }
    },
  ];

  const rows = cars.map((car, index) => {
    return {
      id: car._id,
      slNo: index + 1,
      name: car.name,
      rent: car.rent,
      image:car.image,
      place: car.place,
      brand: car.brand,
      transmission: car.transmission,
      fuel: car.fuel,
      body: car.body,
      registrationNo: car.registrationNo,
    }
  })

  if (isLoading) {
    return (<><Spinner /></>)
  }

  return (
    <div className='cars'>
      <h3>All Cars</h3>
      <div className="add_btn_wrapper">
        <button onClick={() => {
          setAddCarModal(!addCarModal)
        }}>Add Car</button>
      </div>
      {
        addCarModal ? <AddCar type={'Add'} stateChange={setAddCarModal} /> : null
      }

      <Box mt={'20px'} sx={{ height: 500, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          rowHeight={100}
          pageSize={8}
          rowsPerPageOptions={[5]}

          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  )
}

export default CarsContent