import { useState } from "react";
import postSignUp from "../api/post-signup.js";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../hooks/use-auth.js";
//import postLogin from "../api/post-login.js";



function SignUpForm() {
  //const {auth, setAuth}= useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formData.email && formData.password && formData.username) {
      await postSignUp(formData);
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">UserName:</label>
        <input
          id="username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Choose a password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Sign up</button>
    </form>
  );
}

export default SignUpForm;