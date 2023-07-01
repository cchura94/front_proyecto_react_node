import { useState } from "react"
import axios from "axios"
import authService from "../services/authService"
import { useNavigate } from "react-router-dom"

const Login = () => {
    // estados o variable (hooks de de react)
    const [titulo, setTitulo] = useState("LOGIN")
    const [email, setEmail] = useState("")
    const [password, setClave] = useState("")
    // habiltamos hook useNavigate
    const navigate = useNavigate()
    // funciones o metodos
    const funLogin = async (e) => {
        e.preventDefault()

        try {
            const user = {email, password}
            console.log(user)

            // peticion al servidor de node
            const {data} = await authService.loginConNode(user);// .then(res => console.log(res))
            console.log(data);

            localStorage.setItem("access_token", data.access_token)

            navigate("/admin/categoria")
            // axios.post("http://127.0.0.1:3000/api/auth/login", user).then(res => console.log(res))
            
            
        } catch (error) {
            console.log(error.response.data)
            alert(error.response.data.message)
        }        
    }
    // retornar el html
    return (
        <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
        <header className="max-w-lg mx-auto">
        <a href="#">
            <h1 className="text-4xl font-bold text-white text-center">Mi Empresa</h1>
        </a>
    </header>

    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 className="font-bold text-2xl">Bienvenido</h3>
            <p className="text-gray-600 pt-2">Ingresar.</p>
        </section>

        <section className="mt-10">
            <form className="flex flex-col" onSubmit={(e) => funLogin(e)}>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Correo</label>
                    <input type="text" id="email"  onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                </div>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Contraseña</label>
                    <input type="password" id="password" onChange={(e) => setClave(e.target.value)} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                </div>
                <div className="flex justify-end">
                    <a href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">INGRESAR</button>
            </form>
        </section>
    </main>

    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-white">Don't have an account? <a href="#" className="font-bold hover:underline">Sign up</a>.</p>
    </div>

    <footer className="max-w-lg mx-auto flex justify-center text-white">
        <a href="#" className="hover:underline">Contact</a>
        <span className="mx-3">•</span>
        <a href="#" className="hover:underline">Privacy</a>
    </footer>

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
        </div>
    )
}

export default Login;