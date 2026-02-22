import {useState, useEffect} from "react";

import getUser from "../api/get-user";

export default function useUser(userId) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        let ignore = false; // prevents StrictMode double-fetch from updating state

        // Here we pass the fundraiserId to the getFundraiser function.
        getUser(userId)
            .then((user) => {
                if (!ignore) {
                    setUser(user);
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

        // This time we pass the userId to the dependency array so that the hook will re-run if the userId changes.
    }, [userId]);

    return {user, isLoading, error};
}
