'use client'

import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { STATUS_KEY } from '@/constans/constans'
import { Box } from '@mantine/core'
import { currencyFormat, dateFormat } from '@/helpers/utils'
import Link from 'next/link'
import { getSession } from '@/helpers/sessionManager'

export default function Page() {
  const { data, isLoading, error } = useSWR(
    `/transactions?session=${getSession()}`,
    fetcherSWR,
  )

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : !data?.data.length ? (
        <p className="text-center">Pesanan Kosong</p>
      ) : (
        data?.data.map((item, key) => (
          <div key={key} className="mb-4 border-b">
            <Link href={`/order/${item.id}`}>
              <div className="relative">
                <Box
                  bg={item.status === 3 ? 'green' : 'yellow'}
                  px="xs"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    borderRadius: '0.25rem',
                  }}
                >
                  {STATUS_KEY[item.status]}
                </Box>
                <p>
                  Waktu Pesanan: <b>{dateFormat(item.created_at)}</b>
                </p>
                <p>
                  Atas Nama: <b>{item.customer}</b>
                </p>
                <p>
                  Total: <b>{currencyFormat(item.total)}</b>
                </p>
              </div>
            </Link>
            <div className="mt-2">
              {item.products.map((product, key) => (
                <div
                  key={key}
                  className="grid grid-cols-4 gap-4 items-center mb-2"
                >
                  <div className="w-16 h-16">
                    <img
                      src={product.image_url}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <p>{product.name}</p>
                  <p className="text-right">{product.count}</p>
                  <p className="text-right">{currencyFormat(product.price)}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  )
}
