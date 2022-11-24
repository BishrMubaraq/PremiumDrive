import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminAuthReducer from '../features/adminAuth/adminAuthSlice';
import carReducer from '../features/cars/carSlice';
import userCarReducer from '../features/users/cars/carSlice';
import adminUsersReducer from '../features/adminUsers/adminUsersSlice';
import adminDriverReducer from '../features/adminDrivers/adminDriverSlice';
import brandReducer from '../features/brands/brandSlice';
import placeReducer from '../features/places/placeSlice';
import driverReducer from '../features/driverAuth/driverAuthSlice';
import singleCarReducer from '../features/users/cars/singleCar/singleCarSlice';
import bookingReducer from '../features/users/booking/bookingSlice';
import adminBookingReducer from '../features/adminBooking/adminBookingSlice';

export const store = configureStore({
  reducer: {
    // users
    auth:authReducer,
    userCars:userCarReducer,
    singleCar:singleCarReducer,
    booking:bookingReducer,
    // admin
    cars:carReducer,
    adminAuth:adminAuthReducer,
    adminUsers:adminUsersReducer,
    adminDrivers:adminDriverReducer,
    brands:brandReducer,
    places:placeReducer,
    adminBooking:adminBookingReducer,
    // driver
    driverAuth:driverReducer,

  },
});
