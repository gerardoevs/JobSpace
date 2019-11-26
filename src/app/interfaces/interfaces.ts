export interface Worker {
    UID: string;
    name: string;
    lastname: string;
    bio: string;
    habilities: string[];
    location: {
        _lat: number,
        _long: number
    };
    payment: number;
    rating: number;
    workdone: number;
    distance_text: string;
    distance_away: number;
}

export interface User {
  UID: string;
  names: string;
  lastnames: string;
  email: string;
  city: string;
  sex: string;
  regDate: string;
  telephone: string;
  type: string;
  img: string;
}

export interface Distance {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: DistanceRow[];
  status: string;
}

export interface DistanceRow {
  elements: DistanceElement[];
}

export interface DistanceElement {
  distance: DistanceValue;
  duration: DistanceValue;
  status: string;
}

export interface DistanceValue {
  text: string;
  value: number;
}
