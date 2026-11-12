import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicLayout from '@/layouts/PublicLayout'
import CitizenLayout from '@/layouts/CitizenLayout'
import AdminLayout from '@/layouts/AdminLayout'
import HomePage from '@/pages/public/HomePage'
import ServiceDirectoryPage from '@/pages/public/ServiceDirectoryPage'
import ServiceDetailsPage from '@/pages/public/ServiceDetailsPage'
import OfficeFinderPage from '@/pages/public/OfficeFinderPage'
import AssistantPage from '@/pages/public/AssistantPage'
import AboutPage from '@/pages/public/AboutPage'
import NotFoundPage from '@/pages/public/NotFoundPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import DashboardPage from '@/pages/citizen/DashboardPage'
import SavedServicesPage from '@/pages/citizen/SavedServicesPage'
import ChecklistsPage from '@/pages/citizen/ChecklistsPage'
import ProfilePage from '@/pages/citizen/ProfilePage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminServicesPage from '@/pages/admin/AdminServicesPage'
import AdminServiceEditorPage from '@/pages/admin/AdminServiceEditorPage'
import AdminReviewsPage from '@/pages/admin/AdminReviewsPage'
import AdminUsersPage from '@/pages/admin/AdminUsersPage'
import AdminAuditLogsPage from '@/pages/admin/AdminAuditLogsPage'

const router = createBrowserRouter([
  {
    element: <PublicLayout />, children: [
      { path: '/', element: <HomePage /> },
      { path: '/services', element: <ServiceDirectoryPage /> },
      { path: '/services/:id', element: <ServiceDetailsPage /> },
      { path: '/offices', element: <OfficeFinderPage /> },
      { path: '/assistant', element: <AssistantPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ]
  },
  {
    path: '/dashboard', element: <CitizenLayout />, children: [
      { index: true, element: <DashboardPage /> },
      { path: 'saved-services', element: <SavedServicesPage /> },
      { path: 'checklists', element: <ChecklistsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ]
  },
  {
    path: '/admin', element: <AdminLayout />, children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'services', element: <AdminServicesPage /> },
      { path: 'services/create', element: <AdminServiceEditorPage /> },
      { path: 'services/:id/edit', element: <AdminServiceEditorPage /> },
      { path: 'reviews', element: <AdminReviewsPage /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'audit-logs', element: <AdminAuditLogsPage /> },
    ]
  },
])

export default function AppRoutes() { return <RouterProvider router={router} /> }
