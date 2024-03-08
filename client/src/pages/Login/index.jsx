import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
            .post(`${import.meta.env.VITE_API_URL + '/api/login'}`,
                { username: credentials.username, password: credentials.password })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify((res.data)));
                navigate('/admin')
            })
            .catch((e) => {
                console.error(e);
                localStorage.clear();
            }).finally(() => {
                setLoading(false)
            })
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
        <>
            {loading ? <>loading</> : (
                <form onSubmit={handleLogin} autoComplete="off" className='h-screen m-auto w-1/3 flex items-start justify-center gap-4 flex-col'>
                    <div className=' text-xl'>Admin Panel Giriş</div>
                    <Input name="username" autoComplete='off' placeholder="Username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} className="w-1/2" />
                    <Input name="password" type='password' placeholder="Password" autoComplete='current-password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} className="w-1/2" />
                    <Button type='submit'>
                        Giriş yap
                    </Button>
                </form>
            )
            }
        </>
    )
}

export default Login