import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [username, setUsername] = useState(""); 
  // const [userId, setUserId] = useState(null);

  const handleChange = ({currentTarget:input}) => {
    setData({...data,[input.name]:input.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('token', res.data);
  
      // Decode the token to get user information
      const decodedToken = jwtDecode(res.data);
      const userId = decodedToken._id;
      
      // Call the handleLogin function with userId
      handleLogin(userId);

      // Redirect to welcome page or perform any other action
      // window.location = "/welcome";
      // Redirect to welcome page using React Router
      navigate('/welcome');
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  
  

  return(
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
         <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login Account</h1>
            
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
            </form>
         
        </div>
        <div className={styles.right}>
         <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign up
            </button>
          </Link>
         
            </div>
            </div>
    </div>
  );
}
export default Login;
