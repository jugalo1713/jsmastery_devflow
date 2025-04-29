const ROUTES = {
  ASK_QUESTION: "/ask-question",
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  PROFILE: (id: string | number) => `/profile/${id}`,
  TAGS: (id: string | number) => `/tags/${id}`,
  QUESTION: (id: string | number) => `tags/${id}`,
};

export default ROUTES;
