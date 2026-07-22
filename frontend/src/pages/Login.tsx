import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../components/Button'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-700 to-primary-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary-700">FAZ TRACK</h1>
          <p className="mt-2 text-gray-600">Gestion de Transport</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="votre@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Mot de passe</label>
            <input
              type="password"
              {...register('password')}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-sm text-primary-700 hover:underline">
              Mot de passe oublié?
            </a>
          </div>

          {/* Submit button */}
          <Button type="submit" size="lg" className="w-full">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
