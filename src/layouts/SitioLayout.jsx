import { NavLink, Outlet } from "react-router-dom"

const SitioLayout = () => {
    return (
        <>
            <NavLink to="/">INICIO</NavLink> |
            <NavLink to="/contacto">CONTACTO</NavLink> |
            <NavLink to="/admin/categoria">CATEGORIA</NavLink> |
            <NavLink to="/login">INGRESAR</NavLink>
            <h1> DISEÑO PRINCIPAL: Sitio Layout</h1>
            <Outlet />
        </>
    );
}

export default SitioLayout;