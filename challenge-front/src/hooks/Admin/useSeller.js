import { useQuery, useQueryClient, useMutation } from "react-query";

const useSeller = () => {
  const queryClient = useQueryClient();

  const fetchSellers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/sellers`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  };

  const {
    data: sellers,
    isLoading,
    error,
    refetch,
  } = useQuery("sellers", fetchSellers);

  const saveSellerMutation = useMutation((seller) => {
    if (seller.id) {
      return fetch(
        `${process.env.REACT_APP_BASE_API_URL}/sellers/${seller.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(seller),
        }
      );
    }

    return fetch(`${process.env.REACT_APP_BASE_API_URL}/sellers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(seller),
    });
  });

  const saveSeller = async (seller) => {
    const response = await saveSellerMutation.mutateAsync(seller);
    queryClient.invalidateQueries("sellers");
    return response;
  };

  const deleteSellerMutation = useMutation((sellerId) => {
    return fetch(`${process.env.REACT_APP_BASE_API_URL}/sellers/${sellerId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });

  const deleteSeller = async (sellerId) => {
    await deleteSellerMutation.mutateAsync(sellerId);
    queryClient.invalidateQueries("sellers");
  };

  const activeSellerMutation = useMutation((sellerId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/sellers/${sellerId}/activate`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  });

  const activeSeller = async (sellerId) => {
    await activeSellerMutation.mutateAsync(sellerId);
    queryClient.invalidateQueries("sellers");
  };

  const desactiveSellerMutation = useMutation((sellerId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/sellers/${sellerId}/desactivate`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  });

  const desactiveSeller = async (sellerId) => {
    await desactiveSellerMutation.mutateAsync(sellerId);
    queryClient.invalidateQueries("sellers");
  };

  return {
    sellers,
    isLoading,
    saveSeller,
    deleteSeller,
    error,
    refetch,
    activeSeller,
    desactiveSeller,
  };
};

export default useSeller;
