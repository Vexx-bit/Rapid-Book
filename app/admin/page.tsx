import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { DownloadInvoiceButton } from "@/components/invoice/DownloadInvoiceButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, DollarSign, CheckCircle2, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  const bookings = await prisma.booking.findMany({
    include: {
        service: true,
        invoice: true
    },
    orderBy: {
        startTime: 'desc'
    }
  })

  // Calculate stats
  const totalBookings = bookings.length
  const totalRevenue = bookings.reduce((acc, curr) => acc + (Number(curr.invoice?.amount || 0)), 0)
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length
  const paidInvoices = bookings.filter(b => b.invoice?.paid).length

  const stats = [
      {
          title: "Total Revenue",
          value: `$${totalRevenue.toFixed(2)}`,
          icon: DollarSign,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          change: "+12.5%"
      },
      {
          title: "Total Bookings",
          value: totalBookings,
          icon: Calendar,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          change: "+8.2%"
      },
      {
          title: "Confirmed",
          value: confirmedBookings,
          icon: CheckCircle2,
          color: "text-indigo-500",
          bgColor: "bg-indigo-500/10",
          change: "+5.1%"
      },
      {
          title: "Paid Invoices",
          value: paidInvoices,
          icon: Users,
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
          change: "+15.3%"
      }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto py-12 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Welcome back, Admin</p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Updates
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
              <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bgColor} rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="font-medium">{stat.change}</span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bookings Table */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="border-b bg-gradient-to-r from-card to-muted/20">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-bold">Customer</TableHead>
                    <TableHead className="font-bold">Service</TableHead>
                    <TableHead className="font-bold">Date & Time</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Payment</TableHead>
                    <TableHead className="text-right font-bold">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div className="font-semibold">{booking.customerName}</div>
                          <div className="text-sm text-muted-foreground">{booking.customerEmail}</div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <span className="font-medium">{booking.service.name}</span>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{format(booking.startTime, 'MMM d, yyyy')}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(booking.startTime, 'h:mm a')} - {format(booking.endTime, 'h:mm a')}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge 
                          variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}
                          className={booking.status === 'CONFIRMED' ? 'bg-gradient-to-r from-primary to-primary/80' : ''}
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        {booking.invoice ? (
                          <Badge 
                            variant={booking.invoice.paid ? 'outline' : 'destructive'} 
                            className={booking.invoice.paid ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" : ""}
                          >
                            {booking.invoice.paid ? 'PAID' : 'UNPAID'}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-2">
                          <span className="font-bold text-lg">
                            ${Number(booking.invoice?.amount || 0).toFixed(2)}
                          </span>
                          {booking.invoice && (
                            <DownloadInvoiceButton invoice={{
                              id: booking.invoice.id,
                              amount: booking.invoice.amount,
                              booking: {
                                customerName: booking.customerName,
                                customerEmail: booking.customerEmail,
                                startTime: booking.startTime,
                                service: { name: booking.service.name }
                              }
                            }} />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
