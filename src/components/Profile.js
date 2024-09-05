import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigation = useNavigate();
    const [show, setshow] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem("login")
        if (loginStatus === "false") {
            navigation('/login')
        }
    }, [navigation])

    const token = localStorage.getItem('authToken');
    async function checkTokan() {
        const email = localStorage.getItem('email')
        try {
            const response = await fetch('http://127.0.0.1:5000/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'token': token, 'email': email }),
            });

            if (response.ok) {
                const data = await response.json();
                // console.log('Success:', data);
                localStorage.setItem('login', data);
                setshow(data)
            } else {
                console.error('Error:', response.statusText);

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    checkTokan()


    //for logout
    function logout() {
        localStorage.removeItem('authToken');
        localStorage.setItem('login', false)
        localStorage.removeItem('email');
        navigation('/login')
    }
    return show ? <>
        <h1> Profile page</h1>
        <button onClick={logout}>Logout</button>
    </> : null
}