import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem('user'))?.username;
        const password = JSON.parse(localStorage.getItem('user'))?.password;
        console.log("username", username)
        if (username === undefined && password === undefined) {
            return navigate('/login');
        }
    })

    return (
        <div>Admin</div>
    )
}

export default Admin