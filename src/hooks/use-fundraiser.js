import { useState, useEffect } from "react";
import getFundraiser from "../api/get-fundraiser";

export default function useFundraiser(fundraiserId) {
  const [fundraiser, setFundraiser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let ignore = false;

    getFundraiser(fundraiserId)
      .then((fundraiser) => {
        if (!ignore) {
          setFundraiser(fundraiser);
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
      ignore = true;
    };
  }, [fundraiserId]);

  return { fundraiser, isLoading, error };
}
