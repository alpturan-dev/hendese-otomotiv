import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Loading from '@/components/loading'

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
        if (username !== undefined && password !== undefined) {
            return navigate('/admin');
        }
    })

    return (
        <Loading loading={loading}>
            <form onSubmit={handleLogin} autoComplete="off" className='h-screen m-auto w-1/3 flex items-start justify-center gap-4 flex-col'>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Admin Panel Giriş</CardTitle>
                        <CardDescription>Giriş yapmak için kullanıcı adınızı ve şifrenizi girin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Kullanıcı adı</Label>
                            <Input id="username" placeholder="Kullanıcı adı" required onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Şifre</Label>
                            <Input id="password" placeholder="Şifre" required type="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex">
                        <Button className="ml-auto" type='submit'>Giriş</Button>
                    </CardFooter>
                </Card>
            </form>
        </Loading>
    )
}

export default Login