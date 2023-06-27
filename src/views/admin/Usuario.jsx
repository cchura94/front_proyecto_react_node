import { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import Modal from "../../components/Modal";
import usuarioService from "../../services/usuarioService"

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [q, setq] = useState('')
    const [limit, setLimit] = useState(10)
    const [usuario, setUsuario] = useState({ email: "", password: "" })

    const [modalOpen, setOpenModal] = useState(false)

    const columnas = [
        { key: "id", label: "COD" },
        { key: "email", label: "CORREO ELECTRONICO" },
        { key: "created_at", label: "CREADO EN" },
    ]
    useEffect(() => {
        getUsuarios()
    }, [])

    const resetData = () => {
        setUsuario({ email: "", password: "" })
        setOpenModal(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevState => ({
            ...prevState,
            [name]: value
        })))
    }



    const getUsuarios = async (nroPage = 1, limit = 4) => {
        setPage(nroPage)
        const { data } = await usuarioService.listar(q, nroPage, limit)
        console.log("TOTAL:", data.count)
        console.log("Registros:", data.rows)
        setTotal(data.count)
        setUsuarios(data.rows)
    }

    const handleEdit = (datos) => {
        setUsuario(datos)
        setOpenModal(true)
    }

    const funGuardar = async (e) => {
        e.preventDefault();
        try {
            if (usuario.id) {
                await usuarioService.modificar(usuario.id, usuario)
            } else {
                await usuarioService.guardar(usuario)
            }
            resetData()
            getUsuarios()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (datos) => {
        if (confirm("Eliminar el Usuario?")) {
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

            <button className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={() => setOpenModal(!modalOpen)}>
                NUEVO USUARIO
            </button>

            <TablePagination columnas={columnas} datos={usuarios} total={total} page={page} fetchData={getUsuarios} handleEdit={handleEdit} handleDelete={handleDelete}></TablePagination>

            <Modal modalOpen={modalOpen} setOpenModal={resetData}>
                <form onSubmit={(e) => funGuardar(e)}>

                    <label>Ingrese Correo</label>
                    <input
                        type="email"
                        name="email"
                        value={usuario.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />

                    <label>Ingrese Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={usuario.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
                    />
                    <input type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mr-2 rounded" />
                </form>

            </Modal>
        </>
    );
}

export default Usuario;