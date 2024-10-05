export const constants = {
  avatarCoordinates: {
    desktop: {
      position: [0, -1, 0],
      rotation: [0, 1.4, 0],
      scale: 6.5,
    },
    mobile: {
      position: [0, -1, 0],
      rotation: [-0.1, 1.4, 0],
      scale: 6.5,
    },
  },
  initializationLoaderCoordinates: {
    desktop: {
      position: [-8, -3, 0],
      rotation: [5, 6.52, 0],
      scale: 35,
    },
    mobile: {
      position: [-10.5, -2, 0],
      rotation: [5, 6.34, 0],
      scale: 30,
    },
  },
  maxContentWidth: 1248, // in px
  mobileWidth: 576, // in px
  numberPostsForLastSection: 5, // number of posts for Home page "Last posts" section
  numberPostsForPagination: 6, // number of posts per page for pagination, for Posts page
  numberPostsForPopularSection: 6, // number of posts for Home page "Popular posts" section
} as const
