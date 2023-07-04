import { useQuery, useMutation, useQueryClient } from "react-query";

const useProduct = () => {
  const queryClient = useQueryClient();

  const fetchProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/products/admin/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  };

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("products", fetchProducts);

  const saveProductMutation = useMutation((product) => {
    if (product.id) {
      return fetch(
        `${process.env.REACT_APP_BASE_API_URL}/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(product),
        }
      );
    }

    return fetch(`${process.env.REACT_APP_BASE_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    });
  });

  const saveProduct = async (product) => {
    const response = await saveProductMutation.mutateAsync(product);
    queryClient.invalidateQueries("products");
    return response;
  };

  const desactivateProductMutation = useMutation((productId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isActivated: false }),
      }
    );
  });

  const desactivateProduct = async (productId) => {
    const response = await desactivateProductMutation.mutateAsync(productId);
    queryClient.invalidateQueries("products");
    return response;
  };

  const activateProductMutation = useMutation((productId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({ isActivated: true }),
      }
    );
  });

  const activateProduct = async (productId) => {
    const response = await activateProductMutation.mutateAsync(productId);
    queryClient.invalidateQueries("products");

    return response;
  };

  return {
    products,
    isLoading,
    error,
    refetch,
    saveProduct,
    desactivateProduct,
    activateProduct,
  };
};

export default useProduct;
