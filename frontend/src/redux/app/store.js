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

export const store = configureStore({
  reducer: {
    // users
    auth:authReducer,
    userCars:userCarReducer,
    // admin
    cars:carReducer,
    adminAuth:adminAuthReducer,
    adminUsers:adminUsersReducer,
    adminDrivers:adminDriverReducer,
    brands:brandReducer,
    places:placeReducer,
    // driver
    driverAuth:driverReducer,

  },
});
