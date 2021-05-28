import gql from "graphql-tag";
export const dropdownQuery = `
query{
  allUserdata(where:{role:"PARTICIPANT",active:1}){
    Userdata{
      id
      firstname
      lastname
    }
  }
}`;

export const participantQuery = `
query($where:JSON,$last: Int, $first: Int){
  allUserdata(where:$where,last:$last,first:$first){
    totalCount
    Userdata{
      id
      firstname
      lastname
      email
      phonenumber
      ndisNumber
      dob
      address
      city
      active
      loginDevice
    }
  }
}
`;

export const businessQuery = `query($where:JSON,$last: Int, $first: Int){
  allBusinesses(where:$where,last:$last,first:$first){
          totalCount
    Businesses{
      id
      abnNumber
      storeName
      mobileNo
      contactLocationAdress
      contactLocationCity
      email
      active
    }
  }
}`;

export const saveLedger = gql`
  mutation saveSuperLedger($obj: SuperLedgerInput!) {
    saveSuperLedger(obj: $obj) {
      id
      amountAdded
      businessId
      userId
      cardlimit
    }
  }
`;

export const updateCardLimit = gql`
  mutation saveCardDetail($obj: CardDetailInput!) {
    saveCardDetail(obj: $obj) {
      id
    }
  }
`;

export const superLedgerQuery = `query allSuperLedgers($where:JSON,$last: Int, $first: Int){
  allSuperLedgers (where:$where,last:$last,first:$first) {
    totalCount
    SuperLedgers {
      id
      amountAdded
      businessId
      userId
      txnType
      createdAt
      cardlimit
      txnId
      fkuseridsuperledgermaprel {
        Userdata {
          id
          role
          firstname
          lastname
        }
      }
      fkbusinessidsuperledgermaprel {
        Businesses {
          id
          storeName
          txnLocationCity
          txnLocationCountry
        }
      }
      fkcarddetailiimaprel {
        CardDetails {
          id
          cardLimit
          cardNumber
        }
      }
      fkcreatebysuperledgermaprel{
        Userdata{
          firstname
          lastname
        }
      }
      fkpaymentmaprel{
        PaymentRequests{
          id
          extraNotes
        }
      }
    }
  }
}`;

export const participantQueryData = `
query($where:JSON){
  allUserdata(where:$where){
    Userdata{
      id
      firstname
      lastname
    }
  }
}
`;

export const businessQueryData = `
query($where:JSON){
  allBusinesses(where:$where){
    Businesses{
      id   
      storeManagerName
      storeName
    }
  }
}`;

export const cardData = `
query($where:JSON){
  allCardDetails(where:$where){
    CardDetails{
      id
      businessId
      cardNumber
      userId
      cardLimit
    }
  }   
}
`;
export const GetUserdataNotification = (token, title, body, data) =>
  `mutation{
  UserdataNotification(deviceToken:"${token}",title:"${title}",body:"${body}",data:{type:"${data}"})
}
`;
