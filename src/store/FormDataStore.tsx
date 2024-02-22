import { create } from 'zustand';

interface User {

}

interface FormData {
  name: string,
  email: string,
  message: string,
}

export const useFormDataStore = create<FormData>(() => ({
  name: "",
  email: "",
  message: "",
}))