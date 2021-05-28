import swal from "sweetalert";

export function messagePopup(header,message,response){
    swal(header, message, response);
}

export default {
    messagePopup
}