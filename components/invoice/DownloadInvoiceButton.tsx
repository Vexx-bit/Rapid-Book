'use client'

import { PDFDownloadLink } from "@react-pdf/renderer"
import { InvoicePDF } from "@/components/invoice/InvoicePDF"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface DownloadInvoiceButtonProps {
    invoice: {
        id: string
        amount: any
        booking: {
            customerName: string
            customerEmail: string
            startTime: Date
            service: {
                name: string
            }
        }
    }
}

export function DownloadInvoiceButton({ invoice }: DownloadInvoiceButtonProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <Button variant="outline" disabled>Loading...</Button>
    }

    return (
        <PDFDownloadLink
            document={
                <InvoicePDF
                    invoiceId={invoice.id}
                    customerName={invoice.booking.customerName}
                    customerEmail={invoice.booking.customerEmail}
                    serviceName={invoice.booking.service.name}
                    amount={Number(invoice.amount)}
                    date={new Date(invoice.booking.startTime).toLocaleDateString()}
                />
            }
            fileName={`invoice-${invoice.id}.pdf`}
        >
            {({ blob, url, loading, error }) =>
                loading ? (
                    <Button variant="outline" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </Button>
                ) : (
                    <Button variant="outline">Download PDF</Button>
                )
            }
        </PDFDownloadLink>
    )
}
