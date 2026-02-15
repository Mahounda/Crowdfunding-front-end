async function getPledge(pledgeId) {
  const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const fallbackError = `Error trying to fetch pledge with id ${pledgeId}`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default getPledge;
