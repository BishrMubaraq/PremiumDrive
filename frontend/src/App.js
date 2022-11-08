import { BrowserRouter } from 'react-router-dom'
import UserRoute from './routes/UserRoute';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './routes/AdminRoute';
import DriverRoute from './routes/DriverRoute';
function App() {
  return (
    <>
      <BrowserRouter>
        <UserRoute />
        <AdminRoute />
        <DriverRoute />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
