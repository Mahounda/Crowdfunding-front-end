async function updateFundraiser(id, formData) {
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/${id}/`;
  const token = window.localStorage.getItem("token");

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const fallbackError = `Error updating fundraiser`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default updateFundraiser;

