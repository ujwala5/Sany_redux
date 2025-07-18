import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes';
import DashboardLayout from '../Layout/DashboardLayout';
import AddCategory from '../Pages/Inventory/Categories/AddCategory';
import Login from '../Pages/Auth/Login/Login';
import ShowCategories from '../Pages/Inventory/Categories/ShowCategories';
import Navbar from '../Component/Navbar/Navbar';
import AddSubCategories from '../Pages/Inventory/SubCategories/AddSubCategories';
import Signup from '../Pages/Auth/SignUp/Signup';
import AddDealers from '../Pages/Inventory/Dealers/AddDealers';
import AddModels from '../Pages/Inventory/Models/AddModels';
import ShowDealers from '../Pages/Inventory/Dealers/ShowDealers';
import ShowModels from '../Pages/Inventory/Models/ShowModels';
import ShowSubCategories from '../Pages/Inventory/SubCategories/ShowSubCategories';
import EditCategory from '../Pages/Inventory/Categories/EditCategory';
import Editdealers from '../Pages/Inventory/Dealers/Editdealers';
import EditModels from '../Pages/Inventory/Models/EditModels';
import EditSubCategory from '../Pages/Inventory/SubCategories/EditSubCategory';
import DashboardCards from '../Pages/Dashboard';

function AppRoutes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path='/' element={<ProtectedRoutes><DashboardLayout /></ProtectedRoutes>}>
                        <Route path='/dashboard' element={<ProtectedRoutes><DashboardCards /></ProtectedRoutes>} />
                        <Route path="/addCategory" element={<ProtectedRoutes><AddCategory /></ProtectedRoutes>} />
                        <Route path='/showCategories' element={<ProtectedRoutes><ShowCategories /></ProtectedRoutes>}></Route>
                        <Route path="/subCategory" element={<ProtectedRoutes><AddSubCategories /></ProtectedRoutes>} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/addDealer" element={<ProtectedRoutes><AddDealers /></ProtectedRoutes>} />
                        <Route path="/addModels" element={<ProtectedRoutes><AddModels /></ProtectedRoutes>} />
                        <Route path="/ShowDealers" element={<ProtectedRoutes><ShowDealers /></ProtectedRoutes>}></Route>
                        <Route path="/ShowModels" element={<ProtectedRoutes><ShowModels /></ProtectedRoutes>}></Route>
                        <Route path="/ShowSubCategories" element={<ProtectedRoutes><ShowSubCategories /></ProtectedRoutes>}></Route>
                        <Route path="/category/edit/:categoryId" element={<ProtectedRoutes><EditCategory /></ProtectedRoutes>}></Route>
                        <Route path="/dealer/edit/:dealerId" element={<ProtectedRoutes><Editdealers /></ProtectedRoutes>}></Route>
                        <Route path="/models/edit/:modelId" element={<ProtectedRoutes><EditModels /></ProtectedRoutes>}></Route>
                        <Route path="/subCategory/edit/:subCatId" element={<ProtectedRoutes><EditSubCategory /></ProtectedRoutes>}></Route>



                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRoutes
