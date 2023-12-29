'use client'

import { currencyFormat } from '@/helpers/utils'
import { displayCart, addToCart } from '@/helpers/cartManager'
import { useState, useEffect } from 'react'
import { NumberInput } from '@mantine/core'

export default function Home() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(displayCart())
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        {!cart.length
          ? <p className='text-center'>Keranjang Kosong</p>
          : cart?.map((item, key) => <CartItem key={key} item={item} />)}
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
