import { useNavigate } from 'react-router-dom';
import './css/login.css'
import { useState, useEffect } from 'react';


function Login() {


    //for routeing 
    const [show, setshow] = useState(false);

    
    const navigation = useNavigate()
    useEffect(() => {
        const loginStatus = localStorage.getItem("login")
        if (loginStatus == "true") {
            navigation('/profile')    
        }
        else{
            setshow(true)
        }
    }, [navigation]);


    function registernav() {

        navigation('/register')
    }

    //for form validation
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputs, setInputs] = useState({})

    const validate = () => {
        let errors = {};

        if (!inputs.email_or_mobilenumber) {
            errors.email = 'Email or mobile is required';
        } 

        if (!inputs.Password) {
            errors.password = 'Password is required';
        }    
         return errors;
    };

    //for store the form data and submit

    function change(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((pre) => { return { ...pre, [name]: value } })

    }
    //for submit 
    async function login(e) {
        e.preventDefault()
        console.log(inputs)
        const errors = validate();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitted(true);
            // console.log('Form data:', inputs);
            try {
                const response = await fetch('http://127.0.0.1:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inputs),
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log('Success:', data);
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('email',data.email_or_mobilenumber)
                    localStorage.setItem('login', true);
                    navigation('/profile');
                } else {
                    console.error('Error:', response.statusText);
                    // Handle login error (e.g., display error message)
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle network error
            }
           
        } else {
            setIsSubmitted(false);
        }

    }


    return (show ?
        <div className="container login-form mt-4">
            <form className="form" onSubmit={login}>
                <div className="note">
                    <h1>Login</h1>
                </div>

                <div className="form-content">
                    <div className="row row1">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="E-mail or mobile *" name='email_or_mobilenumber' onChange={change} />
                            </div>
                            {formErrors.email && <span>{formErrors.email}</span>}

                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Your Password *" name='Password' onChange={change} />
                            </div>
                            {formErrors.password && <span>{formErrors.password}</span>}

                        </div>
                    </div>
                    <button type="submit" className="btnSubmit my-3" >Login</button>
                    <div className='login-box'>
                        <p className=' login' onClick={registernav}>I Don't Have a Account</p>
                    </div>

                </div>
            </form>
        </div>:null
        )

}
export default Login;