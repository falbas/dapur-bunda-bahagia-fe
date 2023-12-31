import Navbar from '@/components/Navbar'

export default function UserLayout({ children }) {
  return (
    <div className="relative max-w-md h-[100svh] mx-auto bg-white">
      <div className="relative pt-8 h-full overflow-auto no-scrollbar pb-20 px-4">
        {children}
      </div>

      <Navbar />
    </div>
  )
}
