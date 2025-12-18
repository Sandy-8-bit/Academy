export const appRoutes = {
  landingPage: '/',
  signInPage: '/auth',

  home: '/home',
  Courses: {
    path: "/Courses",
    children: {
      details:"/Courses/:id"
    },
  },
  myCourses: {
    path: '/my-courses',
    children: {
      details: '/my-courses/:id',
    },
  },
  certifications: {
    path: '/certifications',
    children: {
      details: '/certifications/:id',
    },
  },

  profile: {
    path: '/profile',
    children: {
      edit: '/profile/edit',
    },
  },

  settings: {
    path: '/settings',
    children: {
      security: '/settings/security',
      preferences: '/settings/preferences',
    },
  },
}
