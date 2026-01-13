import pdfMake from 'pdfmake/build/pdfmake'
import type { TDocumentDefinitions, Content } from 'pdfmake/interfaces'

// Import and register fonts
if (typeof window !== 'undefined') {
  import('pdfmake/build/vfs_fonts').then((vfs) => {
    pdfMake.vfs = vfs.default?.vfs || vfs
  })
}

export interface BillItem {
  id: string | number
  medicine: string
  type?: string
  content?: string
  quantity: number
  selling_price: number
  batch_number?: string
  expiry_date?: string
}

export interface BillData {
  invoiceNumber: string
  date: string
  time: string
  customerName?: string
  customerPhone?: string
  items: BillItem[]
  subtotal: number
  tax: number
  discount?: number
  total: number
  paymentMethod?: string
  pharmacyName?: string
  pharmacyAddress?: string
  pharmacyPhone?: string
  pharmacyLicense?: string
}

/**
 * Generates and downloads a beautifully formatted pharmacy bill PDF
 * @param billData - The bill data to generate PDF from
 */
export function generatePharmacyBillPDF(billData: BillData): void {
  const {
    invoiceNumber,
    date,
    time,
    customerName = 'Walk-in Customer',
    customerPhone = 'N/A',
    items,
    subtotal,
    tax,
    discount = 0,
    total,
    paymentMethod = 'Cash',
    pharmacyName = 'Medexa Pharmacy',
    pharmacyAddress = '123 Healthcare Street, Medical District, Dubai, UAE',
    pharmacyPhone = '+971 4 123 4567',
    pharmacyLicense = 'License No: PH-2024-12345'
  } = billData

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    
    header: {
      margin: [40, 20, 40, 0],
      columns: [
        {
          width: '*',
          text: ''
        }
      ]
    },
    
    footer: (currentPage, pageCount) => {
      return {
        margin: [40, 20, 40, 0],
        columns: [
          {
            width: '*',
            text: 'Thank you for choosing Medexa Pharmacy!',
            alignment: 'center',
            fontSize: 9,
            color: '#666666'
          }
        ]
      }
    },

    content: [
      // Header Section with Pharmacy Details
      {
        columns: [
          {
            width: '*',
            stack: [
              {
                text: pharmacyName,
                style: 'pharmacyName',
                margin: [0, 0, 0, 5]
              },
              {
                text: pharmacyAddress,
                style: 'pharmacyDetails',
                margin: [0, 0, 0, 3]
              },
              {
                text: `Phone: ${pharmacyPhone}`,
                style: 'pharmacyDetails',
                margin: [0, 0, 0, 3]
              },
              {
                text: pharmacyLicense,
                style: 'pharmacyDetails',
                color: '#0066cc'
              }
            ]
          },
          {
            width: 'auto',
            stack: [
              {
                text: 'INVOICE',
                style: 'invoiceTitle',
                alignment: 'right',
                margin: [0, 0, 0, 10]
              },
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 150,
                    h: 60,
                    r: 5,
                    lineColor: '#0066cc',
                    lineWidth: 1
                  }
                ],
                absolutePosition: { x: 405, y: 80 }
              },
              {
                text: `#${invoiceNumber}`,
                style: 'invoiceNumber',
                alignment: 'right',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Date: ${date}`,
                style: 'invoiceDate',
                alignment: 'right',
                margin: [0, 0, 0, 3]
              },
              {
                text: `Time: ${time}`,
                style: 'invoiceDate',
                alignment: 'right'
              }
            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Divider Line
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 2,
            lineColor: '#0066cc'
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Customer Information
      {
        columns: [
          {
            width: '50%',
            stack: [
              {
                text: 'BILL TO:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: customerName,
                style: 'customerName',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Phone: ${customerPhone}`,
                style: 'customerDetails'
              }
            ]
          },
          {
            width: '50%',
            stack: [
              {
                text: 'PAYMENT DETAILS:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: `Method: ${paymentMethod}`,
                style: 'customerDetails',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Status: Paid`,
                style: 'customerDetails',
                color: '#10b981'
              }
            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Items Table
      {
        style: 'itemsTable',
        table: {
          headerRows: 1,
          widths: [25, '*', 60, 50, 60, 70],
          body: [
            // Table Header
            [
              { text: 'No.', style: 'tableHeader' },
              { text: 'Medicine Details', style: 'tableHeader' },
              { text: 'Type', style: 'tableHeader' },
              { text: 'Qty', style: 'tableHeader', alignment: 'center' },
              { text: 'Price', style: 'tableHeader', alignment: 'right' },
              { text: 'Amount', style: 'tableHeader', alignment: 'right' }
            ] as any,
            // Table Rows
            ...items.map((item, index) => [
              { text: (index + 1).toString(), style: 'tableCell' },
              {
                text: [
                  { text: item.medicine, style: 'medicineName' },
                  item.content ? { text: '\n' + item.content, style: 'medicineContent', color: '#666666' } : '',
                  item.batch_number ? { text: '\nBatch: ' + item.batch_number, style: 'medicineExtra' } : ''
                ].filter(Boolean)
              } as any,
              {
                text: item.type || 'N/A',
                style: 'tableCell',
                fontSize: 9
              },
              {
                text: item.quantity.toString(),
                style: 'tableCell',
                alignment: 'center',
                bold: true
              },
              {
                text: `$${item.selling_price.toFixed(2)}`,
                style: 'tableCell',
                alignment: 'right'
              },
              {
                text: `$${(item.selling_price * item.quantity).toFixed(2)}`,
                style: 'tableCell',
                alignment: 'right',
                bold: true,
                color: '#0066cc'
              }
            ] as any)
          ]
        },
        layout: {
          fillColor: (rowIndex: number) => {
            return rowIndex === 0 ? '#0066cc' : rowIndex % 2 === 0 ? '#f8fafc' : null
          },
          hLineWidth: (i: number, node: any) => {
            return i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5
          },
          vLineWidth: () => 0,
          hLineColor: (i: number, node: any) => {
            return i === 0 || i === 1 || i === node.table.body.length ? '#0066cc' : '#e2e8f0'
          },
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 8,
          paddingBottom: () => 8
        },
        margin: [0, 0, 0, 20]
      },

      // Summary Section
      {
        columns: [
          {
            width: '60%',
            stack: [
              {
                text: 'NOTES:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: '• Please check the medicines before leaving the pharmacy',
                style: 'notes',
                margin: [0, 0, 0, 3]
              },
              {
                text: '• Keep medicines in a cool and dry place',
                style: 'notes',
                margin: [0, 0, 0, 3]
              },
              {
                text: '• Follow the dosage as prescribed by your doctor',
                style: 'notes'
              }
            ]
          },
          {
            width: '40%',
            table: {
              widths: ['*', 80],
              body: [
                [
                  { text: 'Subtotal:', style: 'summaryLabel' },
                  { text: `$${subtotal.toFixed(2)}`, style: 'summaryValue' }
                ],
                [
                  { text: 'Tax (5%):', style: 'summaryLabel' },
                  { text: `$${tax.toFixed(2)}`, style: 'summaryValue' }
                ],
                ...(discount > 0 ? [[
                  { text: 'Discount:', style: 'summaryLabel', color: '#ef4444' },
                  { text: `-$${discount.toFixed(2)}`, style: 'summaryValue', color: '#ef4444' }
                ]] : []),
                [
                  {
                    text: 'TOTAL:',
                    style: 'summaryLabel',
                    bold: true,
                    fontSize: 12,
                    fillColor: '#0066cc',
                    color: '#ffffff'
                  },
                  {
                    text: `$${total.toFixed(2)}`,
                    style: 'summaryValue',
                    bold: true,
                    fontSize: 13,
                    fillColor: '#0066cc',
                    color: '#ffffff'
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: (i: number, node: any) => {
                return i === node.table.body.length - 1 ? 0 : 0.5
              },
              vLineWidth: () => 0,
              hLineColor: () => '#e2e8f0',
              paddingLeft: () => 10,
              paddingRight: () => 10,
              paddingTop: () => 6,
              paddingBottom: () => 6
            }
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Terms and Conditions
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
            lineColor: '#e2e8f0'
          }
        ],
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Terms & Conditions',
        style: 'termsTitle',
        margin: [0, 0, 0, 8]
      },
      {
        ul: [
          'This is a computer-generated invoice and does not require a signature.',
          'All sales are final. Returns are subject to pharmacy policy.',
          'Please retain this invoice for your records.',
          'In case of any discrepancy, please contact us within 24 hours.'
        ],
        style: 'termsList'
      },

      // Digital Stamp
      {
        canvas: [
          {
            type: 'rect',
            x: 400,
            y: -40,
            w: 100,
            h: 40,
            r: 3,
            lineColor: '#10b981',
            lineWidth: 2
          }
        ],
        margin: [0, 20, 0, 0]
      },
      {
        text: 'PAID',
        style: 'paidStamp',
        absolutePosition: { x: 430, y: 730 }
      }
    ],

    styles: {
      pharmacyName: {
        fontSize: 20,
        bold: true,
        color: '#0066cc'
      },
      pharmacyDetails: {
        fontSize: 9,
        color: '#666666'
      },
      invoiceTitle: {
        fontSize: 24,
        bold: true,
        color: '#0066cc'
      },
      invoiceNumber: {
        fontSize: 16,
        bold: true,
        color: '#1f2937'
      },
      invoiceDate: {
        fontSize: 9,
        color: '#666666'
      },
      sectionTitle: {
        fontSize: 10,
        bold: true,
        color: '#0066cc',
        decoration: 'underline',
        decorationColor: '#0066cc'
      },
      customerName: {
        fontSize: 12,
        bold: true,
        color: '#1f2937'
      },
      customerDetails: {
        fontSize: 10,
        color: '#666666'
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        color: '#ffffff',
        fillColor: '#0066cc'
      },
      tableCell: {
        fontSize: 10,
        color: '#1f2937'
      },
      medicineName: {
        fontSize: 11,
        bold: true,
        color: '#1f2937'
      },
      medicineContent: {
        fontSize: 8,
        italics: true
      },
      medicineExtra: {
        fontSize: 7,
        color: '#666666'
      },
      summaryLabel: {
        fontSize: 10,
        color: '#666666',
        alignment: 'right'
      },
      summaryValue: {
        fontSize: 11,
        bold: true,
        color: '#1f2937',
        alignment: 'right'
      },
      notes: {
        fontSize: 8,
        color: '#666666',
        lineHeight: 1.3
      },
      termsTitle: {
        fontSize: 10,
        bold: true,
        color: '#1f2937'
      },
      termsList: {
        fontSize: 8,
        color: '#666666',
        lineHeight: 1.4
      },
      paidStamp: {
        fontSize: 16,
        bold: true,
        color: '#10b981',
        alignment: 'center'
      }
    },

    defaultStyle: {
      font: 'Roboto'
    }
  }

  // Generate and download the PDF
  const fileName = `Invoice_${invoiceNumber}_${date.replace(/\//g, '-')}.pdf`
  pdfMake.createPdf(docDefinition).download(fileName)
}

/**
 * Opens the PDF in a new tab instead of downloading
 * @param billData - The bill data to generate PDF from
 */
export function openPharmacyBillPDF(billData: BillData): void {
  const {
    invoiceNumber,
    date,
    time,
    customerName = 'Walk-in Customer',
    customerPhone = 'N/A',
    items,
    subtotal,
    tax,
    discount = 0,
    total,
    paymentMethod = 'Cash',
    pharmacyName = 'Medexa Pharmacy',
    pharmacyAddress = '123 Healthcare Street, Medical District, Dubai, UAE',
    pharmacyPhone = '+971 4 123 4567',
    pharmacyLicense = 'License No: PH-2024-12345'
  } = billData

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    
    footer: (currentPage, pageCount) => {
      return {
        margin: [40, 20, 40, 0],
        columns: [
          {
            width: '*',
            text: 'Thank you for choosing Medexa Pharmacy!',
            alignment: 'center',
            fontSize: 9,
            color: '#666666'
          }
        ]
      }
    },

    content: [
      // Header Section with Pharmacy Details
      {
        columns: [
          {
            width: '*',
            stack: [
              {
                text: pharmacyName,
                style: 'pharmacyName',
                margin: [0, 0, 0, 5]
              },
              {
                text: pharmacyAddress,
                style: 'pharmacyDetails',
                margin: [0, 0, 0, 3]
              },
              {
                text: `Phone: ${pharmacyPhone}`,
                style: 'pharmacyDetails',
                margin: [0, 0, 0, 3]
              },
              {
                text: pharmacyLicense,
                style: 'pharmacyDetails',
                color: '#0066cc'
              }
            ]
          },
          {
            width: 'auto',
            stack: [
              {
                text: 'INVOICE',
                style: 'invoiceTitle',
                alignment: 'right',
                margin: [0, 0, 0, 10]
              },
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 150,
                    h: 60,
                    r: 5,
                    lineColor: '#0066cc',
                    lineWidth: 1
                  }
                ],
                absolutePosition: { x: 405, y: 80 }
              },
              {
                text: `#${invoiceNumber}`,
                style: 'invoiceNumber',
                alignment: 'right',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Date: ${date}`,
                style: 'invoiceDate',
                alignment: 'right',
                margin: [0, 0, 0, 3]
              },
              {
                text: `Time: ${time}`,
                style: 'invoiceDate',
                alignment: 'right'
              }
            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Divider Line
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 2,
            lineColor: '#0066cc'
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Customer Information
      {
        columns: [
          {
            width: '50%',
            stack: [
              {
                text: 'BILL TO:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: customerName,
                style: 'customerName',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Phone: ${customerPhone}`,
                style: 'customerDetails'
              }
            ]
          },
          {
            width: '50%',
            stack: [
              {
                text: 'PAYMENT DETAILS:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: `Method: ${paymentMethod}`,
                style: 'customerDetails',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Status: Paid`,
                style: 'customerDetails',
                color: '#10b981'
              }
            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Items Table
      {
        style: 'itemsTable',
        table: {
          headerRows: 1,
          widths: [25, '*', 60, 50, 60, 70],
          body: [
            // Table Header
            [
              { text: 'No.', style: 'tableHeader' },
              { text: 'Medicine Details', style: 'tableHeader' },
              { text: 'Type', style: 'tableHeader' },
              { text: 'Qty', style: 'tableHeader', alignment: 'center' },
              { text: 'Price', style: 'tableHeader', alignment: 'right' },
              { text: 'Amount', style: 'tableHeader', alignment: 'right' }
            ] as any,
            // Table Rows
            ...items.map((item, index) => [
              { text: (index + 1).toString(), style: 'tableCell' },
              {
                text: [
                  { text: item.medicine, style: 'medicineName' },
                  item.content ? { text: '\n' + item.content, style: 'medicineContent', color: '#666666' } : '',
                  item.batch_number ? { text: '\nBatch: ' + item.batch_number, style: 'medicineExtra' } : ''
                ].filter(Boolean)
              } as any,
              {
                text: item.type || 'N/A',
                style: 'tableCell',
                fontSize: 9
              },
              {
                text: item.quantity.toString(),
                style: 'tableCell',
                alignment: 'center',
                bold: true
              },
              {
                text: `$${item.selling_price.toFixed(2)}`,
                style: 'tableCell',
                alignment: 'right'
              },
              {
                text: `$${(item.selling_price * item.quantity).toFixed(2)}`,
                style: 'tableCell',
                alignment: 'right',
                bold: true,
                color: '#0066cc'
              }
            ] as any)
          ]
        },
        layout: {
          fillColor: (rowIndex: number) => {
            return rowIndex === 0 ? '#0066cc' : rowIndex % 2 === 0 ? '#f8fafc' : null
          },
          hLineWidth: (i: number, node: any) => {
            return i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5
          },
          vLineWidth: () => 0,
          hLineColor: (i: number, node: any) => {
            return i === 0 || i === 1 || i === node.table.body.length ? '#0066cc' : '#e2e8f0'
          },
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 8,
          paddingBottom: () => 8
        },
        margin: [0, 0, 0, 20]
      },

      // Summary Section
      {
        columns: [
          {
            width: '60%',
            stack: [
              {
                text: 'NOTES:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: '• Please check the medicines before leaving the pharmacy',
                style: 'notes',
                margin: [0, 0, 0, 3]
              },
              {
                text: '• Keep medicines in a cool and dry place',
                style: 'notes',
                margin: [0, 0, 0, 3]
              },
              {
                text: '• Follow the dosage as prescribed by your doctor',
                style: 'notes'
              }
            ]
          },
          {
            width: '40%',
            table: {
              widths: ['*', 80],
              body: [
                [
                  { text: 'Subtotal:', style: 'summaryLabel' },
                  { text: `$${subtotal.toFixed(2)}`, style: 'summaryValue' }
                ],
                [
                  { text: 'Tax (5%):', style: 'summaryLabel' },
                  { text: `$${tax.toFixed(2)}`, style: 'summaryValue' }
                ],
                ...(discount > 0 ? [[
                  { text: 'Discount:', style: 'summaryLabel', color: '#ef4444' },
                  { text: `-$${discount.toFixed(2)}`, style: 'summaryValue', color: '#ef4444' }
                ]] : []),
                [
                  {
                    text: 'TOTAL:',
                    style: 'summaryLabel',
                    bold: true,
                    fontSize: 12,
                    fillColor: '#0066cc',
                    color: '#ffffff'
                  },
                  {
                    text: `$${total.toFixed(2)}`,
                    style: 'summaryValue',
                    bold: true,
                    fontSize: 13,
                    fillColor: '#0066cc',
                    color: '#ffffff'
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: (i: number, node: any) => {
                return i === node.table.body.length - 1 ? 0 : 0.5
              },
              vLineWidth: () => 0,
              hLineColor: () => '#e2e8f0',
              paddingLeft: () => 10,
              paddingRight: () => 10,
              paddingTop: () => 6,
              paddingBottom: () => 6
            }
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Terms and Conditions
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
            lineColor: '#e2e8f0'
          }
        ],
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Terms & Conditions',
        style: 'termsTitle',
        margin: [0, 0, 0, 8]
      },
      {
        ul: [
          'This is a computer-generated invoice and does not require a signature.',
          'All sales are final. Returns are subject to pharmacy policy.',
          'Please retain this invoice for your records.',
          'In case of any discrepancy, please contact us within 24 hours.'
        ],
        style: 'termsList'
      },

      // Digital Stamp
      {
        canvas: [
          {
            type: 'rect',
            x: 400,
            y: -40,
            w: 100,
            h: 40,
            r: 3,
            lineColor: '#10b981',
            lineWidth: 2
          }
        ],
        margin: [0, 20, 0, 0]
      },
      {
        text: 'PAID',
        style: 'paidStamp',
        absolutePosition: { x: 430, y: 730 }
      }
    ],

    styles: {
      pharmacyName: {
        fontSize: 20,
        bold: true,
        color: '#0066cc'
      },
      pharmacyDetails: {
        fontSize: 9,
        color: '#666666'
      },
      invoiceTitle: {
        fontSize: 24,
        bold: true,
        color: '#0066cc'
      },
      invoiceNumber: {
        fontSize: 16,
        bold: true,
        color: '#1f2937'
      },
      invoiceDate: {
        fontSize: 9,
        color: '#666666'
      },
      sectionTitle: {
        fontSize: 10,
        bold: true,
        color: '#0066cc',
        decoration: 'underline',
        decorationColor: '#0066cc'
      },
      customerName: {
        fontSize: 12,
        bold: true,
        color: '#1f2937'
      },
      customerDetails: {
        fontSize: 10,
        color: '#666666'
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        color: '#ffffff',
        fillColor: '#0066cc'
      },
      tableCell: {
        fontSize: 10,
        color: '#1f2937'
      },
      medicineName: {
        fontSize: 11,
        bold: true,
        color: '#1f2937'
      },
      medicineContent: {
        fontSize: 8,
        italics: true
      },
      medicineExtra: {
        fontSize: 7,
        color: '#666666'
      },
      summaryLabel: {
        fontSize: 10,
        color: '#666666',
        alignment: 'right'
      },
      summaryValue: {
        fontSize: 11,
        bold: true,
        color: '#1f2937',
        alignment: 'right'
      },
      notes: {
        fontSize: 8,
        color: '#666666',
        lineHeight: 1.3
      },
      termsTitle: {
        fontSize: 10,
        bold: true,
        color: '#1f2937'
      },
      termsList: {
        fontSize: 8,
        color: '#666666',
        lineHeight: 1.4
      },
      paidStamp: {
        fontSize: 16,
        bold: true,
        color: '#10b981',
        alignment: 'center'
      }
    },

    defaultStyle: {
      font: 'Roboto'
    }
  }

  // Generate and open the PDF in new tab
  pdfMake.createPdf(docDefinition).open()
}

/**
 * Prints the PDF directly with print dialog
 * @param billData - The bill data to generate PDF from
 */
export function printPharmacyBillPDF(billData: BillData): void {
  const {
    invoiceNumber,
    date,
    time,
    customerName = 'Walk-in Customer',
    customerPhone = 'N/A',
    items,
    subtotal,
    tax,
    discount = 0,
    total,
    paymentMethod = 'Cash',
    pharmacyName = 'Medexa Pharmacy',
    pharmacyAddress = '123 Healthcare Street, Medical District, Dubai, UAE',
    pharmacyPhone = '+971 4 123 4567',
    pharmacyLicense = 'License No: PH-2024-12345'
  } = billData

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    
    footer: (currentPage, pageCount) => {
      return {
        margin: [40, 20, 40, 0],
        columns: [
          {
            width: '*',
            text: 'Thank you for choosing Medexa Pharmacy!',
            alignment: 'center',
            fontSize: 9,
            color: '#666666'
          }
        ]
      }
    },

    content: [
      // Header Section with Pharmacy Details
      {
        columns: [
          {
            width: '*',
            stack: [
              {
                text: pharmacyName,
                style: 'pharmacyName',
                margin: [0, 0, 0, 5]
              },
              {
                text: pharmacyAddress,
                style: 'pharmacyDetails',
                margin: [0, 0, 0, 3]
              },
              {
                text: `Phone: ${pharmacyPhone}`,
                style: 'pharmacyDetails',
                margin: [0, 0, 0, 3]
              },
              {
                text: pharmacyLicense,
                style: 'pharmacyDetails',
                color: '#0066cc'
              }
            ]
          },
          {
            width: 'auto',
            stack: [
              {
                text: 'INVOICE',
                style: 'invoiceTitle',
                alignment: 'right',
                margin: [0, 0, 0, 10]
              },
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 150,
                    h: 60,
                    r: 5,
                    lineColor: '#0066cc',
                    lineWidth: 1
                  }
                ],
                absolutePosition: { x: 405, y: 80 }
              },
              {
                text: `#${invoiceNumber}`,
                style: 'invoiceNumber',
                alignment: 'right',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Date: ${date}`,
                style: 'invoiceDate',
                alignment: 'right',
                margin: [0, 0, 0, 3]
              },
              {
                text: `Time: ${time}`,
                style: 'invoiceDate',
                alignment: 'right'
              }
            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Divider Line
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 2,
            lineColor: '#0066cc'
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Customer Information
      {
        columns: [
          {
            width: '50%',
            stack: [
              {
                text: 'BILL TO:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: customerName,
                style: 'customerName',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Phone: ${customerPhone}`,
                style: 'customerDetails'
              }
            ]
          },
          {
            width: '50%',
            stack: [
              {
                text: 'PAYMENT DETAILS:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: `Method: ${paymentMethod}`,
                style: 'customerDetails',
                margin: [0, 0, 0, 5]
              },
              {
                text: `Status: Paid`,
                style: 'customerDetails',
                color: '#10b981'
              }
            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Items Table
      {
        style: 'itemsTable',
        table: {
          headerRows: 1,
          widths: [25, '*', 60, 50, 60, 70],
          body: [
            // Table Header
            [
              { text: 'No.', style: 'tableHeader' },
              { text: 'Medicine Details', style: 'tableHeader' },
              { text: 'Type', style: 'tableHeader' },
              { text: 'Qty', style: 'tableHeader', alignment: 'center' },
              { text: 'Price', style: 'tableHeader', alignment: 'right' },
              { text: 'Amount', style: 'tableHeader', alignment: 'right' }
            ] as any,
            // Table Rows
            ...items.map((item, index) => [
              { text: (index + 1).toString(), style: 'tableCell' },
              {
                text: [
                  { text: item.medicine, style: 'medicineName' },
                  item.content ? { text: '\n' + item.content, style: 'medicineContent', color: '#666666' } : '',
                  item.batch_number ? { text: '\nBatch: ' + item.batch_number, style: 'medicineExtra' } : ''
                ].filter(Boolean)
              } as any,
              {
                text: item.type || 'N/A',
                style: 'tableCell',
                fontSize: 9
              },
              {
                text: item.quantity.toString(),
                style: 'tableCell',
                alignment: 'center',
                bold: true
              },
              {
                text: `$${item.selling_price.toFixed(2)}`,
                style: 'tableCell',
                alignment: 'right'
              },
              {
                text: `$${(item.selling_price * item.quantity).toFixed(2)}`,
                style: 'tableCell',
                alignment: 'right',
                bold: true,
                color: '#0066cc'
              }
            ] as any)
          ]
        },
        layout: {
          fillColor: (rowIndex: number) => {
            return rowIndex === 0 ? '#0066cc' : rowIndex % 2 === 0 ? '#f8fafc' : null
          },
          hLineWidth: (i: number, node: any) => {
            return i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5
          },
          vLineWidth: () => 0,
          hLineColor: (i: number, node: any) => {
            return i === 0 || i === 1 || i === node.table.body.length ? '#0066cc' : '#e2e8f0'
          },
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 8,
          paddingBottom: () => 8
        },
        margin: [0, 0, 0, 20]
      },

      // Summary Section
      {
        columns: [
          {
            width: '60%',
            stack: [
              {
                text: 'NOTES:',
                style: 'sectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                text: '• Please check the medicines before leaving the pharmacy',
                style: 'notes',
                margin: [0, 0, 0, 3]
              },
              {
                text: '• Keep medicines in a cool and dry place',
                style: 'notes',
                margin: [0, 0, 0, 3]
              },
              {
                text: '• Follow the dosage as prescribed by your doctor',
                style: 'notes'
              }
            ]
          },
          {
            width: '40%',
            table: {
              widths: ['*', 80],
              body: [
                [
                  { text: 'Subtotal:', style: 'summaryLabel' },
                  { text: `$${subtotal.toFixed(2)}`, style: 'summaryValue' }
                ],
                [
                  { text: 'Tax (5%):', style: 'summaryLabel' },
                  { text: `$${tax.toFixed(2)}`, style: 'summaryValue' }
                ],
                ...(discount > 0 ? [[
                  { text: 'Discount:', style: 'summaryLabel', color: '#ef4444' },
                  { text: `-$${discount.toFixed(2)}`, style: 'summaryValue', color: '#ef4444' }
                ]] : []),
                [
                  {
                    text: 'TOTAL:',
                    style: 'summaryLabel',
                    bold: true,
                    fontSize: 12,
                    fillColor: '#0066cc',
                    color: '#ffffff'
                  },
                  {
                    text: `$${total.toFixed(2)}`,
                    style: 'summaryValue',
                    bold: true,
                    fontSize: 13,
                    fillColor: '#0066cc',
                    color: '#ffffff'
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: (i: number, node: any) => {
                return i === node.table.body.length - 1 ? 0 : 0.5
              },
              vLineWidth: () => 0,
              hLineColor: () => '#e2e8f0',
              paddingLeft: () => 10,
              paddingRight: () => 10,
              paddingTop: () => 6,
              paddingBottom: () => 6
            }
          }
        ],
        margin: [0, 0, 0, 30]
      },

      // Terms and Conditions
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
            lineColor: '#e2e8f0'
          }
        ],
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Terms & Conditions',
        style: 'termsTitle',
        margin: [0, 0, 0, 8]
      },
      {
        ul: [
          'This is a computer-generated invoice and does not require a signature.',
          'All sales are final. Returns are subject to pharmacy policy.',
          'Please retain this invoice for your records.',
          'In case of any discrepancy, please contact us within 24 hours.'
        ],
        style: 'termsList'
      },

      // Digital Stamp
      {
        canvas: [
          {
            type: 'rect',
            x: 400,
            y: -40,
            w: 100,
            h: 40,
            r: 3,
            lineColor: '#10b981',
            lineWidth: 2
          }
        ],
        margin: [0, 20, 0, 0]
      },
      {
        text: 'PAID',
        style: 'paidStamp',
        absolutePosition: { x: 430, y: 730 }
      }
    ],

    styles: {
      pharmacyName: {
        fontSize: 20,
        bold: true,
        color: '#0066cc'
      },
      pharmacyDetails: {
        fontSize: 9,
        color: '#666666'
      },
      invoiceTitle: {
        fontSize: 24,
        bold: true,
        color: '#0066cc'
      },
      invoiceNumber: {
        fontSize: 16,
        bold: true,
        color: '#1f2937'
      },
      invoiceDate: {
        fontSize: 9,
        color: '#666666'
      },
      sectionTitle: {
        fontSize: 10,
        bold: true,
        color: '#0066cc',
        decoration: 'underline',
        decorationColor: '#0066cc'
      },
      customerName: {
        fontSize: 12,
        bold: true,
        color: '#1f2937'
      },
      customerDetails: {
        fontSize: 10,
        color: '#666666'
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        color: '#ffffff',
        fillColor: '#0066cc'
      },
      tableCell: {
        fontSize: 10,
        color: '#1f2937'
      },
      medicineName: {
        fontSize: 11,
        bold: true,
        color: '#1f2937'
      },
      medicineContent: {
        fontSize: 8,
        italics: true
      },
      medicineExtra: {
        fontSize: 7,
        color: '#666666'
      },
      summaryLabel: {
        fontSize: 10,
        color: '#666666',
        alignment: 'right'
      },
      summaryValue: {
        fontSize: 11,
        bold: true,
        color: '#1f2937',
        alignment: 'right'
      },
      notes: {
        fontSize: 8,
        color: '#666666',
        lineHeight: 1.3
      },
      termsTitle: {
        fontSize: 10,
        bold: true,
        color: '#1f2937'
      },
      termsList: {
        fontSize: 8,
        color: '#666666',
        lineHeight: 1.4
      },
      paidStamp: {
        fontSize: 16,
        bold: true,
        color: '#10b981',
        alignment: 'center'
      }
    },

    defaultStyle: {
      font: 'Roboto'
    }
  }

  // Generate and print the PDF
  pdfMake.createPdf(docDefinition).print()
}
