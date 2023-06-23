import AdminLayout from "../layouts/AdminLayout";
import Categoria from "../views/Categoria";
import Cliente from "../views/admin/Cliente";
import Producto from "../views/admin/Producto";
import Usuario from "../views/admin/Usuario";

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
        },
        {
            path: 'usuario',
            element: <Usuario />
        },
        {
            path: 'cliente',
            element: <Cliente />
        }
    ]
}

export default AdminRoutes;