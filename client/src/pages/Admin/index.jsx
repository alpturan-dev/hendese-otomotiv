import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Admin = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem('user'))?.username;
        const password = JSON.parse(localStorage.getItem('user'))?.password;
        console.log("username", username)
        if (username === undefined && password === undefined) {
            return navigate('/login');
        }
    })

    return (
        <div>Admin
            <Button onClick={handleLogout}>Çıkış yap</Button>
        </div>
    )
}

export default Admin