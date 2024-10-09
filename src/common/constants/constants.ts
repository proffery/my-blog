export const constants = {
  avatarCoordinates: {
    desktop: {
      position: [0, 0, 0],
      rotation: [0, -0.2, 0],
      scale: 100,
    },
    mobile: {
      position: [0, 0, 0],
      rotation: [0, -0.2, 0],
      scale: 100,
    },
  },
  fetchLoaderModelCoordinates: {
    desktop: {
      position: [-2, 3.5, 0],
      rotation: [5, 6.45, 0],
      scale: 30,
    },
    mobile: {
      position: [-1, 4, 0],
      rotation: [5, 6.45, 0],
      scale: 25,
    },
  },
  initializationLoaderModelCoordinates: {
    desktop: {
      position: [-1, -1, 0],
      rotation: [0, -0.4, 0],
      scale: 25,
    },
    mobile: {
      position: [-1, -1, 0],
      rotation: [0, -0.4, 0],
      scale: 25,
    },
  },
  maxContentWidth: 1248, // in px
  mobileWidth: 576, // in px
  notFoundModelCoordinates: {
    desktop: {
      position: [-2, -8, 0],
      rotation: [5, 6.45, 0],
      scale: 40,
    },
    mobile: {
      position: [-3, -7, 0],
      rotation: [5, 6.45, 0],
      scale: 50,
    },
  },
  numberPostsForLastSection: 5, // number of posts for Home page "Last posts" section
  numberPostsForPagination: 6, // number of posts per page for pagination, for Posts page
  numberPostsForPopularSection: 6, // number of posts for Home page "Popular posts" section
} as const
