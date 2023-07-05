import { useQuery, useQueryClient, useMutation } from "react-query";

const useReturn = () => {
  const queryClient = useQueryClient();

  const fetchReturns = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/returns`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  };

  const {
    data: returns,
    isLoading,
    error,
    refetch,
  } = useQuery("returns", fetchReturns);

  const acceptReturnMutation = useMutation((returnId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/returns/${returnId}/moderate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decision: true }),
      }
    );
  });

  const acceptReturn = async (returnId) => {
    await acceptReturnMutation.mutateAsync(returnId);
    queryClient.invalidateQueries("returns");
  };

  const rejectReturnMutation = useMutation((returnId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/returns/${returnId}/moderate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decision: false }),
      }
    );
  });

  const rejectReturn = async (returnId) => {
    await rejectReturnMutation.mutateAsync(returnId);
    queryClient.invalidateQueries("returns");
  };

  return {
    returns,
    isLoading,
    acceptReturn,
    rejectReturn,
    error,
    refetch,
  };
};

export default useReturn;
