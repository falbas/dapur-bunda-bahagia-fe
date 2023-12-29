'use client'

import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { currencyFormat } from '@/helpers/utils'
import { Button } from '@mantine/core'
import { addToCart } from '@/helpers/cartManager'

export default function Home() {
  const { data, isLoading, error } = useSWR('/products', fetcherSWR)

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
              >
                Tambah
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
