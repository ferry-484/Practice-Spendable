import http from './httpService'

export function createDeliveryOrder(data){
    return http.postMethod('​/api/v1/hash/deliveryOrder',data)
}

export default {
    createDeliveryOrder
}