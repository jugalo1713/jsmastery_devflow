const ROUTES = {
  ASK_QUESTION: "/ask-question",
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  PROFILE: (id: string | number) => `/profile/${id}`,
  TAGS: (id: string | number) => `/tags/${id}`,
  QUESTION: (id: string | number) => `tags/${id}`,
  SIGN_IN_WITH_OAUTH: "signin-with-oauth",
};

export default ROUTES;
