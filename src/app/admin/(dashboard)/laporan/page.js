'use client'

import { Table } from '@mantine/core'
import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { currencyFormat } from '@/helpers/utils'
import { StatsGrid } from '@/components/admin/StatsGrid/StatsGrid'
import { IconReceipt2, IconCoin, IconShoppingCart } from '@tabler/icons-react'
import { useState, useEffect } from 'react'

export default function Page() {
  const { data, isLoading, error } = useSWR('/transactions/report', fetcherSWR)
  const [reports, setReports] = useState([])

  useEffect(() => {
    if (data) {
      setReports([
        {
          title: 'Jumlah Transaksi',
          icon: IconReceipt2,
          value: data.data.transaction_count,
          color: 'red',
        },
        {
          title: 'Total Transaksi',
          icon: IconCoin,
          value: currencyFormat(data.data.transaction_total),
          color: 'green',
        },
        {
          title: 'Produk Terjual',
          icon: IconShoppingCart,
          value: data.data.product_sold,
          color: 'blue',
        },
      ])
    }
  }, [data])

  const rows =
    data?.data.products.map((item, key) => (
      <Table.Tr key={key}>
        <Table.Td>
          <div className="w-24 h-20 mb-2">
            <img
              src={item.image_url}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{currencyFormat(item.price)}</Table.Td>
        <Table.Td>{item.order_count || 0}</Table.Td>
        <Table.Td>{currencyFormat(item.price * item.order_count)}</Table.Td>
      </Table.Tr>
    )) ?? []

  return (
    <>
      <h1 className="font-bold text-xl pb-4 border-b">Laporan</h1>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : !data?.data.products.length ? (
        'Tidak ada data'
      ) : (
        <div>
          <StatsGrid data={reports} />
          <h2 className="font-bold mt-4">Laporan Produk</h2>
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="w-1/5">Foto</Table.Th>
                <Table.Th className="w-1/5">Produk</Table.Th>
                <Table.Th className="w-1/5">Harga</Table.Th>
                <Table.Th className="w-1/5">Terjual</Table.Th>
                <Table.Th className="w-1/5">Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      )}
    </>
  )
}
