'use client'

import { TextInput, Button, PasswordInput } from '@mantine/core'
import { useForm, isNotEmpty } from '@mantine/form'
import { fetcher } from '@/helpers/fetcher'
import { setToken } from '@/helpers/tokenManager'

export default function Page() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: isNotEmpty('Username harus diisi'),
      password: isNotEmpty('Password harus diisi'),
    },
  })

  const handleOnSubmit = async () => {
    form.validate()
    if (!form.isValid()) return

    try {
      const reqLogin = await fetcher.post('/login', form.values)
      setToken(reqLogin.data.token)
      location.replace('/admin')
    } catch (err) {}
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto w-96 rounded shadow-md px-8 py-16">
        <form
          onSubmit={form.onSubmit(handleOnSubmit)}
          className="flex flex-col gap-2"
        >
          <h1 className="font-bold text-center text-2xl mb-2">
            Dapur Bunda Bahagia
          </h1>
          <TextInput
            label="Username"
            placeholder="Masukkan username"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Masukkan password"
            {...form.getInputProps('password')}
          />
          <Button type="submit" variant="outline" className="mt-2">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
