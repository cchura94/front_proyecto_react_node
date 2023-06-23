import { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import clienteService from "../../services/clienteService"

const Cliente = () => {
    const [clientes, setClientes] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [q, setq] = useState('')
    const [limit, setLimit] = useState(10)
    const [cliente, setCliente] = useState({})

    const columnas = [
        { key: "id", label: "COD" },
        { key: "nombre_completo", label: "NOMBRE COMPLETO" },
        { key: "correo", label: "CORREO" },
        { key: "ci_nit", label: "CI/NIT" },
        { key: "telefono", label: "TELEFONO" },
    ]
    
    
    
    useEffect(() => {
        getClientes()
    }, [])


    const getClientes = async (nroPage=1, limit=2) => {
        setPage(nroPage)
        const { data } = await clienteService.listar(q, nroPage, limit)
        console.log("TOTAL:", data.count)
        console.log("Registros:", data.rows)
        setTotal(data.count)
        setClientes(data.rows)
    }

    const handleEdit = (datos) => {
        setCliente(datos)
        // setOpenModal(true)

    }

    const handleDelete = async (datos) => {
        if (confirm("Eliminar el Producto?")) {
            try {
                await clienteService.eliminar(datos.id)

                getClientes()

            } catch (error) {
                alert("Ocurrió un problema al intentar eliminar")

            }
        }
    }
    return (
        <>
        
        <TablePagination columnas={columnas} datos={clientes} total={total} page={page} fetchData={getClientes} handleEdit={handleEdit} handleDelete={handleDelete}></TablePagination>

        </>
    );
}

export default Cliente;