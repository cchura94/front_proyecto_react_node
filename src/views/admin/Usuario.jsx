import { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import usuarioService from "../../services/usuarioService"

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [q, setq] = useState('')
    const [limit, setLimit] = useState(10)
    const [usuario, setUsuario] = useState({ email: "", password: "" })

    const columnas = [
        { key: "id", label: "COD" },
        { key: "email", label: "CORREO ELECTRONICO" },
        { key: "created_at", label: "CREADO EN" },
    ]
    useEffect(() => {
        getUsuarios()
    }, [])


    const getUsuarios = async (nroPage=1, limit=2) => {
        setPage(nroPage)
        const { data } = await usuarioService.listar(q, nroPage, limit)
        console.log("TOTAL:", data.count)
        console.log("Registros:", data.rows)
        setTotal(data.count)
        setUsuarios(data.rows)
    }

    const handleEdit = (datos) => {
        setUsuario(datos)
        // setOpenModal(true)

    }

    const handleDelete = async (datos) => {
        if (confirm("Eliminar el Producto?")) {
            try {
                await usuarioService.eliminar(datos.id)

                getUsuarios()

            } catch (error) {
                alert("Ocurrió un problema al intentar eliminar")

            }
        }
    }
    return (
        <>
        
        <TablePagination columnas={columnas} datos={usuarios} total={total} page={page} fetchData={getUsuarios} handleEdit={handleEdit} handleDelete={handleDelete}></TablePagination>

        </>
    );
}

export default Usuario;