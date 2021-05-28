import http from './httpService'

export function createSalesQuotation(data){
    return http.postMethod('/api/v1/hash/salesQuotation',data,true)
}

export function createDeliveryOrder(data){
    return http.postMethod('/api/v1/hash/deliveryOrder',data,true)
}

export function createPaymentCert(data){
    return http.postMethod('/api/v1/hash/paymentCert',data,true)
}

export function createInvoice(data){
    return http.postMethod('/api/v1/hash/invoice',data,true)
}

export default {
    createSalesQuotation,
    createDeliveryOrder,
    createPaymentCert,
    createInvoice
}