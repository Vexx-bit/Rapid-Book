import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, LayoutDashboard } from "lucide-react"

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#111111] bg-[#0A0A0A]/80 backdrop-blur-3xl">
        <div className="container mx-auto flex h-24 items-center justify-between px-8 md:px-12">
            <Link href="/" className="font-bold text-2xl flex flex-col -space-y-1 group transition-all">
                <span className="text-white tracking-tighter">RAPID<span className="font-light">BOOK</span></span>
                <div className="flex items-center gap-2">
                   <Minus className="w-4 h-[1px] bg-[#333333] group-hover:bg-white transition-colors" />
                   <span className="text-[10px] text-[#444444] font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">Protocol v1.0</span>
                </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-12">
                {["Registry", "Network", "Specs", "Vault"].map((link) => (
                  <Link key={link} href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555] hover:text-white transition-colors underline-offset-8 hover:underline decor-2">
                    {link}
                  </Link>
                ))}
            </nav>

            <div className="flex items-center gap-6">
                <Link href="/admin">
                    <Button variant="link" size="sm" className="hidden sm:flex items-center gap-2 text-[#444444] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest no-underline">
                        Terminal
                    </Button>
                </Link>
                <div className="h-4 w-[1px] bg-[#222222] hidden sm:block"></div>
                <Button size="sm" className="bg-white text-black hover:bg-[#CCCCCC] font-bold px-8 rounded-none transition-all active:scale-95 text-xs uppercase tracking-widest">
                   Initialize
                </Button>
            </div>
        </div>
    </header>
  )
}
