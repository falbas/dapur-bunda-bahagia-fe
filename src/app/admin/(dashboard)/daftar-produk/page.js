'use client'

import { Table, Button, Box } from '@mantine/core'
import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { currencyFormat } from '@/helpers/utils'
import {
  PRODUCT_STATUS_KEY,
  PRODUCT_COLOR_STATUS_KEY,
} from '@/constans/constans'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const { data, isLoading, error } = useSWR('/products', fetcherSWR)

  const rows =
    data?.data.map((item, key) => (
      <Table.Tr key={key}>
        <Table.Td>
          <div className="w-28 h-24 mb-2">
            <img
              src={item.image_url}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.category}</Table.Td>
        <Table.Td>{currencyFormat(item.price)}</Table.Td>
        <Table.Td>
          <StatusBadge status={item.status} />
        </Table.Td>
        <Table.Td>
          <ButtonAction
            onClick={() => router.push(`/admin/daftar-produk/${item.id}`)}
          />
        </Table.Td>
      </Table.Tr>
    )) ?? []

  return (
    <>
      <h1 className="font-bold text-xl pb-4 border-b">Daftar Produk</h1>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : (
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="w-2/12">Foto</Table.Th>
              <Table.Th className="w-2/12">Produk</Table.Th>
              <Table.Th className="w-2/12">Kategori</Table.Th>
              <Table.Th className="w-2/12">Harga</Table.Th>
              <Table.Th className="w-2/12">Status</Table.Th>
              <Table.Th className="w-2/12">Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}
    </>
  )
}

function ButtonAction({ onClick }) {
  return (
    <>
      <Button onClick={onClick} variant="outline" color="blue" fullWidth>
        Edit
      </Button>
    </>
  )
}

function StatusBadge({ status }) {
  return (
    <>
      <Box
        bg={PRODUCT_COLOR_STATUS_KEY[status]}
        style={{
          borderRadius: '0.25rem',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {PRODUCT_STATUS_KEY[status]}
      </Box>
    </>
  )
}
