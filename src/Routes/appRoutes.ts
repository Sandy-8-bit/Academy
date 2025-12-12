
export const appRoutes = {
  landingPage: "/",
  Courses: {
    path: "/Courses",
    children: {
      details:"/Courses/:id"
    },
  },
};
