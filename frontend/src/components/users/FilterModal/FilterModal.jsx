import React, { useState, useEffect } from 'react'
import './FilterModal.scss'
import { useForm } from 'react-hook-form'
import Spinner from '../../Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaces, placeReset } from '../../../redux/features/places/placeSlice'
import { getBrands, reset } from '../../../redux/features/brands/brandSlice'


const FilterModal = ({ stateChange }) => {


    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const { places } = useSelector((state) => state.places)
    const { brands } = useSelector((state) => state.brands)
    const [sort, setSort] = useState('All')
    const [place, setPlace] = useState([])
    const [brand, setBrand] = useState([])
    const [body, setBody] = useState([])
    const [transmission, setTransmission] = useState([])
    useEffect(() => {
        console.log(place);
    }, [place])
    useEffect(() => {
        dispatch(getBrands())
        dispatch(getPlaces())


        return () => {
            dispatch(reset())
            dispatch(placeReset())
        }
    }, [dispatch])

    const handlePlace = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setPlace(...place, value)
        } else {
            setPlace(place.filter((e) => e !== value))
        }
        console.log(place);
    }




    return (
        <div className="add_car_container">
            <div className="add_car_wrapper">
                <div className="add_car_header">
                    <h1>Filter</h1>
                    <span onClick={() => {
                        stateChange(false)
                    }}><i className="ri-close-fill"></i></span>
                </div>
                <form className='add_car_form_wrapper1'>
                    <div className="filter_sec_wrapper">
                        <h5>Sort By:</h5>
                        <div className="sort_radio_div">
                            <input type="radio" name="sort" onChange={() => setSort('lowToHigh')} />
                            <label htmlFor="">Low to High</label>
                        </div>
                        <div className="sort_radio_div">
                            <input type="radio" name="sort" onChange={() => setSort('highToLow')} />
                            <label htmlFor="">High to low</label>
                        </div>
                    </div>
                    <div className="filter_sec_wrapper">
                        <h5>Places:</h5>
                        <div className="filter_checkbox_wrapper">
                            {places.map((place) => (
                                <div key={place._id} className="sort_radio_div">
                                    <input type="checkbox" value={place.place} onChange={handlePlace} />
                                    <label htmlFor="">{place.place}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter_sec_wrapper">
                        <h5>Brands:</h5>
                        <div className="filter_checkbox_wrapper">
                            {brands.map((brand) => (
                                <div key={brand._id} className="sort_radio_div">
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor="">{brand.brand}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter_sec_wrapper">
                        <h5>Body:</h5>
                        <div className="filter_checkbox_wrapper">

                            <div className="sort_radio_div">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Sedan</label>
                            </div>
                            <div className="sort_radio_div">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">SUV</label>
                            </div>
                            <div className="sort_radio_div">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Hatchback</label>
                            </div>
                            <div className="sort_radio_div">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">MPV</label>
                            </div>
                            <div className="sort_radio_div">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Lifestyle Trucks</label>
                            </div>
                        </div>
                    </div>
                    <div className="filter_sec_wrapper">
                        <h5>Transmission:</h5>
                        <div className="filter_checkbox_wrapper">

                            <div className="sort_radio_div">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Manual</label>
                            </div>
                            <div className="sort_radio_div">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">Auto</label>
                            </div>
                        </div>
                    </div>


                    <button type='submit'>Apply</button>
                </form>
            </div>
        </div>
    )
}

export default FilterModal