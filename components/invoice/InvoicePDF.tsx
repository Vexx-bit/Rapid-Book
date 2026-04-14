import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#112233',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#555',
  },
  value: {
    fontSize: 12,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

interface InvoiceProps {
  invoiceId: string
  customerName: string
  customerEmail: string
  serviceName: string
  amount: number
  date: string
}

export const InvoicePDF = ({ invoiceId, customerName, customerEmail, serviceName, amount, date }: InvoiceProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>INVOICE</Text>
        <Text>Reference: {invoiceId}</Text>
        <Text>Date: {date}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Bill To:</Text>
        <Text>{customerName}</Text>
        <Text>{customerEmail}</Text>
      </View>

      <View style={styles.section}>
        <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 }]}>
            <Text style={[styles.label, { width: '60%' }]}>Description</Text>
            <Text style={[styles.label, { width: '40%', textAlign: 'right' }]}>Amount</Text>
        </View>
        <View style={[styles.row, { marginTop: 10 }]}>
            <Text style={{ width: '60%', fontSize: 12 }}>{serviceName}</Text>
            <Text style={{ width: '40%', textAlign: 'right', fontSize: 12 }}>${amount.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.total}>Total: ${amount.toFixed(2)}</Text>
      </View>

      <View style={{ position: 'absolute', bottom: 30, left: 30, right: 30, textAlign: 'center', color: '#999', fontSize: 10 }}>
        <Text>Thank you for your business!</Text>
      </View>
    </Page>
  </Document>
);
