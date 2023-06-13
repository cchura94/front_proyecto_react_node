import { NavLink, Outlet } from "react-router-dom"

const AdminLayout = () => {
    return (
        <>
        <NavLink to="/admin">ADMIN</NavLink> |
         <NavLink to="/admin/categoria">CATEGORIA</NavLink> |
        
        <h1> DISEÑO PRINCIPAL: Admin Layout</h1>
        <Outlet />        
        </>
    );
}

export default AdminLayout;