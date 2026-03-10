import { gql } from '@apollo/client';

export const GET_CARS = gql`
  query GetCars {
    cars {
      id
      name
      brand
      pricePerDay
      available
    }
  }
`;

export const CREATE_CAR = gql`
  mutation CreateCar($name: String!, $brand: String!, $pricePerDay: Float!) {
    createCar(name: $name, brand: $brand, pricePerDay: $pricePerDay) {
      id
      name
      brand
      pricePerDay
      available
    }
  }
`;

export const DELETE_CAR = gql`  
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id)
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: ID!, $name: String, $brand: String, $pricePerDay: Float, $available: Boolean) {
    updateCar(id: $id, name: $name, brand: $brand, pricePerDay: $pricePerDay, available: $available) {
      id
      name
      brand
      pricePerDay
      available
    }
  }
`;
