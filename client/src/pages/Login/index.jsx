import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = await axios
            .post(`${import.meta.env.VITE_API_URL + '/api/login'}`,
                { username: credentials.username, password: credentials.password })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify((res.data)));
                navigate('/')
            })
            .catch((e) => {
                console.error(e);
                localStorage.clear();
            })
        console.log("user", user)
    }

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem('user'))?.username;
        const password = JSON.parse(localStorage.getItem('user'))?.password;
        console.log("username", username)
        if (username !== undefined && password !== undefined) {
            return navigate('/admin');
        }
    })

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