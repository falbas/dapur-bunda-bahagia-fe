'use client'

import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { STATUS_KEY } from '@/constans/constans'
import { Box } from '@mantine/core'
import { currencyFormat, dateFormat } from '@/helpers/utils'

export default function Page({ params }) {
  const { data, isLoading, error } = useSWR(
    `/transactions/${params.id}`,
    fetcherSWR,
  )

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        error.response.status === 404 ? (
          'Order Tidak Ditemukan'
        ) : (
          'Error'
        )
      ) : (
        <div>
          <div className="relative">
            <Box
              bg={data.data.status === 3 ? 'green' : 'yellow'}
              px="xs"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                borderRadius: '0.25rem',
              }}
            >
              {STATUS_KEY[data.data.status]}
            </Box>
            <p>
              Waktu Pesanan: <b>{dateFormat(data.data.created_at)}</b>
            </p>
            <p>
              Atas Nama: <b>{data.data.customer}</b>
            </p>
            <p>
              Total: <b>{currencyFormat(data.data.total)}</b>
            </p>
          </div>
          <div className="mt-2">
            {data.data.products.map((product, key) => (
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
      )}
    </>
  )
}
