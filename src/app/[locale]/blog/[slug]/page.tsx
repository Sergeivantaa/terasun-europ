import { notFound } from 'next/navigation'

// Blog posts will be loaded from MDX or CMS in a future iteration.
// This route exists to support the URL structure without 404s.
export function generateStaticParams() {
  return []
}

export default function BlogPostPage() {
  notFound()
}
