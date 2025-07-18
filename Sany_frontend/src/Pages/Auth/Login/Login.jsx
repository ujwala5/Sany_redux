import React from 'react'
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';




function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {

      console.log("values==", values);
      let result = await fetch("http://localhost:8991/V2/customer/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId: values.email,
          password: values.password,
        }),
      });

      const data = await result.json(); // Parse response body
      console.log("status:", result.status);
      console.log("response data:", data);

      let accessToken = data.access_token;

      // sessionStorage.setItem("authToken", accessToken);

      localStorage.setItem("authToken", accessToken);

      if (data.code === 200) {
        toast.success("Login Successful!");
        navigate('/dashboard');
      } else {
        toast.error("invalid credentials");
      }
    }
  });

  return (

    <div className="container-extra-properties">
      <div className="container1">
        <div className="heading">Sign In</div>
        <form action="" className="form" onSubmit={formik.handleSubmit}>
          <input className="input" type="email" name="email" id="email" placeholder="E-mail" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && formik.errors.email}
          />
          <input className="input" type="password" name="password" id="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && formik.errors.password} />

          <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
          <input className="login-button" type="submit" value="Sign In" />

        </form>
        <span className="agreement"><a href="#">Learn user licence agreement</a></span>
      </div>
    </div>

  )
}

export default Login;