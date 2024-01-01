'use client'

import { Table, Button, Box, LoadingOverlay } from '@mantine/core'
import useSWR from 'swr'
import { fetcherSWR, fetcher } from '@/helpers/fetcher'
import { dateFormat, currencyFormat } from '@/helpers/utils'
import {
  BUTTON_STATUS_KEY,
  STATUS_KEY,
  COLOR_STATUS_KEY,
} from '@/constans/constans'
import { useState, createContext, useContext, useEffect } from 'react'
import Link from 'next/link'

const TransactionContext = createContext()

export default function Page() {
  const [refresh, setRefresh] = useState(false)

  return (
    <TransactionContext.Provider value={{ refresh, setRefresh }}>
      <div>
        {refresh && (
          <div className="fixed top-0 left-[rem(300px)] h-screen w-[calc(100%-rem(300px))] z-10">
            <div className="relative w-full h-full">
              <LoadingOverlay
                visible={refresh}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
              />
            </div>
          </div>
        )}
        <h1 className="font-bold text-xl pb-4 border-b">Daftar Transaksi</h1>
        <ActiveTransaction />
        <CompletedTransaction />
      </div>
    </TransactionContext.Provider>
  )
}

function ActiveTransaction() {
  const { setRefresh } = useContext(TransactionContext)
  const { data, isLoading, error, mutate } = useSWR(
    '/transactions?status=0,1,2',
    fetcherSWR,
  )

  const handleTransaction = async (id, status) => {
    setRefresh(true)
    if (status === 0) {
      await fetcher.post(`/transactions/confirm-order/${id}`)
    } else if (status === 1) {
      await fetcher.post(`/transactions/confirm-payment/${id}`)
    } else {
      await fetcher.post(`/transactions/close-transaction/${id}`)
    }
    setRefresh(false)
    mutate()
  }

  const rows =
    data?.data.map((item, key) => (
      <Table.Tr key={key}>
        <Table.Td>
          <Link href={`/admin/daftar-transaksi/${item.id}`}>
            {dateFormat(item.updated_at)}
          </Link>
        </Table.Td>
        <Table.Td>{item.customer}</Table.Td>
        <Table.Td>{currencyFormat(item.total)}</Table.Td>
        <Table.Td>
          <StatusBadge status={item.status} />
        </Table.Td>
        <Table.Td>
          <ButtonConfirm
            status={item.status}
            onClick={() => handleTransaction(item.id, item.status)}
          />
        </Table.Td>
      </Table.Tr>
    )) ?? []

  return (
    <div className="mt-4">
      <h1 className="font-bold mb-2">Transaksi Aktif</h1>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : !data?.data.length ? (
        'Tidak ada transaksi aktif'
      ) : (
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="w-1/5">Waktu</Table.Th>
              <Table.Th className="w-1/5">Customer</Table.Th>
              <Table.Th className="w-1/5">Total</Table.Th>
              <Table.Th className="w-1/5">Status</Table.Th>
              <Table.Th className="w-1/5">Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}
    </div>
  )
}

function CompletedTransaction() {
  const { refresh } = useContext(TransactionContext)
  const { data, isLoading, error, mutate } = useSWR(
    '/transactions?status=3',
    fetcherSWR,
  )

  useEffect(() => {
    mutate()
  }, [refresh])

  const rows =
    data?.data.map((item, key) => (
      <Table.Tr key={key}>
        <Table.Td>
          <Link href={`/admin/daftar-transaksi/${item.id}`}>
            {dateFormat(item.updated_at)}
          </Link>
        </Table.Td>
        <Table.Td>{item.customer}</Table.Td>
        <Table.Td>{currencyFormat(item.total)}</Table.Td>
        <Table.Td>
          <StatusBadge status={item.status} />
        </Table.Td>
      </Table.Tr>
    )) ?? []

  return (
    <div className="mt-4">
      <h1 className="font-bold mb-2">Transaksi Selesai</h1>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : !data?.data.length ? (
        'Tidak ada transaksi'
      ) : (
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="w-3/12">Waktu</Table.Th>
              <Table.Th className="w-3/12">Customer</Table.Th>
              <Table.Th className="w-3/12">Total</Table.Th>
              <Table.Th className="w-3/12">Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}
    </div>
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
          borderRadius: '0.25rem',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {STATUS_KEY[status]}
      </Box>
    </>
  )
}
