import CarCard from '../CarCard/CarCard'
import './CarContent.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { allCars, reset } from '../../../redux/features/users/cars/carSlice'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner/Spinner'
import FilterModal from '../FilterModal/FilterModal'
const CarContent = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch()
  const { cars, message, isLoading, isError } = useSelector((state) => state.userCars)
  const keys = ["name", "body", "place", "brand"]


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(allCars())
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])
  if (isLoading) {
    return (<><Spinner /></>)
  }
  return (
    <div className="cars_wrapper1">
      {showFilter ? (<FilterModal stateChange={setShowFilter} />) : null}
      <div className="car_fleet_wrapper">
        <div className="car_fleets">
          <div className="fleet_title">
            <h3>Our Fleets</h3>
          </div>
          <div className="filter_sec">
            <div className="filter_wrapper">
              <div className="search">
                <input type={'search'} placeholder='Search' onChange={(e) => setSearchQuery(e.target.value)} />
                <span><i className="ri-search-line"></i></span>
              </div>
              <span onClick={() => setShowFilter(true)} className='filter_span'><i className='filter_btn ri-filter-3-fill'></i></span>
            </div>
          </div>

          <div className="car_cards">
            {cars.filter(car => keys.some(key => car[key].toLowerCase().includes(searchQuery.toLowerCase()))).map((car) => (
              <CarCard key={car._id} name={car.name} rent={car.rent} place={car.place} id={car._id} image={car.image.url} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CarContent