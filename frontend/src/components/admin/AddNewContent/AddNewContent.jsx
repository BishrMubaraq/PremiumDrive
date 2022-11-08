import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import './AddNew.scss'
import { Box } from '@mui/material'
import AddBrandModal from './AddBrandModal';
import { useState } from 'react';
import { reset, getBrands, deleteBrand } from '../../../redux/features/brands/brandSlice'
import { placeReset, getPlaces, deletePlace } from '../../../redux/features/places/placeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import AddPlaceModal from './AddPlaceModal';

export default function AddNewContent() {
    const [addBrand, setAddBrand] = useState(false)
    const [addPlace, setAddPlace] = useState(false)
    const { error, message, isError, isSuccess, isLoading, brands } = useSelector((state) => state.brands)
    const { places, placeIsLoading, placeIsSuccess, placeIsError, placeMessage, placeError } = useSelector((state) => state.places)
    const dispatch = useDispatch()
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
    return (
        <>
            {addBrand ? (<AddBrandModal stateChange={setAddBrand} />) : null}
            {addPlace ? (<AddPlaceModal stateChange={setAddPlace} />) : null}
            <div className="add_new_wrapper">
                <div className="top_section">
                    <h3>Add Place & Brand</h3>
                </div>
                <div className="bottom_section">
                    <div className="place_section">
                        <div>
                            <Accordion sx={{ maxWidth: '300px', minWidth: '300px' }}>
                                <AccordionSummary
                                    expandIcon={<i className="ri-arrow-drop-down-fill"></i>}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                    sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='h6'>Places</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '20px' }}>
                                        <button onClick={() => setAddPlace(true)} >Add Place</button>
                                    </Box>
                                    <Typography>
                                        <ul>
                                            {places.map((place) => (
                                                <li key={place._id} className='list'>
                                                    <div>{place.place}</div>
                                                    <div className="actionss">
                                                        <i className="ri-edit-fill"></i>
                                                        <i onClick={() => placeDispatch(deletePlace(place._id))} className="ri-delete-bin-6-fill"></i>
                                                    </div>
                                                </li>
                                            ))}

                                        </ul>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                    <div className="brand_section">
                        <div>
                            <Accordion sx={{ maxWidth: '300px', minWidth: '300px' }}>
                                <AccordionSummary
                                    expandIcon={<i className="ri-arrow-drop-down-fill"></i>}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                    sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='h6'>Brands</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '20px' }}>
                                        <button onClick={() => setAddBrand(true)} >Add Brand</button>


                                    </Box>
                                    <Typography>

                                        <ul>
                                            {brands.map((brand) => (

                                                <li key={brand._id} className='list'>
                                                    <div>{brand.brand}</div>
                                                    <div className="actionss">
                                                        <i className="ri-edit-fill"></i>
                                                        <i onClick={() => dispatch(deleteBrand(brand._id))} className="ri-delete-bin-6-fill"></i>
                                                    </div>
                                                </li>
                                            ))}

                                        </ul>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
