import { gql } from '@apollo/client';

export const GET_CARS = gql`
  query GetCars {
    cars {
      id
      name
      brand
      pricePerDay
      available
      imageUrl
    }
  }
`;

export const CREATE_CAR = gql`
  mutation CreateCar($name: String!, $brand: String!, $pricePerDay: Float!, $imageUrl: String) {
    createCar(name: $name, brand: $brand, pricePerDay: $pricePerDay, imageUrl: $imageUrl) {
      id
      name
      brand
      pricePerDay
      available
      imageUrl
    }
  }
`;

export const DELETE_CAR = gql`  
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id)
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: ID!, $name: String, $brand: String, $pricePerDay: Float, $available: Boolean, $imageUrl: String) {
    updateCar(id: $id, name: $name, brand: $brand, pricePerDay: $pricePerDay, available: $available, imageUrl: $imageUrl) {
      id
      name
      brand
      pricePerDay
      available
      imageUrl
    }
  }
`;
