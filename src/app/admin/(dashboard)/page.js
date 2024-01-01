'use client'

import useSWR from 'swr'
import { fetcherSWR } from '@/helpers/fetcher'
import { currencyFormat } from '@/helpers/utils'
import { StatsGrid } from '@/components/admin/StatsGrid/StatsGrid'
import { useMemo } from 'react'
import {
  IconReceipt2,
  IconCoin,
  IconShoppingCart,
  IconHourglassEmpty,
  IconCircleCheck,
  IconPackage,
  IconPackageExport,
  IconPackageOff,
} from '@tabler/icons-react'

export default function Page() {
  const { data, isLoading, error } = useSWR(
    '/transactions/report?summary=true',
    fetcherSWR,
  )

  return (
    <>
      <h1 className="font-bold text-xl pb-4 border-b">Dashboard</h1>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error'
      ) : (
        <>
          <TransactionDashboard data={data?.data} />
          <ProductDashboard data={data?.data} />
        </>
      )}
    </>
  )
}

function TransactionDashboard({ data }) {
  const reports = useMemo(
    () =>
      data
        ? [
            {
              title: 'Transaksi Aktif',
              icon: IconHourglassEmpty,
              value: data.transaction_active,
              color: 'red',
            },
            {
              title: 'Transaksi Selesai',
              icon: IconCircleCheck,
              value: data.transaction_done,
              color: 'green',
            },
            {
              title: 'Jumlah Transaksi',
              icon: IconReceipt2,
              value: data.transaction_count,
              color: 'blue',
            },
            {
              title: 'Total Transaksi',
              icon: IconCoin,
              value: currencyFormat(data.transaction_total),
              color: 'orange',
            },
          ]
        : [],
    [data],
  )

  return (
    <>
      <h2 className="font-bold mt-4">Transaksi</h2>
      <StatsGrid data={reports} />
    </>
  )
}

function ProductDashboard({ data }) {
  const reports = useMemo(
    () =>
      data
        ? [
            {
              title: 'Produk Terjual',
              icon: IconShoppingCart,
              value: data.product_sold,
              color: 'red',
            },
            {
              title: 'Jumlah Produk',
              icon: IconPackage,
              value: data.product_count,
              color: 'green',
            },
            {
              title: 'Produk Tersedia',
              icon: IconPackageExport,
              value: data.product_active,
              color: 'blue',
            },
            {
              title: 'Produk Tidak Tersedia',
              icon: IconPackageOff,
              value: data.product_inactive,
              color: 'orange',
            },
          ]
        : [],
    [data],
  )

  return (
    <>
      <h2 className="font-bold mt-4">Produk</h2>
      <StatsGrid data={reports} />
    </>
  )
}
