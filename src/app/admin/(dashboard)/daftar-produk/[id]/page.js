'use client'

import {
  TextInput,
  FileInput,
  NumberInput,
  Select,
  Radio,
  Group,
  Button,
} from '@mantine/core'
import { useForm, isNotEmpty } from '@mantine/form'
import useSWR from 'swr'
import { fetcher, fetcherSWR } from '@/helpers/fetcher'
import { useRouter } from 'next/navigation'
import { Notification } from '@/components/Notification'
import { useEffect } from 'react'

export default function Page({ params }) {
  const router = useRouter()
  const { data } = useSWR('/categories', fetcherSWR)
  const { data: dataProduct } = useSWR(`/products/${params.id}`, fetcherSWR)

  const form = useForm({
    initialValues: {
      name: '',
      image: null,
      price: '',
      category_id: 1,
      status: '',
    },

    validate: {
      name: isNotEmpty('Nama tidak boleh kosong'),
      price: isNotEmpty('Harga tidak boleh kosong'),
      category_id: isNotEmpty('Kategori tidak boleh kosong'),
      status: isNotEmpty('Status tidak boleh kosong'),
    },
  })

  useEffect(() => {
    form.setValues({
      name: dataProduct?.data.name || '',
      price: dataProduct?.data.price || '',
      category_id: String(dataProduct?.data.category_id) || '',
      status: String(dataProduct?.data.status) || '',
    })
  }, [dataProduct])

  const handleSubmit = async () => {
    form.validate()
    if (!form.isValid()) return

    try {
      const formData = new FormData()
      for (const [key, value] of Object.entries(form.values)) {
        formData.append(key, value)
      }
      await fetcher.patch(`/products/${params.id}`, formData)
      Notification({
        type: 'success',
        title: 'Produk berhasil diubah',
      })
      router.push('/admin/daftar-produk')
    } catch (err) {
      Notification({
        type: 'error',
        title: 'Produk gagal diubah',
        message: err.response.data.message,
      })
    }
  }

  const handleDelete = async () => {
    try {
      await fetcher.delete(`/products/${params.id}`)
      Notification({
        type: 'success',
        title: 'Produk berhasil dihapus',
      })
      router.push('/admin/daftar-produk')
    } catch (err) {
      Notification({
        type: 'error',
        title: 'Produk gagal dihapus',
        message: err.response.data.message,
      })
    }
  }

  return (
    <>
      <h1 className="font-bold text-xl pb-4 border-b">Ubah Produk</h1>
      <form
        encType="multipart/form-data"
        onSubmit={form.onSubmit(handleSubmit)}
        className="max-w-lg flex flex-col gap-4 mt-4"
      >
        <Button onClick={handleDelete} variant="outline" color="red">
          Hapus Produk
        </Button>
        <TextInput
          label="Nama Produk"
          placeholder="Masukkan nama produk"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <FileInput
          label="Gambar Produk"
          placeholder="Masukkan gambar produk"
          withAsterisk
          {...form.getInputProps('image')}
        />
        {form.values.image !== null ? (
          <div className="w-40 h-36">
            <img
              src={URL.createObjectURL(form.values.image)}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ) : (
          <div className="w-40 h-36">
            <img
              src={dataProduct?.data.image_url || ''}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )}
        <NumberInput
          label="Harga Produk"
          placeholder="Masukkan harga produk"
          hideControls
          min={0}
          withAsterisk
          {...form.getInputProps('price')}
        />
        <Select
          label="Kategori Produk"
          placeholder="Masukkan kategori produk"
          data={
            data?.data.map((item) => ({
              value: String(item.id),
              label: item.name,
            })) ?? []
          }
          withAsterisk
          {...form.getInputProps('category_id')}
        />
        <Radio.Group
          name="status"
          label="Status"
          withAsterisk
          {...form.getInputProps('status')}
        >
          <Group>
            <Radio value="1" label="Tersedia" />
            <Radio value="0" label="Tidak Tersedia" />
          </Group>
        </Radio.Group>
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </form>
    </>
  )
}
