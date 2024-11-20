import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);  // Added error state
  const [loading, setLoading] = useState(true);  // Added loading state

  useEffect(() => {
    // Start with a clean state (reset error and data)
    setLoading(true);
    setError(null);
    setData({});

    // Fetch data from the API
    fetch(`https://v6.exchangerate-api.com/v6/0fc500e5924ff91a511ad405/latest/${currency}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.result === "success") {
          setData(res.conversion_rates); // Store the conversion rates
        } else {
          setError("Failed to fetch data. Please try again later.");
        }
      })
      .catch(() => {
        setError("An error occurred while fetching the data.");
      })
      .finally(() => {
        setLoading(false);  // Set loading to false when done
      });
  }, [currency]);

  return { data, error, loading };  // Return data, error, and loading states
}

export default useCurrencyInfo;
