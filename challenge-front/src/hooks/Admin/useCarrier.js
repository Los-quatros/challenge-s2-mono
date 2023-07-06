import { useQuery, useMutation, useQueryClient } from "react-query";

const useCarrier = () => {
  const queryClient = useQueryClient();

  const fetchCarriers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/carriers/admin`,
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
    if (response.ok !== true) {
      throw new Error();
    }
    queryClient.invalidateQueries("carriers");
    return response;
  };

  const desactivateCarrierMutation = useMutation((carrierId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/carriers/${carrierId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isActive: false }),
      }
    );
  });

  const desactivateCarrier = async (carrierId) => {
    const response = await desactivateCarrierMutation.mutateAsync(carrierId);
    if (response.ok !== true) {
      throw new Error();
    }
    queryClient.invalidateQueries("carriers");
    return response;
  };

  const activateCarrierMutation = useMutation((carrierId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/carriers/${carrierId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isActive: true }),
      }
    );
  });

  const activateCarrier = async (carrierId) => {
    const response = await activateCarrierMutation.mutateAsync(carrierId);
    if (response.ok !== true) {
      throw new Error();
    }
    queryClient.invalidateQueries("carriers");
    return response;
  };

  return {
    carriers,
    isLoading,
    saveCarrier,
    desactivateCarrier,
    activateCarrier,
    error,
  };
};

export default useCarrier;
