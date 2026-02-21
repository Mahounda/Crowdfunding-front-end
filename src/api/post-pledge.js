console.log("POST PLEDGE FUNCTION LOADED");

async function postPledge(pledgeData) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/`;
  const token = window.localStorage.getItem("token");

  console.log("DATA SENT TO BACKEND:", pledgeData);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(pledgeData),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to create pledge`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postPledge;
