const tracks = [
  {
    duration: 100,
    format: "WAV",
  },
];

const videos = [
  {
    length: 5000,
    format: "M4V",
  },
];

const images = [
  {
    width: 1920,
    height: 1080,
    format: "PNG",
  },
];

const resolvers = {
  Query: {
    tracks: () => tracks,
    videos: () => videos,
    images: () => images,
    feed: () => [
      ...tracks,
      ...videos,
      ...images,
      {
        width: 500,
        height: 350,
        format: "TIFF",
      },
    ],
  },
  FeedItem: {
    __resolveType: (object) => {
      if (object.duration) {
        return "Track";
      }
      if (object.length) {
        return "Video";
      }
      if (object.width) {
        return "Image";
      }
      return null;
    },
  },
};

module.exports = resolvers;
