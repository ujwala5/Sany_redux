import { Outlet } from "react-router-dom"
import Navbar from "../Component/Navbar/Navbar"


function DashboardLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default DashboardLayout
