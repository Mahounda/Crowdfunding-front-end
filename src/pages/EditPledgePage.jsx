import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import usePledge from "../hooks/use-pledge";
import "./EditPledgePage.css";

function EditPledgePage() {
  const { id } = useParams(); // pledge ID from URL
  const navigate = useNavigate();

  const { pledge, isLoading, error } = usePledge(id);

  const [formData, setFormData] = useState({
    amount: "",
    comment: "",
    anonymous: false,
  });

  // Pre-fill form when pledge loads
  useEffect(() => {
    if (pledge) {
      setFormData({
        amount: pledge.amount,
        comment: pledge.comment,
        anonymous: pledge.anonymous,
      });
    }
  }, [pledge]);

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
      `${import.meta.env.VITE_API_URL}/pledges/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      navigate(`/fundraisers/${pledge.fundraiser}`); 
    } else {
      alert("Failed to update pledge");
    }
  };

  if (isLoading) return <p>Loading pledge...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="form-container">
      <h2>Edit Pledge</h2>

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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPledgePage;

