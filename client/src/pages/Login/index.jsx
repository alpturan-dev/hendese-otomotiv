import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = await axios
            .post(`${import.meta.env.VITE_API_URL + '/api/login'}`,
                { username: credentials.username, password: credentials.password })
            .then((res) => console.log(res))
            .catch((e) => console.log(e))
        console.log("user", user)
    }

    return (
        <form onSubmit={handleLogin} autoComplete="off">
            <input name="username" autoComplete='off' onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <input name="password" type='password' autoComplete='current-password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button type='submit'>
                Login
            </button>
        </form>
    )
}

export default Login