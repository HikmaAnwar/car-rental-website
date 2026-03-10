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
export interface CreateCarData {
    createCar: Car;
}

export interface DeleteCarData {
    deleteCar: boolean;
}

export interface UpdateCarData {
    updateCar: Car;
}
