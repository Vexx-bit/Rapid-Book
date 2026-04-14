'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Service } from "@prisma/client"
import { format } from "date-fns"
import { ArrowLeft, ArrowRight, User, Mail, Calendar, Clock, DollarSign } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

interface CustomerFormProps {
    service: Service
    slot: string
    onSubmit: (values: z.infer<typeof formSchema>) => void
    onBack: () => void
}

export function CustomerForm({ service, slot, onSubmit, onBack }: CustomerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  return (
    <div className="space-y-8">
        {/* Booking Summary Card */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-primary/5 p-6 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-4">
                <h4 className="font-bold text-xl flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Booking Summary
                </h4>
                
                <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-lg">🎯</span>
                            <span className="font-medium">Service</span>
                        </div>
                        <span className="font-bold">{service.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">Date</span>
                        </div>
                        <span className="font-bold">{format(new Date(slot), 'MMMM d, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">Time</span>
                        </div>
                        <span className="font-bold">{format(new Date(slot), 'h:mm a')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30">
                        <div className="flex items-center gap-2 text-primary font-semibold">
                            <DollarSign className="h-5 w-5" />
                            <span>Total Price</span>
                        </div>
                        <span className="text-2xl font-bold text-primary">
                            ${Number(service.price).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Customer Details Form */}
        <div className="space-y-6">
            <h4 className="font-bold text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Your Details
            </h4>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold">Full Name</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input 
                                            placeholder="John Doe" 
                                            className="pl-10 h-12 border-2 focus:border-primary transition-colors" 
                                            {...field} 
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold">Email Address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input 
                                            placeholder="john@example.com" 
                                            type="email"
                                            className="pl-10 h-12 border-2 focus:border-primary transition-colors" 
                                            {...field} 
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex gap-4 pt-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={onBack}
                            size="lg"
                            className="flex-1 gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                        
                        <Button 
                            type="submit"
                            size="lg"
                            className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
                        >
                            Confirm Booking
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}
