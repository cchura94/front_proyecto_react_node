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

    buscarCliente: (buscar) => {
        return api.get(`/pedido/buscar-cliente?buscar=${buscar}`)
    },

    nuevoCliente: (cliente) => {
        return api.post(`/pedido/nuevo-cliente`, cliente)
    }
}

export default pedidoService;