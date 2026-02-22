import { useState, useEffect } from "react";
import getPledge from "../api/get-pledge";

export default function usePledge(pledgeId) {
  const [pledge, setPledge] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let ignore = false; // prevents StrictMode double-fetch from updating state

    getPledge(pledgeId)
      .then((pledge) => {
        if (!ignore) {
          setPledge(pledge);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (!ignore) {
          setError(error);
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true; // cleanup: ignore the second StrictMode effect run
    };
  }, [pledgeId]);

  return { pledge, isLoading, error };
}

