import client from '@/lib/apollo-client';
import { GET_CARS, CREATE_CAR, DELETE_CAR, UPDATE_CAR } from '@/lib/graphql-queries';
import { Car, GetCarsData, CreateCarData, DeleteCarData, UpdateCarData } from '@/types';

export const fleetService = {
    // Fetch all cars
    async getCars(): Promise<Car[]> {
        const { data } = await client.query<GetCarsData>({
            query: GET_CARS,
            fetchPolicy: 'no-cache',
        });
        return data?.cars || [];
    },

    // Add a new car
    async addCar(name: string, brand: string, price: number): Promise<Car> {
        const { data } = await client.mutate<CreateCarData>({
            mutation: CREATE_CAR,
            variables: {
                name,
                brand,
                pricePerDay: price,
            },
        });

        if (!data?.createCar) throw new Error("Failed to create car");
        return data.createCar;
    },

    async deleteCar(id: string): Promise<boolean> {
        const { data } = await client.mutate<DeleteCarData>({
            mutation: DELETE_CAR,
            variables: { id },
        });
        return !!data?.deleteCar;
    },

    async updateCar(id: string, updates: Partial<Car>): Promise<Car> {
        const { data } = await client.mutate<UpdateCarData>({
            mutation: UPDATE_CAR,
            variables: {
                id,
                name: updates.name,
                brand: updates.brand,
                pricePerDay: updates.pricePerDay,
                available: updates.available,
            },
        });
        if (!data?.updateCar) throw new Error("Failed to update car");
        return data.updateCar;
    }
};
