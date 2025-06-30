import './globals.css'

export const metadata = {
  title: 'University Admin Portal',
  description: 'Admin portal for university management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
} 