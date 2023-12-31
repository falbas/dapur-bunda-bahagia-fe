'use client'

import { currencyFormat } from '@/helpers/utils'
import { displayCart, addToCart, clearCart } from '@/helpers/cartManager'
import { useState, useEffect } from 'react'
import { NumberInput } from '@mantine/core'
import { Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { fetcher } from '@/helpers/fetcher'
import { useForm, isNotEmpty } from '@mantine/form'
import Link from 'next/link'
import { setSession, getSession } from '@/helpers/sessionManager'

export default function Page() {
  const [openedOrder, { open: openOrder, close: closeOrder }] =
    useDisclosure(false)
  const [openedSuccess, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false)
  const [cart, setCart] = useState([])

  const form = useForm({
    initialValues: {
      customer: '',
    },

    validate: {
      customer: isNotEmpty('Nama tidak boleh kosong'),
    },
  })

  useEffect(() => {
    setCart(displayCart())
  }, [])

  const handleOrderNow = async () => {
    form.validate()
    if (!form.isValid()) return

    setSession()
    const data = {
      customer: form.values.customer,
      payment_method: 0,
      session: getSession(),
      products: displayCart(),
    }

    const req = await fetcher.post('/transactions', data)
    if (req.status === 201) {
      closeOrder()
      openSuccess()
      clearCart()
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 pb-12">
        {!cart.length ? (
          <p className="text-center">Keranjang Kosong</p>
        ) : (
          cart?.map((item, key) => <CartItem key={key} item={item} />)
        )}
      </div>
      <div className="fixed w-full max-w-md bottom-16 z-10 bg-white">
        <Modal
          opened={openedSuccess}
          onClose={closeSuccess}
          title="Order Sukses"
          centered
        >
          <p>
            Atas Nama: <b>{form.values.customer}</b>
          </p>
          <p>
            Order berhasil dibuat, segera ke kasir untuk melakukan konfirmasi
            order dan pembayaran
          </p>
          <Link href="/order">
            <Button
              variant="outline"
              color="teal"
              radius="xl"
              fullWidth
              className="mt-2"
            >
              Cek Pesanan
            </Button>
          </Link>
        </Modal>
        <Modal
          opened={openedOrder}
          onClose={closeOrder}
          title="Pesan Sekarang"
          centered
        >
          <TextInput
            label="Nama"
            placeholder="Masukkan nama"
            {...form.getInputProps('customer')}
          />
          <Button
            onClick={handleOrderNow}
            variant="outline"
            color="teal"
            radius="xl"
            fullWidth
            className="my-2"
          >
            Pesan Sekarang
          </Button>
        </Modal>
        <Button
          onClick={openOrder}
          variant="outline"
          color="teal"
          radius="xl"
          fullWidth
          className="mt-2"
        >
          Pesan
        </Button>
      </div>
    </>
  )
}

function CartItem({ item }) {
  const [value, setValue] = useState(item.count)

  useEffect(() => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      count: value,
    })
  }, [value])

  return (
    <div className="flex gap-4 h-24">
      <div className="h-24 w-24">
        <img
          src={item.image_url}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="my-auto grow">
        <h1 className="font-bold">{item.name}</h1>
        <h2>{currencyFormat(item.price)}</h2>
      </div>
      <div className="my-auto w-16">
        <NumberInput
          value={value}
          onChange={setValue}
          min={1}
          max={100}
          hideControls
        />
      </div>
    </div>
  )
}
