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
}
