import { MdRestaurantMenu } from 'react-icons/md'
import { FiShoppingCart } from 'react-icons/fi'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="absolute bottom-0 flex w-full h-16 border rounded-t-3xl bg-white">
      <Link href="/" className="flex w-1/2 hover:opacity-75 border-r">
        <MdRestaurantMenu className="m-auto h-14 w-14" />
      </Link>
      <Link href="/cart" className="flex w-1/2 hover:opacity-75">
        <FiShoppingCart className="m-auto h-14 w-14" />
      </Link>
    </div>
  )
}
