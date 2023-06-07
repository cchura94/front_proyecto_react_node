import api from "./api";

const categoriaService = {
    listar: () => {
        return api.get("/categoria")
    },

    guardar: (datos) => {
        return api.post("/categoria", datos)
    }
}

export default categoriaService;