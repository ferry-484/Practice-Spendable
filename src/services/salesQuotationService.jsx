import http from './httpService'

export function createSalesQuotation(data){
    return http.postMethod('/api/v1/hash/salesQuotation',data,true)
}

export default {
    createSalesQuotation
}