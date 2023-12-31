'use client'

import { ScrollArea } from '@mantine/core'
import {
  IconGauge,
  IconClipboardList,
  IconToolsKitchen,
  IconLogout,
} from '@tabler/icons-react'
import { LinksGroup } from '@/components/admin/NavbarLinksGroup/NavbarLinksGroup'
import classes from './NavbarNested.module.css'
import { clearToken } from '@/helpers/tokenManager'

const mockdata = [
  {
    label: 'Dashboard',
    icon: IconGauge,
    initiallyOpened: true,
    links: [{ label: 'Dashboard', link: '/admin' }],
  },
  {
    label: 'Transaksi',
    icon: IconClipboardList,
    initiallyOpened: true,
    links: [
      { label: 'Daftar Transaksi', link: '/admin/daftar-transaksi' },
      { label: 'Laporan', link: '/admin/laporan' },
    ],
  },
  {
    label: 'Produk',
    icon: IconToolsKitchen,
    initiallyOpened: true,
    links: [
      { label: 'Daftar Produk', link: '/admin/daftar-produk' },
      { label: 'Tambah Produk', link: '/admin/tambah-produk' },
    ],
  },
]

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  const handleLogout = () => {
    clearToken()
    location.replace('/admin/login')
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <h1 className="text-center font-bold text-xl">Dapur Bunda Bahagia</h1>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <button
          onClick={handleLogout}
          className="px-8 py-4 w-full hover:bg-slate-100"
        >
          <div className="flex">
            <IconLogout />
            <span className="ml-4">Logout</span>
          </div>
        </button>
      </div>
    </nav>
  )
}
