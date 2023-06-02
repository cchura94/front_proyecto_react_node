import { useState } from "react"
import axios from "axios"
import authService from "../services/authService"

const Login = () => {
    // estados o variable (hooks de de react)
    const [titulo, setTitulo] = useState("LOGIN")
    const [email, setEmail] = useState("")
    const [password, setClave] = useState("")
    // funciones o metodos
    const funLogin = async (e) => {
        e.preventDefault()

        const user = {email, password}
        console.log(user)

        // peticion al servidor de node
        const {data} = await authService.loginConNode(user);// .then(res => console.log(res))
        console.log(data);
        // axios.post("http://127.0.0.1:3000/api/auth/login", user).then(res => console.log(res))
    }
    // retornar el html
    return (
        <>
            <h1>Pagina: { titulo }</h1>
            <h5>CORREO: { email }</h5>
            <h5>CLAVE: { password }</h5>
            <form onSubmit={(e) => funLogin(e)}>
                <label>Ingrese Correo:</label>
                <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Ingrese Contraseña:</label>
                <input type="password" required onChange={(e) => setClave(e.target.value)} />
                <br />
                <input type="submit" />
                <input type="reset" />
                { /* <button type="button" onClick={() => funLogin()}>PRUEBA</button> */}
            </form>
        </>
    )
}

export default Login;