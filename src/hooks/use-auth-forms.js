import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { useAuthStore } from "@/stores/auth-store"

const loginSchema = z.object({
  email: z.string().min(1, "Podaj adres e-mail").email("Podaj poprawny adres e-mail"),
  password: z.string().min(1, "Podaj hasło"),
})

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "UserName musi mieć co najmniej 3 znaki")
      .max(32, "UserName może mieć maksymalnie 32 znaki"),
    email: z.string().min(1, "Podaj adres e-mail").email("Podaj poprawny adres e-mail"),
    password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
    confirmPassword: z.string().min(1, "Powtórz hasło"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
  })

export const useAuthForms = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const register = useAuthStore((state) => state.register)
  const loginError = useAuthStore((state) => state.loginError)
  const registerError = useAuthStore((state) => state.registerError)
  const loginSubmitting = useAuthStore((state) => state.loginSubmitting)
  const registerSubmitting = useAuthStore((state) => state.registerSubmitting)
  const clearAuthErrors = useAuthStore((state) => state.clearAuthErrors)

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleTabChange = () => {
    clearAuthErrors()
  }

  const handleLoginSubmit = loginForm.handleSubmit(async (data) => {
    const wasLoggedIn = await login(data)
    if (wasLoggedIn) {
      loginForm.reset()
      navigate("/")
    }
  })

  const handleRegisterSubmit = registerForm.handleSubmit(async (data) => {
    const wasRegistered = await register(data)
    if (wasRegistered) {
      registerForm.reset()
      navigate("/")
    }
  })

  return {
    loginForm,
    registerForm,
    loginError,
    registerError,
    loginSubmitting,
    registerSubmitting,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleTabChange,
  }
}
