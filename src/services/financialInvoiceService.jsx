import http from './httpService'

export function getFinancialInvoices(){
   http.getMethod('/')
}

export function getFinancialInvoice(id){
    http.getMethod(`/${id}`)  
}

