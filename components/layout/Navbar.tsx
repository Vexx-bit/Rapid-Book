import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Navbar() {
  return (
    <header className="border-b bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
            <Link href="/" className="font-bold text-2xl flex items-center gap-3 group">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all"></div>
                    <Sparkles className="h-8 w-8 text-primary relative z-10 group-hover:rotate-12 transition-transform" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    RapidBook
                </span>
            </Link>
            <nav className="flex items-center gap-4">
                <Link href="/admin">
                    <Button variant="ghost" size="sm" className="font-medium hover:bg-primary/10">
                        Admin Dashboard
                    </Button>
                </Link>
            </nav>
        </div>
    </header>
  )
}
