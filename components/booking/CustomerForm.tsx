'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Service } from '@prisma/client'
import { format } from 'date-fns'
import { ArrowLeft, Send } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Name identification required'),
  email: z.string().email('Valid communication endpoint required'),
})

interface CustomerFormProps {
  service: Service
  slot: string
  onSubmit: (data: z.infer<typeof formSchema>) => void
  onBack: () => void
}

export function CustomerForm({ service, slot, onSubmit, onBack }: CustomerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  return (
    <div className="space-y-40">
      <div className="grid lg:grid-cols-2 gap-32">
        <div className="space-y-12">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#333333] border-b border-[#111111] pb-6">
             NODE_CONFIGURATION_SUMMARY
           </h3>
           
           <div className="border border-[#111111] p-16 space-y-12 bg-transparent transition-all hover:border-[#222222]">
              <div className="space-y-4">
                 <span className="text-[10px] font-bold text-[#333333] uppercase tracking-[0.4em]">Service Mapping</span>
                 <p className="text-5xl font-light text-white tracking-tighter">{service.name}</p>
              </div>
              <div className="h-[2px] w-20 bg-[#111111]"></div>
              <div className="space-y-4">
                 <span className="text-[10px] font-bold text-[#333333] uppercase tracking-[0.4em]">Time Vector</span>
                 <p className="text-3xl font-light text-white tracking-tighter leading-none italic">{format(new Date(slot), 'MMMM d, yyyy @ HH:mm')}</p>
              </div>
           </div>
        </div>

        <div className="space-y-12">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#333333] border-b border-[#111111] pb-6">
            CUSTOMER_REGISTRY_ENTRY
          </h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-6">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.4em] text-[#333333]">Identification Source Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="..." 
                        {...field} 
                        className="bg-transparent border-none border-b border-[#111111] rounded-none px-0 text-2xl font-light text-white placeholder:text-[#111111] focus:border-white transition-all focus:ring-0 shadow-none h-16"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold text-white bg-red-900 inline-block px-4 py-1" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-6">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.4em] text-[#333333]">Node Communication Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="..." 
                        {...field} 
                        className="bg-transparent border-none border-b border-[#111111] rounded-none px-0 text-2xl font-light text-white placeholder:text-[#111111] focus:border-white transition-all focus:ring-0 shadow-none h-16"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold text-white bg-red-900 inline-block px-4 py-1" />
                  </FormItem>
                )}
              />

              <div className="pt-20 flex justify-between items-center border-t border-[#111111]">
                 <Button 
                   type="button"
                   variant="ghost" 
                   onClick={onBack}
                   className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#333333] hover:text-white transition-all hover:bg-transparent"
                 >
                   <ArrowLeft className="mr-6 h-6 w-6 stroke-[1px]" />
                   ADJUST VECTORS
                 </Button>
                 
                 <Button 
                   type="submit" 
                   className="bg-white text-black hover:bg-[#CCCCCC] rounded-none px-20 py-10 text-[10px] font-black uppercase tracking-[0.4em] active:scale-95 transition-all shadow-none"
                 >
                   FINALIZE_TRANSMISSION
                   <Send className="ml-6 h-6 w-6 stroke-[1px]" />
                 </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
