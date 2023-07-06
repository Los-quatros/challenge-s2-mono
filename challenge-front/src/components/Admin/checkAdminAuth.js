import jwt_decode from "jwt-decode";

export const checkAdminRole = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const { id } = jwt_decode(token);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const user = await response.json();

    return user.roles === "admin";
  } catch (error) {}
};

export function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
