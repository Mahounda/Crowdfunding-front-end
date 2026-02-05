import { useState } from "react";
import postSignUp from "../api/post-signup.js";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formData.email && formData.password) {
      postSignUp(formData).then(() => {
                navigate("/login");
      });
    }
  };

  return (
    <form>
    <div>
        <label htmlFor="username">UserName:</label>
        <input
          id="username"
          type="text"
          placeholder="Choose a username"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Choose a password"
          onChange={handleChange}
        />
      </div>

        <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        </div>
    
      <button type="submit" onClick={handleSubmit}>
        Sign up
      </button>
    </form>
  );
}

export default SignUpForm;
