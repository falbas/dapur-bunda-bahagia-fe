'use client'

import useSWR from 'swr'
import { fetcherSWR, fetcher } from '@/helpers/fetcher'
import { currencyFormat, dateFormat } from '@/helpers/utils'
import { Box, Button } from '@mantine/core'
import {
  BUTTON_STATUS_KEY,
  STATUS_KEY,
  COLOR_STATUS_KEY,
} from '@/constans/constans'

export default function Page({ params }) {
  const { data, isLoading, error, mutate } = useSWR(
    `/transactions/${params.id}`,
    fetcherSWR,
  )

  const handleTransaction = async (id, status) => {
    if (status === 0) {
      await fetcher.post(`/transactions/confirm-order/${id}`)
    } else if (status === 1) {
      await fetcher.post(`/transactions/confirm-payment/${id}`)
    } else {
      await fetcher.post(`/transactions/close-transaction/${id}`)
    }
    mutate()
  }

  return (
    <>
      <h1 className="font-bold text-xl pb-4 border-b">Detail Transaksi</h1>
      <div className="max-w-lg flex flex-col gap-4 mt-4">
        {isLoading ? (
          'Loading...'
        ) : error ? (
          error.response.status === 404 ? (
            'Order Tidak Ditemukan'
          ) : (
            'Error'
          )
        ) : (
          <>
            <div className="relative">
              <StatusBadge status={data.data.status} />
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
                  className="grid grid-cols-5 gap-4 items-center mb-2"
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
                  <p className="text-right">
                    {currencyFormat(product.count * product.price)}
                  </p>
                </div>
              ))}
            </div>
            <ButtonConfirm
              onClick={() => handleTransaction(data.data.id, data.data.status)}
              status={data.data.status}
            />
          </>
        )}
      </div>
    </>
  )
}

function ButtonConfirm({ status, onClick }) {
  return (
    <>
      <Button
        onClick={onClick}
        variant="outline"
        color={COLOR_STATUS_KEY[status]}
        fullWidth
      >
        {BUTTON_STATUS_KEY[status]}
      </Button>
    </>
  )
}

function StatusBadge({ status }) {
  return (
    <>
      <Box
        bg={COLOR_STATUS_KEY[status]}
        px="xs"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          borderRadius: '0.25rem',
          color: 'white',
        }}
      >
        {STATUS_KEY[status]}
      </Box>
    </>
  )
}
