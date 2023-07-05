import { useQuery, useQueryClient, useMutation } from "react-query";

const useOrder = () => {
  const queryClient = useQueryClient();

  const fetchOrders = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  };

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery("orders", fetchOrders);

  const deliveryOrderMutation = useMutation((orderId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/orders/${orderId}/delivery`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decision: true }),
      }
    );
  });

  const deliveryOrder = async (orderId) => {
    await deliveryOrderMutation.mutateAsync(orderId);
    queryClient.invalidateQueries("orders");
  };

  return {
    orders,
    isLoading,
    deliveryOrder,
    error,
    refetch,
  };
};

export default useOrder;
