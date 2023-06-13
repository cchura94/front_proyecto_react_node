import AdminRoutes from "./AdminRoutes";
import SitioRoutes from "./SitioRoutes";

import {useRoutes} from "react-router-dom"

const ThemeRoutes = () => {
    return useRoutes([SitioRoutes, AdminRoutes])
}

export default ThemeRoutes;