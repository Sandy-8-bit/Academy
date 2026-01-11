export const appRoutes = {
  landingPage: "/",
  signInPage: "/auth",

  home: "/home",
  course: {
    path: "/course",
    children: {
      details: "/course/:id",
      
    },
  },
  auth: {
    signUp: "/auth/signup",
    forgotPassword: "/auth/forgot-password",
    signIn: "/auth/signin",
  },
  myCourses: {
    path: "/my-courses",
    children: {
      details: "/my-courses/:id",
      courseTier: "/my-courses/tier/:id",
      courseContent: "/my-courses/:courseId/tier/:tierId",
    },
  },
  certifications: {
    path: "/certifications",
    children: {
      details: "/certifications/:id",
    },
  },

  profile: {
    path: "/profile",
    children: {
      edit: "/profile/edit",
    },
  },

  settings: {
    path: "/settings",
    children: {
      security: "/settings/security",
      preferences: "/settings/preferences",
    },
  },
};
