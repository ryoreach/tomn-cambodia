import { Outlet } from 'react-router-dom'
import PublicHeader from '@/components/navigation/PublicHeader'
import Footer from '@/components/navigation/Footer'
import Toasts from '@/components/common/Toasts'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <PublicHeader />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <Toasts />
    </div>
  )
}
