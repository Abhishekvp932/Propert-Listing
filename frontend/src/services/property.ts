import api from "./api";
import { API_ROUTES } from "@/constants/ApiRoutes";

export const CreateProperty = async (formData: FormData) => {
  try {
    const response = await api.post(API_ROUTES.createProperty, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetUserProperties = async (userId: string) => {
  try {
    const response = await api.get(API_ROUTES.getUserProperties(userId));
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetAllProperties = async () => {
  try {
    const response = await api.get(API_ROUTES.getAllProperties);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetSingleProperty = async (propertyId: string) => {
  try {
    const response = await api.get(API_ROUTES.getSingleProperty(propertyId));

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DeleteProperty = async (propertyId: string) => {
  try {
    const response = await api.delete(API_ROUTES.deleteProperty(propertyId));
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
