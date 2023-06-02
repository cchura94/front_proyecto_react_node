import api from "./api";

const authService = {
    loginConNode: (credenciales) => {
        return api.post("/auth/login", credenciales)
    },

    registroConNode: (datos) => {
        return api.post("/auth/registro", datos)
    }
}

export default authService;