export const constants = {
  initializationLoaderCoordinates: {
    desktop: {
      position: [0.2, -3.0, 5.4],
      rotation: [5.2, 0, 2.2],
      scale: 33,
    },
    mobile: {
      position: [-0.6, -1.6, 5.4],
      rotation: [5.2, 0, 2.2],
      scale: 21,
    },
  },
  maxContentWidth: 1248, // in px
  mobileWidth: 576, // in px
  numberPostsForLastSection: 5, // number of posts for Home page "Last posts" section
  numberPostsForPagination: 6, // number of posts per page for pagination, for Posts page
  numberPostsForPopularSection: 6, // number of posts for Home page "Popular posts" section
} as const
