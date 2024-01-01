'use client'

import useSWR from 'swr'
import { fetcherSWR, fetcher } from '@/helpers/fetcher'
import { currencyFormat } from '@/helpers/utils'
import { Button, Select } from '@mantine/core'
import { addToCart } from '@/helpers/cartManager'
import { useState, useEffect } from 'react'

export default function Page() {
  const [category, setCategory] = useState('0')
  const { data, isLoading, error, mutate } = useSWR(
    category === '0' ? '/products' : `/products?category=${category}`,
    fetcherSWR,
  )
  const { data: categories } = useSWR('/categories', fetcherSWR)

  useEffect(() => {
    mutate()
  }, [category])

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      count: 1,
    })
  }

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : (
        <div>
          <div className="fixed -ml-4 px-4 py-4 w-full max-w-md top-0 z-10 bg-white">
            <Select
              placeholder="Pilih kategori"
              value={category}
              onChange={setCategory}
              allowDeselect={false}
              data={
                [
                  {
                    value: '0',
                    label: 'Semua',
                  },
                  ...categories?.data.map((item) => ({
                    value: String(item.id),
                    label: item.name,
                  })),
                ] ?? []
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data?.data.map((item, key) => (
              <div key={key}>
                <div className="w-full h-40 mb-2">
                  <img
                    src={item.image_url}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <h1 className="font-bold">{item.name}</h1>
                <h2>{currencyFormat(item.price)}</h2>
                <Button
                  onClick={() => handleAddToCart(item)}
                  variant="outline"
                  color="teal"
                  radius="xl"
                  fullWidth
                  disabled={!item.status}
                >
                  {item.status ? 'Tambah' : 'Tidak Tersedia'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
