import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    shopName: "",
    gov_id: "",
    email: "",
    password: "",
    ownerName: "",
    mobileNo: "",
    pinCode: "",
    address: "",
    category: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/shops";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Shop</h1>
            <input
              type="text"
              placeholder="Shop Name"
              name="shopName"
              onChange={handleChange}
              value={data.shopName}
              required
              className={styles.input}
            />
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
            <input
              type="text"
              placeholder="Owner Name"
              name="ownerName"
              onChange={handleChange}
              value={data.ownerName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Mobile No"
              name="mobileNo"
              onChange={handleChange}
              value={data.mobileNo}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Pin Code"
              name="pinCode"
              onChange={handleChange}
              value={data.pinCode}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              value={data.address}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Government-issued Registration number"
              name="gov_id"
              onChange={handleChange}
              value={data.gov_id}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              onChange={handleChange}
              value={data.category}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
