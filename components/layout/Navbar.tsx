import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Command, User, LayoutDashboard, Globe } from "lucide-react"

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030711]/70 backdrop-blur-2xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
            <Link href="/" className="font-bold text-2xl flex items-center gap-3 group transition-transform hover:scale-105">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full group-hover:bg-primary/50 transition-all opacity-0 group-hover:opacity-100"></div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-blue-600 to-purple-600 p-[1px] shadow-2xl">
                       <div className="w-full h-full bg-[#030711] rounded-[10px] flex items-center justify-center">
                          <Command className="h-5 w-5 text-white animate-pulse" />
                       </div>
                    </div>
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="text-white tracking-tighter">RAPID<span className="text-primary italic">BOOK</span></span>
                    <span className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Logistics Engine</span>
                </div>
            </Link>

            <nav className="hidden md:flex items-center gap-10">
                <Link href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Services</Link>
                <Link href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Analytics</Link>
                <Link href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                   Network <Globe className="w-3 h-3 text-primary" />
                </Link>
            </nav>

            <div className="flex items-center gap-4">
                <Link href="/admin">
                    <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5">
                        <LayoutDashboard className="w-4 h-4" />
                        Command Console
                    </Button>
                </Link>
                <Button size="sm" className="bg-white text-black hover:bg-slate-200 font-bold px-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                   Book Node
                </Button>
            </div>
        </div>
    </header>
  )
}
