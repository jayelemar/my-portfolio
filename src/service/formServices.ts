import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type FormDataType = {
  name: string,
  email: string,
  message: string,
}

const formSubmit = async (values: FormDataType) => {
  try {

    await new Promise(resolve => setTimeout(resolve, 2000))
    const backendAPI = process.env.NEXT_PUBLIC_BACKEND_API;
    
    if (!backendAPI) {
      console.error('Backend URL is undefined');
    } else {
      const response = await axios.post(backendAPI, values)
      return response.data
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error
  }
};

export const useFormSubmit = () => {
  return useMutation({
    mutationKey: ['formData'],
    mutationFn: formSubmit
  })
};