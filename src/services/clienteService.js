import api from "./api";

const clienteService = {
    listar: (q="", page=1, limit=10) => {
        return api.get(`/cliente?q=${q}&page=${page}&limit=${limit}`)
    },

    guardar: (datos) => {
        return api.post("/cliente", datos)
    },
    
    mostrar: (id) => {
        return api.get(`/cliente/${id}`)
    },

    modificar: (id, datos) => {
        return api.put(`/cliente/${id}`, datos)
    },

    eliminar: (id) => {
        return api.delete(`/cliente/${id}`)
    }
}

export default clienteService;