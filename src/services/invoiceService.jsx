import http from './httpService'

export function getSalesInvoiceData(){
    return http.getMethod('/invoice')
}

export function getSalesNOAData(){
    return http.getMethod('/noa')
}

export function getPurchaseInvoiceData(){
    return http.getMethod('/invoice')
}

export function getPurchaseNOAData(){
    return http.getMethod('/noa')
}

export function createInvoice(data){
    return http.postMethod('/api/v1/hash/invoice',data,true)
}

export default {
    getSalesInvoiceData,
    getSalesNOAData,
    getPurchaseInvoiceData,
    getPurchaseNOAData,
    createInvoice
}

