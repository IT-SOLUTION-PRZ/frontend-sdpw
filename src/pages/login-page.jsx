import { Fish, LogIn, ShieldCheck, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthForms } from "@/hooks/use-auth-forms"

const loginFields = [
  {
    id: "login-email",
    name: "email",
    label: "Login lub adres e-mail",
    type: "text",
    placeholder: "jan.kowalski lub jan@example.com",
    autoComplete: "username",
  },
  {
    id: "login-password",
    name: "password",
    label: "Hasło",
    type: "password",
    placeholder: "Wpisz hasło",
    autoComplete: "current-password",
  },
]

const registerFields = [
  {
    id: "register-username",
    name: "username",
    label: "Nazwa użytkownika",
    type: "text",
    placeholder: "janwedkarz",
    autoComplete: "username",
  },
  {
    id: "register-email",
    name: "email",
    label: "Adres e-mail",
    type: "email",
    placeholder: "jan@example.com",
    autoComplete: "email",
  },
  {
    id: "register-password",
    name: "password",
    label: "Hasło",
    type: "password",
    placeholder: "Utwórz hasło",
    autoComplete: "new-password",
  },
  {
    id: "register-confirm-password",
    name: "confirmPassword",
    label: "Powtórz hasło",
    type: "password",
    placeholder: "Powtórz hasło",
    autoComplete: "new-password",
  },
]

const AuthField = ({ field, errorMessage, register }) => (
  <div className="space-y-2">
    <Label className="type-caption text-slate-700" htmlFor={field.id}>
      {field.label}
    </Label>
    <Input
      id={field.id}
      name={field.id}
      type={field.type}
      placeholder={field.placeholder}
      autoComplete={field.autoComplete}
      aria-invalid={Boolean(errorMessage)}
      aria-describedby={errorMessage ? `${field.id}-error` : undefined}
      className="type-body h-12 border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400"
      {...register(field.name)}
    />
    {errorMessage ? (
      <p id={`${field.id}-error`} role="alert" className="type-caption font-medium text-red-600">
        {errorMessage}
      </p>
    ) : null}
  </div>
)

export function LoginPage() {
  const {
    loginForm,
    registerForm,
    loginError,
    registerError,
    loginSubmitting,
    registerSubmitting,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleTabChange,
  } = useAuthForms()

  return (
    <main className="min-h-screen bg-[#ecf3f7] px-4 py-10">
      <div className="mx-auto flex w-full max-w-190 flex-col gap-8">
        <section className="mx-auto flex w-full max-w-130 flex-col items-center gap-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-indigo-100 p-3 shadow-sm sm:size-20">
            <img src="/logo.png" alt="Logo aplikacji" className="size-11 object-contain sm:size-14" />
          </span>

          <div className="space-y-3">
            <p className="type-caption mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 font-semibold text-slate-600 shadow-sm">
              <ShieldCheck className="size-4 text-slate-700" />
              Panel użytkownika
            </p>
            <h1 className="type-display text-balance text-slate-900">Zaloguj się do aplikacji</h1>
            <p className="type-body text-balance text-slate-500">
              Zapisuj swoje rekomendacje, wracaj do historii połowów i szybciej dobieraj przynętę przy kolejnych
              wyprawach.
            </p>
          </div>
        </section>

        <Card className="mx-auto w-full max-w-130 border-slate-200 bg-white/95 shadow-sm">
          <CardHeader className="space-y-2 pb-4 text-center">
            <CardTitle className="type-title text-slate-900">Twoje konto</CardTitle>
            <CardDescription className="type-body text-slate-500">
              Wybierz logowanie lub utwórz nowe konto.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="gap-6" onValueChange={handleTabChange}>
              <TabsList className="grid h-11 w-full grid-cols-2 bg-slate-100">
                <TabsTrigger value="login" className="type-caption h-full">
                  <LogIn className="size-4" />
                  Logowanie
                </TabsTrigger>
                <TabsTrigger value="register" className="type-caption h-full">
                  <UserPlus className="size-4" />
                  Rejestracja
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form className="space-y-5" noValidate onSubmit={handleLoginSubmit}>
                  {loginError ? (
                    <p role="alert" className="type-caption rounded-md border border-red-200 bg-red-50 px-3 py-2 font-medium text-red-700">
                      {loginError}
                    </p>
                  ) : null}

                  {loginFields.map((field) => (
                    <AuthField
                      key={field.id}
                      field={field}
                      register={loginForm.register}
                      errorMessage={loginForm.formState.errors[field.name]?.message}
                    />
                  ))}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="type-caption rounded-md px-1 font-semibold text-slate-500 outline-none transition-colors hover:text-slate-900 focus-visible:ring-3 focus-visible:ring-ring/50"
                      aria-label="Przypomnij hasło, funkcja dostępna wkrótce"
                    >
                      Nie pamiętasz hasła?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={loginSubmitting}
                    aria-busy={loginSubmitting}
                    className="type-body h-12 w-full bg-[#070224] font-semibold hover:bg-[#161038]"
                  >
                    <Fish className="size-4" />
                    Zaloguj się
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form className="space-y-5" noValidate onSubmit={handleRegisterSubmit}>
                  {registerError ? (
                    <p role="alert" className="type-caption rounded-md border border-red-200 bg-red-50 px-3 py-2 font-medium text-red-700">
                      {registerError}
                    </p>
                  ) : null}

                  {registerFields.map((field) => (
                    <AuthField
                      key={field.id}
                      field={field}
                      register={registerForm.register}
                      errorMessage={registerForm.formState.errors[field.name]?.message}
                    />
                  ))}

                  <Button
                    type="submit"
                    disabled={registerSubmitting}
                    aria-busy={registerSubmitting}
                    className="type-body h-12 w-full bg-[#070224] font-semibold hover:bg-[#161038]"
                  >
                    <UserPlus className="size-4" />
                    Utwórz konto
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
