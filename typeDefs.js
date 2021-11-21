const typeDefs = `
  type Query {
    tracks: [Track]
    videos: [Video]
    images: [Image]
    feed: [FeedItem!]!
  }

  union FeedItem = Track | Video | Image

  type Track {
    duration: Int
    format: TrackFormat
  }

  type Video {
    length: Int
    format: VideoFormat
  }

  type Image {
    width: Int
    height: Int
    format: ImageFormat
  }

  enum TrackFormat {
    WAV
    MP3
    AAC
  }

  enum VideoFormat {
    AVI
    MP4
    M4V
  }

  enum ImageFormat {
    PNG
    JPG
    TIFF
  }
`;

module.exports = typeDefs;
