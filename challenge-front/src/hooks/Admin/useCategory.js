import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
const useCategory = () => {
  const queryClient = useQueryClient();

  const fetchCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/categories/admin/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok !== true) {
      toast.error(
        "Une erreur est survenue lors de la récupération des catégories"
      );
    }
    return response.json();
  };

  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery("categories", fetchCategories);

  const saveCategoryMutation = useMutation((category) => {
    if (category.id) {
      return fetch(
        `${process.env.REACT_APP_BASE_API_URL}/categories/${category.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(category),
        }
      );
    }

    return fetch(`${process.env.REACT_APP_BASE_API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category),
    });
  });

  const saveCategory = async (category) => {
    const response = await saveCategoryMutation.mutateAsync(category);
    queryClient.invalidateQueries("categories");
    return response;
  };

  const deleteCategoryMutation = useMutation((categoryId) => {
    return fetch(
      `${process.env.REACT_APP_BASE_API_URL}/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  });

  const deleteCategory = async (categoryId) => {
    const response = await deleteCategoryMutation.mutateAsync(categoryId);
    queryClient.invalidateQueries("categories");
    return response;
  };

  return {
    categories,
    isLoading,
    error,
    refetch,
    saveCategory,
    deleteCategory,
  };
};

export default useCategory;
