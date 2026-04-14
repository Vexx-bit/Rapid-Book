import { Service } from '@prisma/client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { Clock, DollarSign, Sparkles } from 'lucide-react'

interface ServiceSelectionProps {
  services: Service[]
  onSelect: (service: Service) => void
}

export function ServiceSelection({ services, onSelect }: ServiceSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="h-full"
        >
            <Card 
                className="cursor-pointer group h-full flex flex-col justify-between relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-card to-card/50" 
                onClick={() => onSelect(service)}
            >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Sparkle decoration */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="h-5 w-5 text-primary" />
                </div>
                
                <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {service.name}
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-4 flex-1">
                    <div className="flex items-baseline gap-1">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            {Number(service.price).toFixed(2)}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{service.durationMin} minutes</span>
                    </div>
                </CardContent>
                
                <CardFooter className="relative z-10 pt-4">
                    <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 font-semibold"
                    >
                        Select Service
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
      ))}
    </div>
  )
}
