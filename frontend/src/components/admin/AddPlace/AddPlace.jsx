import * as React from 'react';
import '../AddNewContent/AddNew.scss'
import { useState } from 'react';
import { placeReset, getPlaces, deletePlace } from '../../../redux/features/places/placeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import AddPlaceModal from '../AddNewContent/AddPlaceModal';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function AddNewContent() {
    const [addPlace, setAddPlace] = useState(false)
    const { places, placeIsLoading, placeIsSuccess, placeIsError, placeMessage, placeError } = useSelector((state) => state.places)
    const placeDispatch = useDispatch()
    useEffect(() => {
        if (placeIsError) {
            toast.error(placeError)
        }
        if (placeIsSuccess) {
            toast.success(placeMessage.message)
        }
        placeDispatch(getPlaces())
    }, [placeError, placeIsError, placeIsSuccess, placeMessage, placeDispatch])
    useEffect(() => {
        return () => {
            placeDispatch(placeReset())
        }
    }, [])

    const columns = [
        { field: 'id', headerName: 'id', width: 100, hide: true },
        { field: 'slNo', headerName: 'slNo', width: 100 },
        { field: 'place', headerName: 'Place', width: 200 },
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
    
      const rows = places.map((place, index) => {
        return {
          id: place._id,
          slNo: index + 1,
          place: place.place,
        }
      })
    return (
        <>
            {addPlace ? (<AddPlaceModal stateChange={setAddPlace} />) : null}
            <div className="add_new_wrapper">
                <div className="top_section">
                    <h3>Add Place</h3>
                    <button onClick={()=>setAddPlace(true)}>Add Place</button>
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
