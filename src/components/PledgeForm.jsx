import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import postPledge from "../api/post-pledge";
import "../pages/Forms.css";
import "../components/NavBar.css";

function PledgeForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fundraiserId = Number(searchParams.get("fundraiser"));
  const userId = Number(window.localStorage.getItem("user_id"));
  const [formData, setFormData] = useState({
    amount: "",
    comment: "",
    anonymous: false,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const pledgeData = {
      amount: Number(formData.amount),
      comment: formData.comment,
      anonymous: formData.anonymous,
      supporter: userId,
      fundraiser: fundraiserId, 
    };

      postPledge(pledgeData)
      .then(() => {
        navigate(`/fundraisers/${fundraiserId}`);
      })
      .catch((error) => {
        console.error("Error creating pledge:", error);
        alert("Could not create pledge.");
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add a Pledge</h2>

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <label htmlFor="comment">Comment:</label>
      <input
        type="text"
        id="comment"
        value={formData.comment}
        onChange={handleChange}
      />

      <label htmlFor="anonymous">Anonymous:</label>
      <input
        type="checkbox"
        id="anonymous"
        checked={formData.anonymous}
        onChange={handleChange}
      />

      <button type="submit">Submit Pledge</button>
    </form>
  );
}

export default PledgeForm;

