'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hook-form/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Service } from '@prisma/client'
import { format } from 'date-fns'
import { ArrowLeft, Send } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Identification required'),
  email: z.string().email('Valid communication address required'),
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
    <div className="space-y-16">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
           <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#444444]">
             [03.1] Registry Verification
           </h3>
           
           <div className="border border-[#1A1A1A] p-10 space-y-8">
              <div className="space-y-2">
                 <span className="text-[10px] font-bold text-[#444444] uppercase tracking-widest">Selected Service</span>
                 <p className="text-2xl font-light text-white tracking-tight">{service.name}</p>
              </div>
              <div className="h-[1px] bg-[#111111]"></div>
              <div className="space-y-2">
                 <span className="text-[10px] font-bold text-[#444444] uppercase tracking-widest">Assigned Slot</span>
                 <p className="text-xl font-light text-white tracking-tight">{format(new Date(slot), 'MMMM d, yyyy @ HH:mm')}</p>
              </div>
           </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#444444]">
            [03.2] Customer Credentials
          </h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">Universal ID Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="AUTHENTIC_NAME" 
                        {...field} 
                        className="bg-transparent border-none border-b border-[#1A1A1A] rounded-none px-0 text-lg placeholder:text-[#222222] focus:border-white transition-all focus:ring-0 shadow-none h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold text-red-900" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">Node Comm Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="IDENTITY@PROTOCOL.SYS" 
                        {...field} 
                        className="bg-transparent border-none border-b border-[#1A1A1A] rounded-none px-0 text-lg placeholder:text-[#222222] focus:border-white transition-all focus:ring-0 shadow-none h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] uppercase font-bold text-red-900" />
                  </FormItem>
                )}
              />

              <div className="pt-12 flex justify-between gap-4">
                 <Button 
                   type="button"
                   variant="ghost" 
                   onClick={onBack}
                   className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444] hover:text-white"
                 >
                   <ArrowLeft className="mr-3 h-4 w-4" />
                   Modify parameters
                 </Button>
                 
                 <Button 
                   type="submit" 
                   className="bg-white text-black hover:bg-[#CCCCCC] rounded-none px-12 py-6 text-xs font-bold uppercase tracking-widest active:scale-95 transition-all shadow-none"
                 >
                   Finalize Registry
                   <Send className="ml-3 h-4 w-4" />
                 </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
