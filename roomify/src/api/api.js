const backendDomain = "http://localhost:3000";

export { backendDomain };

const SummaryApi = {
  // Auth Api
  signup: {
    url: `${backendDomain}/api/users/signUpFormData`,
    method: "post",
  },
  gAuthLogin: {
    url: `${backendDomain}/auth/google/callback`,
    method: "get",
  },
  login: {
    url: `${backendDomain}/api/users/LoginFormData`,
    method: "post",
  },
  logout: {
    url: `${backendDomain}/api/users/logout`,
    method: "get",
  },
  userData: {
    url: `${backendDomain}/api/users/userData`,
    method: "get",
  },
  checkUserInDb: {
    url: `${backendDomain}/api/users/checkUserInDb`,
    method: "get",
  },

  // Admin Api
  getAllLandlords: {
    url: `${backendDomain}/api/admin/getAllLandlords`,
    method: "get",
  },
  getAllTenants: {
    url: `${backendDomain}/api/admin/getAllTenants`,
    method: "get",
  },
  deleteUser: {
    url: `${backendDomain}/api/admin/deleteUser`,
    method: "delete",
  },
  getUserCounts: {
    url: `${backendDomain}/api/admin/getUserCounts`,
    method: "get",
  },

  // Otp Api
  generateOtp: {
    url: `${backendDomain}/api/otp/generateOtp`,
    method: "post",
  },
  verifyOtp: {
    url: `${backendDomain}/api/otp/verifyOtp`,
    method: "put",
  },

  // Room Api
  registerRoom: {
    url: `${backendDomain}/api/rooms/registerRoom`,
    method: "post",
  },
  getAllRooms: {
    url: `${backendDomain}/api/rooms/getAllRooms`,
  },
  getUserRooms: {
    url: `${backendDomain}/api/rooms/getUserRooms`,
    method: "get",
  },
  getRoomFromId: {
    url: `${backendDomain}/api/rooms/getRoomFromId`,
    method: "get",
  },
  deleteRoom: {
    url: `${backendDomain}/api/rooms/deleteRoom`,
    method: "delete",
  },
  updateRoom: {
    url: `${backendDomain}/api/rooms/updateRoom`,
    method: "patch",
  },
  getUniqueRoomsLocations: {
    url: `${backendDomain}/api/rooms/getUniqueLocations`,
    get: "get",
  },
  getRoomBasedOnTypes: {
    url: `${backendDomain}/api/rooms/getRoomsBasedOnTypes`,
    method: "get",
  },
  getRoomBasedOnLocation: {
    url: `${backendDomain}/api/rooms/getRoomsBasedOnLocation`,
    method: "get",
  },
  getRoomsBasedOnCoordinates: {
    url: `${backendDomain}/api/rooms/getRoomBasedOnCoordinates`,
    method: "get",
  },

  // Negotiation Api
  registerNegotiation: {
    url: `${backendDomain}/api/negotiation`,
    method: "post",
  },
  deleteNegotiation: {
    url: `${backendDomain}/api/negotiation`,
    method: "delete",
  },
  getUsersNegotiation: {
    url: `${backendDomain}/api/negotiation/getUsersNegotiation`,
    method: "get",
  },
  acceptNegotiaion: {
    url: `${backendDomain}/api/negotiation`,
    method: "put",
  },
  getRequestedNegotiations: {
    url: `${backendDomain}/api/negotiation/getRequestedNegotiations`,
    method: "get",
  },
  counterNegotiation: {
    url: `${backendDomain}/api/negotiation/counterNegotiation`,
    method: "put",
  },

  // Experiences
  registerExperince: {
    url: `${backendDomain}/api/experience/registerExperience`,
    method: "post",
  },
  getAllExperience: {
    url: `${backendDomain}/api/experience/getAllExperiences`,
    method: "get",
  },
  getRoomExperiences: {
    url: `${backendDomain}/api/experience/getRoomExperiences`,
    method: "get",
  },

  // Payment
  getRoomPrice: {
    url: `${backendDomain}/api/payments/getRoomPrice`,
    method: "get",
  },
  registerPayment: {
    url: `${backendDomain}/api/payments/registerPayment`,
    method: "post",
  },

  // Message Routes
  registerMessage: {
    url: `${backendDomain}/api/messages`,
    method: "post",
  },
  getAllMessages: {
    url: `${backendDomain}/api/messages`,
    method: "get",
  },
  getUniquePersons: {
    url: `${backendDomain}/api/messages/getUniquePersons`,
    method: "get",
  },
};

export default SummaryApi;
