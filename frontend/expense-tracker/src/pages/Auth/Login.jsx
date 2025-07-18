import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'; 
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_URL } from "../../utils/apiPaths";
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // HandleLoginForm Functionality Here
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)){
      setError("Please Enter a Valid Email Address");
      return;
    }

    if(!password){
      setError("Please Enter Correct Password");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_URL.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        navigate("/dashboard");
      }
    }
    catch (error) {
      if (error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went Wrong. Please try again");
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 nd:h-full flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-800 mt-[5px] mb-6'>Please enter your Details to log in</p>

        <form onSubmit={handleLogin}>
          <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="your_mail@example.com" type="text" />
          <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 Characters" type="password" />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>LOGIN</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login