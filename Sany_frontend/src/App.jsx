import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Login from './Pages/Auth/Login/Login';
import Dashboard from './Pages/Dashboard';
import AddCategory from './Pages/Inventory/Categories/AddCategory';
import AddSubCategories from './Pages/Inventory/SubCategories/AddSubCategories';
import Signup from './Pages/Auth/SignUp/Signup';
import AddDealers from './Pages/Inventory/Dealers/AddDealers';
import AddModels from './Pages/Inventory/Models/AddModels';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import ShowCategories from './Pages/Inventory/Categories/ShowCategories';
import ShowDealers from './Pages/Inventory/Dealers/ShowDealers';
import ShowModels from './Pages/Inventory/Models/ShowModels';
import ShowSubCategories from './Pages/Inventory/SubCategories/ShowSubCategories';
import EditCategory from './Pages/Inventory/Categories/EditCategory';
import Editdealers from './Pages/Inventory/Dealers/Editdealers';
import EditModels from './Pages/Inventory/Models/EditModels';
import EditSubCategory from './Pages/Inventory/SubCategories/EditSubCategory';
import AppRoutes from './Routes/AppRoutes';

function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <AppRoutes />

      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route path="/addCategory" element={<ProtectedRoutes><AddCategory /></ProtectedRoutes>} />
          <Route path="/subCategory" element={<ProtectedRoutes><AddSubCategories /></ProtectedRoutes>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addDealer" element={<ProtectedRoutes><AddDealers /></ProtectedRoutes>} />
          <Route path="/addModels" element={<ProtectedRoutes><AddModels /></ProtectedRoutes>} />
          <Route path='/showCategories' element={<ProtectedRoutes><ShowCategories /></ProtectedRoutes>}></Route>
          <Route path="/ShowDealers" element={<ProtectedRoutes><ShowDealers /></ProtectedRoutes>}></Route>
          <Route path="/ShowModels" element={<ProtectedRoutes><ShowModels /></ProtectedRoutes>}></Route>
          <Route path="/ShowSubCategories" element={<ProtectedRoutes><ShowSubCategories /></ProtectedRoutes>}></Route>
          <Route path="/category/edit/:categoryId" element={<ProtectedRoutes><EditCategory /></ProtectedRoutes>}></Route>
          <Route path="/dealer/edit/:dealerId" element={<ProtectedRoutes><Editdealers /></ProtectedRoutes>}></Route>
          <Route path="/models/edit/:modelId" element={<ProtectedRoutes><EditModels /></ProtectedRoutes>}></Route>
          <Route path="/subCategory/edit/:subCatId" element={<ProtectedRoutes><EditSubCategory /></ProtectedRoutes>}></Route>

        </Routes>
      </BrowserRouter> */}

    </>
  )
}

export default App;
