import { Service } from '@prisma/client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ServiceSelectionProps {
  services: Service[]
  onSelect: (service: Service) => void
}

export function ServiceSelection({ services, onSelect }: ServiceSelectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {services.map((service, index) => (
        <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelect(service)}
            className="group cursor-pointer flex flex-col md:flex-row md:items-center justify-between p-12 border border-[#111111] bg-transparent hover:bg-white hover:text-black transition-all duration-700"
        >
            <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#333333] group-hover:text-black/30 transition-colors">
                  SERVICE_REGISTRY_INIT
                </span>
                <h4 className="text-4xl font-light tracking-tighter transition-all group-hover:pl-4">
                    {service.name}
                </h4>
            </div>
            
            <div className="flex items-center gap-12 mt-8 md:mt-0">
                <div className="flex flex-col text-right">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#444444] group-hover:text-black/40">Configuration Charge</span>
                   <span className="text-xl font-medium">USD {Number(service.price).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-700">
                   <div className="h-[1px] w-20 bg-black"></div>
                   <ArrowRight className="w-8 h-8 stroke-[1px]" />
                </div>
            </div>
        </motion.div>
      ))}
    </div>
  )
}
