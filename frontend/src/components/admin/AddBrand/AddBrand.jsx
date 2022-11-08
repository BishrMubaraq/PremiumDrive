import * as React from 'react';
import '../AddNewContent/AddNew.scss'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddBrandModal from '../AddNewContent/AddBrandModal';
import { useState } from 'react';
import { reset, getBrands, deleteBrand } from '../../../redux/features/brands/brandSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react';


export default function AddNewContent() {
    const [addBrand, setAddBrand] = useState(false)
    const { error, message, isError, isSuccess, isLoading, brands } = useSelector((state) => state.brands)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
        if (isSuccess) {
            toast.success(message.message)
        }
        dispatch(getBrands())
    },
        [dispatch, error, message, isError, isSuccess])
    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, [])

    const columns = [
        { field: 'id', headerName: 'id', width: 100, hide: true },
        { field: 'slNo', headerName: 'slNo', width: 100 },
        { field: 'brand', headerName: 'Brand', width: 200 },
        {
          field: 'idEdit',
          headerName: 'Delete',
          width: 150,
          renderCell: (value) => {
            return (<><button >edit</button></>)
          }
        },
        {
          field: 'isDelete',
          headerName: 'Edit',
          width: 150,
          renderCell: (value) => {
            return (<><button >delete</button></>)
          }
        },
      ];
    
      const rows = brands.map((brand, index) => {
        return {
          id: brand._id,
          slNo: index + 1,
          brand: brand.brand,
        }
      })
    return (
        <>
            {addBrand ? (<AddBrandModal stateChange={setAddBrand} />) : null}
            <div className="add_new_wrapper">
                <div className="top_section">
                    <h3>Add Brand</h3>
                    <button onClick={() => setAddBrand(true)} >Add Brand</button>
                </div>
                <div className="bottom_section">

                    <Box mt={'20px'} sx={{ height: 500, width: '100%' }}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            pageSize={8}
                            rowsPerPageOptions={[5]}

                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>
                </div>
            </div>
        </>
    );
}
