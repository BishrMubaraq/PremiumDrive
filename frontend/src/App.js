import {BrowserRouter} from 'react-router-dom'
import UserRoute from './routes/UserRoute';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <>
     <BrowserRouter>
     <UserRoute/>
      <AdminRoute/>
      <ToastContainer/>
     </BrowserRouter>
    </>
  );
}

export default App;
