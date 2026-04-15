'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

export function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#111111]"
    >
      <div className="container mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-white flex items-center justify-center group-hover:rotate-90 transition-transform duration-700">
             <Calendar className="w-5 h-5 text-black stroke-[2.5px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none text-white">RapidBook</span>
            <span className="text-[8px] font-bold tracking-[0.6em] text-[#333333] uppercase leading-none mt-1">Universal Protocol</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-16">
          <Link href="/#book" className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] hover:text-white transition-colors">
            EXECUTE_BOOKING
          </Link>
          <Link href="/dashboard" className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] hover:text-white transition-colors">
            NODE_ADMIN
          </Link>
          <div className="h-6 w-[1px] bg-[#111111]"></div>
          <div className="text-[10px] font-black tracking-widest text-white border border-white/10 px-4 py-2 hover:bg-white hover:text-black transition-all cursor-default uppercase">
            EST_2026
          </div>
        </nav>

        <button className="md:hidden text-white uppercase text-[10px] font-bold tracking-[0.3em]">
          Menu_
        </button>
      </div>
    </motion.header>
  )
}
