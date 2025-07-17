const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile"
  },
  PROJECT:{
    CREATE: "/project/create",
    UPDATE: "/project/update",
    DELETE: "/project/delete",
    LIST: "/project/list",
    DETAILS: "/project/details"
  },
  CLIENT:{
    CREATE: "/client/create",
    UPDATE: "/client/update",
    DELETE: "/client/delete",
    LIST: "/client/list",
    DETAILS: "/client/details"
  },
  USERS:{
    INVITE: "/users/invite",
  },
  LOGS:{
    GET: "/logs",
  }
};

export default API_ROUTES;
