import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        <NavLink to="/admin">ADMIN</NavLink> |
                        <NavLink to="/admin/categoria">CATEGORIA</NavLink> |

                        <h1> DISEÑO PRINCIPAL: Admin Layout</h1>
                        <Outlet />
                    </div>
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;