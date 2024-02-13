import { object, ref, string } from "yup";

export const signUpSchema = object().shape({
  email: string()
    .required("Indique una direccion de correo")
    .email("Formato no valido"),
  password: string()
    .required("Indique una contraseña")
    .min(6, "Debe contener al menos 6 caracteres"),
  confirmPassword: string()
    .oneOf([ref('password'), null], "Las contraseñas deben ser iguales")
    .required("Confirme la contraseña")
})


export const loginSchema = object().shape({
  email: string()
  .required("Indique una direccion de correo")
  .email("Formato no valido"),
  password: string()
})