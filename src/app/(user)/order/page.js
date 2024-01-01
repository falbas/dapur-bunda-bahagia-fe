'use client'

import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { STATUS_KEY, COLOR_STATUS_KEY } from '@/constans/constans'
import { Box } from '@mantine/core'
import { currencyFormat, dateFormat } from '@/helpers/utils'
import { getSession } from '@/helpers/sessionManager'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export default function Page() {
  const [detail, setDetail] = useState(-1)
  const { data, isLoading, error } = useSWR(
    `/transactions?session=${getSession()}`,
    fetcherSWR,
  )

  const handleOpenDetail = (id) => {
    setDetail(id)
  }

  if (detail !== -1) {
    return <Detail id={detail} handler={handleOpenDetail} />
  }

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : (
        <>
          <div className="flex relative h-8 mb-2">
            <h1 className="m-auto font-bold text-xl">Daftar Pesanan</h1>
          </div>
          {!data?.data.length ? (
            <p className="text-center">Pesanan Kosong</p>
          ) : (
            data?.data.map((item, key) => (
              <div key={key} className="mb-4 border-b">
                <div
                  onClick={() => handleOpenDetail(item.id)}
                  className="relative cursor-pointer"
                >
                  <StatusBadge status={item.status} />
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
                <div className="mt-2">
                  {item.products.map((product, key) => (
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
                      <p className="text-right">
                        {currencyFormat(product.price)}
                      </p>
                      <p className="text-right">
                        {currencyFormat(product.count * product.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </>
  )
}

function Detail({ id, handler }) {
  const { data, isLoading, error } = useSWR(
    `/transactions/${id}?session=${getSession()}`,
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
        <>
          <div className="flex relative h-8 mb-2">
            <button onClick={() => handler(-1)} className="absolute left-0">
              <IoIosArrowBack className="m-auto w-8 h-8" />
            </button>
            <h1 className="m-auto font-bold text-xl">Detail Order</h1>
          </div>
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
        </>
      )}
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
