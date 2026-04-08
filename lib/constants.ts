// API Configuration and helper functions

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',

  // Clients
  SUBMIT_FORM: '/clients/submit',
  GET_CLIENTS: '/clients',
  GET_CLIENT: (id: string) => `/clients/${id}`,
  UPDATE_CLIENT: (id: string) => `/clients/${id}`,
  DELETE_CLIENT: (id: string) => `/clients/${id}`,

  // Projects
  GET_PROJECTS: '/projects',
  GET_PROJECT: (id: string) => `/projects/${id}`,
  CREATE_PROJECT: '/projects',
  UPDATE_PROJECT: (id: string) => `/projects/${id}`,
  DELETE_PROJECT: (id: string) => `/projects/${id}`,
  GET_FEATURED_PROJECTS: '/projects/featured',

  // Services
  GET_SERVICES: '/services',
  GET_SERVICE: (id: string) => `/services/${id}`,
  CREATE_SERVICE: '/services',
  UPDATE_SERVICE: (id: string) => `/services/${id}`,
  DELETE_SERVICE: (id: string) => `/services/${id}`,
};

export const API_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle',
};
