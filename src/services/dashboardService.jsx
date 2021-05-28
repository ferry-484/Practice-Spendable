import http from './httpService'

export function getSalesGraphData( interval = 'monthly'){
    // return  new Promise(function(resolve, reject) {
    //      resolve([1,2,3,4,5]);
    //   });
        switch(interval){
            case 'monthly':
                return http.getMethod('/')
            case 'quarterly':
                return http.getMethod('/')
            case 'half-yearly':
                return http.getMethod('/')
            case 'yearly':
                return http.getMethod('/')            
            default :
        }
    
}

export function getPurchasesGraphData(interval = 'monthly'){
    // return  new Promise(function(resolve, reject) {
    //     resolve(['1','2'])
    //  });
    switch(interval){
        case 'monthly':
            return http.getMethod('/')
        case 'quarterly':
            return http.getMethod('/')
        case 'half-yearly':
            return http.getMethod('/')
        case 'yearly':
            return http.getMethod('/')            
        default :
    } 
}

export function getSalesOverviewTableData(flag = 'show-all'){
    // return  new Promise(function(resolve, reject) {
    //     resolve(['A','B'])
    //  });
        switch(flag){
            case 'show-all':
                return http.getMethod('/')
            case 'recently-created':
                return http.getMethod('/')
            case 'pending':
                return http.getMethod('/')      
            default :
        }
}

export function getPurchasesOverviewTableData(flag = 'show-all'){
    // return  new Promise(function(resolve, reject) {
    //     resolve(['X','Y'])
    //  });
    switch(flag){
        case 'show-all':
            return http.getMethod('/')
        case 'recently-created':
            return http.getMethod('/')
        case 'pending':
            return http.getMethod('/')      
        default :
    }
}



export default {
   getSalesGraphData,
   getPurchasesGraphData,
   getSalesOverviewTableData,
   getPurchasesOverviewTableData
}