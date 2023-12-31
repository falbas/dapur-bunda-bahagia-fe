import { MdRestaurantMenu } from 'react-icons/md'
import { FiShoppingCart } from 'react-icons/fi'
import { LuClipboardList } from 'react-icons/lu'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="fixed bottom-0 w-full max-w-md h-16 bg-white pt-2">
      <div className="flex border rounded-t-3xl">
        <Link href="/" className="flex w-1/3 hover:opacity-75 border-r">
          <MdRestaurantMenu className="m-auto h-14 w-14 p-1" />
        </Link>
        <Link href="/cart" className="flex w-1/3 hover:opacity-75 border-r">
          <FiShoppingCart className="m-auto h-14 w-14 p-1" />
        </Link>
        <Link href="/order" className="flex w-1/3 hover:opacity-75">
          <LuClipboardList className="m-auto h-14 w-14 p-1" />
        </Link>
      </div>
    </div>
  )
}
