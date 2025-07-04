export interface Genre {
  _id: string;
  name: string;
}

export interface Movies {
  _id: string;
  title: string;
  numberInStock: number;
  dailyRentalRate: number;
  genre: Genre;
}

export interface MovieData {
  "all-movies": Movies[];
  "filtered-movie": Genre[];
}