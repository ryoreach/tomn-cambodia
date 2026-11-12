import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <div className="container-page py-20 text-center">
      <h1 className="text-4xl font-semibold text-charcoal mb-2">404</h1>
      <p className="text-muted mb-6">Page not found</p>
      <Link to="/" className="inline-flex px-4 py-2 rounded-md bg-teal text-white">Go home</Link>
    </div>
  )
}
