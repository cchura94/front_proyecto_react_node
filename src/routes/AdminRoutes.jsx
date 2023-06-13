import AdminLayout from "../layouts/AdminLayout";
import Categoria from "../views/Categoria";

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            path: 'categoria',
            element: <Categoria />
        }
    ]
}

export default AdminRoutes;