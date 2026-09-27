export interface UnsplashImage {
  id: string;
  alt: string;
  urls: {
    full: string;
    thumb: string;
  };
}

export const defaultImages: UnsplashImage[] = [
  {
    id: "1",
    alt: "Mountain landscape",
    urls: {
      full: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
      thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
    },
  },
  {
    id: "2",
    alt: "Forest road",
    urls: {
      full: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
      thumb: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    },
  },
  {
    id: "3",
    alt: "City skyline",
    urls: {
      full: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
      thumb: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400",
    },
  },
  {
    id: "4",
    alt: "Ocean waves",
    urls: {
      full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
      thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    },
  },
  {
    id: "5",
    alt: "Desert dunes",
    urls: {
      full: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
      thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
    },
  },
  {
    id: "6",
    alt: "Snow mountains",
    urls: {
      full: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200",
      thumb: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=400",
    },
  },
  {
    id: "7",
    alt: "Lake reflection",
    urls: {
      full: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200",
      thumb: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400",
    },
  },
  {
    id: "8",
    alt: "Sunset beach",
    urls: {
      full: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200",
      thumb: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400",
    },
  },
  {
    id: "9",
    alt: "Night city",
    urls: {
      full: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200",
      thumb: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400",
    },
  },
];