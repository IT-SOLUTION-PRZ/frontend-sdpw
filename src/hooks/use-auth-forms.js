import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { API_BASE_URL } from "@/lib/api-config"
import { setTokens } from "@/lib/auth-storage"
import { formatApiError } from "@/lib/format-api-error"

const AUTH_TOKEN_URL = `${API_BASE_URL}/api/v1/auth/token/`
const AUTH_REGISTER_URL = `${API_BASE_URL}/api/v1/auth/register/`

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

const parseJson = async (response) => response.json().catch(() => ({}))

export const useAuthForms = () => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const [loginSubmitting, setLoginSubmitting] = useState(false)
  const [registerSubmitting, setRegisterSubmitting] = useState(false)

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
    setLoginError("")
    setRegisterError("")
  }

  const handleLoginSubmit = loginForm.handleSubmit(async (data) => {
    setLoginError("")
    setLoginSubmitting(true)

    try {
      const response = await fetch(AUTH_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })
      const result = await parseJson(response)

      if (!response.ok) {
        setLoginError(formatApiError(result))
        return
      }

      if (result.access && result.refresh) {
        setTokens(result.access, result.refresh)
      }

      loginForm.reset()
      navigate("/")
    } catch {
      setLoginError("Nie udało się połączyć z serwerem.")
    } finally {
      setLoginSubmitting(false)
    }
  })

  const handleRegisterSubmit = registerForm.handleSubmit(async (data) => {
    setRegisterError("")
    setRegisterSubmitting(true)

    try {
      const response = await fetch(AUTH_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      })
      const result = await parseJson(response)

      if (!response.ok) {
        setRegisterError(formatApiError(result))
        return
      }

      if (result.access && result.refresh) {
        setTokens(result.access, result.refresh)
      }

      registerForm.reset()
      navigate("/")
    } catch {
      setRegisterError("Nie udało się połączyć z serwerem.")
    } finally {
      setRegisterSubmitting(false)
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
