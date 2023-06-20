import AdminLayout from "../layouts/AdminLayout";
import Categoria from "../views/Categoria";
import Producto from "../views/admin/Producto";

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            path: 'categoria',
            element: <Categoria />
        },
        {
            path: 'producto',
            element: <Producto />
        }
    ]
}

export default AdminRoutes;