import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminAuthReducer from '../features/adminAuth/adminAuthSlice';
import carReducer from '../features/cars/carSlice';
import adminUsersReducer from '../features/adminUsers/adminUsersSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    adminAuth:adminAuthReducer,
    cars:carReducer,
    adminUsers:adminUsersReducer
  },
});
