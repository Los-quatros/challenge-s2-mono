import { useQuery, useMutation, useQueryClient } from "react-query";

const useClient = () => {
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  };

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery("users", fetchUsers);

  const saveUserMutation = useMutation((user) => {
    if (user.id) {
      return fetch(`${process.env.REACT_APP_BASE_API_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });
    }

    return fetch(`${process.env.REACT_APP_BASE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(user),
    });
  });

  const saveUser = async (user) => {
    const response = await saveUserMutation.mutateAsync(user);
    queryClient.invalidateQueries("users");
    return response;
  };

  const deleteUserMutation = useMutation((userId) => {
    return fetch(`${process.env.REACT_APP_BASE_API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  });

  const deleteUser = async (userId) => {
    await deleteUserMutation.mutateAsync(userId);
    queryClient.invalidateQueries("users");
  };

  return {
    users,
    isLoading,
    saveUser,
    deleteUser,
    error,
    refetch,
  };
};

export default useClient;
