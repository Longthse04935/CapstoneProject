export const role = {
      GUEST: "GUEST",
      GUIDER: "GUIDER",
      TRAVELER: "TRAVELER"
};

export function logIn(id, name, role) {
      return { type: LOGIN, id, name, role }
}

export function logOut() {
      return { type: LOGOUT }
}

export const LOGOUT = "LOGOUT";

export const LOGIN = "LOGIN";

const state = {
      user: {
            name: "guest",
            role: "GUEST",
            id: 0,
            loggedIn: false,
      },

      notification: [
            {
                  sender: "system",
                  content: "welcome"
            }
      ],
      chatMessage: [
            {
                  sender: "god",
                  content: "fight me"
            }
      ]

};