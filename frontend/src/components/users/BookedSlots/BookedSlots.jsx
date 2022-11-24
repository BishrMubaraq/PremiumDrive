import '../FilterModal/FilterModal.scss'
import moment from 'moment'

const BookedSlots = ({ stateChange, data }) => {
    return (
        <div className="add_car_container">
            <div className="add_car_wrapper">
                <div className="add_car_header">
                    <h1>Booked Slots</h1>
                    <span onClick={() => {
                        stateChange(false)
                    }}><i className="ri-close-fill"></i></span>
                </div>
                <div className='add_car_form_wrapper1'>
                    <div className="filter_sec_wrapper">
                        {data?.slice(-10).reverse().map((value)=>(
                        <div className="sort_radio_div">
                            <label htmlFor="">{moment(value.from).format('MMM-DD-YYYY HH:mm')} to {moment(value.to).format('MMM-DD-YYYY HH:mm')}</label>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookedSlots