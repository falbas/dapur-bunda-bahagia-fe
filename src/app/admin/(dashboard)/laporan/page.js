'use client'

import { Table, Button } from '@mantine/core'
import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { dateFormat, currencyFormat } from '@/helpers/utils'
import { StatsGrid } from '@/components/admin/StatsGrid/StatsGrid'

export default function Page() {
  const { data, isLoading, error } = useSWR('/transactions/report', fetcherSWR)

  const rows =
    data?.data.products.map((item, key) => (
      <Table.Tr key={key}>
        <Table.Td>
          <div className="w-24 h-20 mb-2">
            <img
              src={item.product_image_url}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </Table.Td>
        <Table.Td>{item.product_name}</Table.Td>
        <Table.Td>{currencyFormat(item.product_price)}</Table.Td>
        <Table.Td>{item.order_count}</Table.Td>
        <Table.Td>{currencyFormat(item.total)}</Table.Td>
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
          <StatsGrid
            reportData={{
              transaction_count: data?.data.transaction_count,
              transaction_total: data?.data.transaction_total,
              product_sold: data?.data.product_sold,
            }}
          />
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
