import http from './httpService'

export function createPaymentCert(data){
    return http.postMethod('​/api​/v1​/hash​/paymentCert',data ,true)
}

export default {
    createPaymentCert
}