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
  initializationLoaderCoordinates: {
    desktop: {
      position: [-0, 0, 0],
      rotation: [0, -0.5, 0],
      scale: 20,
    },
    mobile: {
      position: [-0, 0, 0],
      rotation: [0, -0.5, 0],
      scale: 10,
    },
  },
  linearLoaderCoordinates: {
    desktop: {
      position: [-2, -7, 0],
      rotation: [5, 6.45, 0],
      scale: 60,
    },
    mobile: {
      position: [-3, -7, 0],
      rotation: [5, 6.45, 0],
      scale: 65,
    },
  },
  maxContentWidth: 1248, // in px
  mobileWidth: 576, // in px
  numberPostsForLastSection: 5, // number of posts for Home page "Last posts" section
  numberPostsForPagination: 6, // number of posts per page for pagination, for Posts page
  numberPostsForPopularSection: 6, // number of posts for Home page "Popular posts" section
} as const
