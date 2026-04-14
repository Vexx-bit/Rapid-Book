import { Navbar } from "@/components/layout/Navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
            {children}
        </main>
    </div>
  )
}
