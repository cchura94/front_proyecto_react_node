import api from "./api";

const pedidoService = {
    listar: (q="", page=1, limit=10) => {
        return api.get(`/pedido?q=${q}&page=${page}&limit=${limit}`)
    },

    guardar: (datos) => {
        return api.post("/pedido", datos)
    },
    
    mostrar: (id) => {
        return api.get(`/pedido/${id}`)
    },

    modificar: (id, datos) => {
        return api.put(`/pedido/${id}`, datos)
    },

    eliminar: (id) => {
        return api.delete(`/pedido/${id}`)
    }
}

export default pedidoService;