import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./Forms.css";

function AddPledgePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // fundraiser ID comes from URL: /pledges/new?fundraiser=3
  const fundraiserId = searchParams.get("fundraiser");

  const [formData, setFormData] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    fundraiser: fundraiserId,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/pledges/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),

      }
    );

    if (response.ok) {
      navigate(`/fundraisers/${fundraiserId}`);
    } else {
      alert("Failed to create pledge");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Pledge</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
          />
        </label>

        <label>
          Comment:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            minLength={3}
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
          />
          Anonymous
        </label>

        <button type="submit">Submit Pledge</button>
      </form>
    </div>
  );
}

export default AddPledgePage;
