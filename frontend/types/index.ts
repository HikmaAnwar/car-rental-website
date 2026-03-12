export interface Car {
    id: string;
    name: string;
    brand: string;
    pricePerDay: number;
    available: boolean;
    imageUrl?: string;
}

export interface GetCarsData {
    cars: Car[];
}
