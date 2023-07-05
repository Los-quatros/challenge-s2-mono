import { useQuery, useMutation, useQueryClient } from "react-query";

const useCarrier = () => {
  const queryClient = useQueryClient();

  const fetchCarriers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/carriers`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  };

  const {
    data: carriers,
    isLoading,
    error,
    refetch,
  } = useQuery("carriers", fetchCarriers);

  const saveCarrierMutation = useMutation((carrier) => {
    if (carrier.id) {
      return fetch(
        `${process.env.REACT_APP_BASE_API_URL}/carriers/${carrier.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(carrier),
        }
      );
    }

    return fetch(`${process.env.REACT_APP_BASE_API_URL}/carriers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(carrier),
    });
  });

  const saveCarrier = async (carrier) => {
    const response = await saveCarrierMutation.mutateAsync(carrier);
    if (response !== 200 || response !== 201) {
      throw new Error();
    }
    queryClient.invalidateQueries("carriers");
    return response;
  };

  const deleteCarrierMutation = useMutation((carrierId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/carriers/${carrierId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  });

  const deleteCarrier = async (carrierId) => {
    await deleteCarrierMutation.mutateAsync(carrierId);
    queryClient.invalidateQueries("carriers");
  };

  return {
    carriers,
    isLoading,
    saveCarrier,
    deleteCarrier,
    error,
    refetch,
  };
};

export default useCarrier;
