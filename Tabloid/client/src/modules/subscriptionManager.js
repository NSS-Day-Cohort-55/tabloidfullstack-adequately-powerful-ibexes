import { getToken } from "./authManager";

const baseUrl = "/api/Subscription"

export const addSubscription = (subscription) => {
  return getToken().then((token) => {
      return fetch(baseUrl, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
      }).then((res) => {
          if (res.ok) {
              return res.json()
          } else {
              throw new Error(
                  "An unknown error occurred while trying to save your post.",
              );
          }
      });
  });
};

export const deleteSubscription = (id) => {
  return getToken().then((token) => {
      return fetch(`${baseUrl}/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(id)
      }).then((res) => {
          if (res.ok) {
          } else {
              throw new Error(
                  "An unknown error occured while trying to save a new tag."
              )
          }
      })
  })
}