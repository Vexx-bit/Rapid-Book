import { Service } from '@prisma/client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ServiceSelectionProps {
  services: Service[]
  onSelect: (service: Service) => void
}

export function ServiceSelection({ services, onSelect }: ServiceSelectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {services.map((service, index) => (
        <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(service)}
            className="group cursor-pointer flex items-center justify-between p-8 border border-[#1A1A1A] bg-transparent hover:bg-white hover:text-black transition-all duration-500"
        >
            <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#444444] group-hover:text-black/50 transition-colors">
                  ID: {service.id.slice(0, 8)}
                </span>
                <h4 className="text-2xl font-light tracking-tight transition-colors">
                    {service.name}
                </h4>
                <div className="flex items-center gap-4 text-xs font-medium text-[#666666] group-hover:text-black/60 transition-colors">
                   <span>{service.durationMin} MINS</span>
                   <span className="w-1 h-1 rounded-full bg-[#333333]"></span>
                   <span>USD {Number(service.price).toFixed(2)}</span>
                </div>
            </div>
            
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
               <span className="text-[10px] font-bold uppercase tracking-widest">Select</span>
               <ArrowRight className="w-6 h-6 stroke-[1px]" />
            </div>
        </motion.div>
      ))}
    </div>
  )
}
