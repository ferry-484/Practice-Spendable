export const connectedPaymentRequestQuery = `
query($where:JSON,$last: Int, $first: Int){
  allPaymentRequests(where:$where,last:$last,first:$first){
    totalCount
    PaymentRequests{
      id
        participantId
        supporterId
        businessMemberId
        itemCategoryId
        itemDetail
        requestedAmount
        paymentStatus
        fkPaymentRequestParticipantIdrel{
          Userdata{
            id
            firstname
            lastname
          }
        }
        fkPaymentRequestSupporterIdrel{
          Userdata{
            id
            firstname
            lastname
          }
        }
        fkPaymentRequestBusinessMemberIdrel{
          Userdata{
            id
            firstname
            lastname
          }
        }
        fkPaymentRequestItemCategoryIdrel{
          MasterItemCategories{
            id
            categoryName
          }
        }
    }
  }
}
`;

export const connectedSupporterQuery = `
query($where:JSON,$last: Int, $first: Int){
  allParticipantConnectedSupporters(where:$where,last:$last,first:$first){
    totalCount
    ParticipantConnectedSupporters{
      id
      isSupporterFlagged
      supporterId
     fkParticipantConnectedSupporterIdrel{
        Userdata{
          id
          firstname
          lastname
          email
          phonenumber
          dob
          address
          city
          active
        }
      }
    }
  }
  id1:allParticipantConnectedSupporters(where:$where){
    totalCount
    ParticipantConnectedSupporters{
      id
     fkParticipantConnectedSupporterIdrel{
        Userdata{
          id
          firstname
          lastname
          email
          phonenumber
          dob
          address
          city
        }
      }
    }
  }
}


`;

export const connectedBuisnessQuery = `
query ($where: JSON,$last:Int,$first:Int) {
  allParticipantConnectedBusinesses(where: $where,last:$last,first:$first) {
    totalCount
    ParticipantConnectedBusinesses{
      id
      isBusinessFlagged
      storeId
     fkParticipantConnectedBusinessStoreIdrel{
        Businesses{
          id
        	storeName
          abnNumber
          mobileNo
          email
          txnLocationAddress
          txnLocationCity
          active
        }
      }
    }
  }
id1: allParticipantConnectedBusinesses(where: $where) {
  totalCount
  ParticipantConnectedBusinesses{
    id
   fkParticipantConnectedBusinessStoreIdrel{
      Businesses{
        id
        storeName
        abnNumber
        mobileNo
        email
        txnLocationAddress
        txnLocationCity
      }
    }
  }
}
}
`;
//FOR GUARDIAN TAB
export const allSupporterConnectedwithParticipant = `
query($where:JSON){  
    allParticipantConnectedSupporters(where:$where) {
      totalCount
      ParticipantConnectedSupporters {
        supporterId
        participantId
        createdAt
        createdBy
        isSupporterFlagged
        id
        participantRating
        fkParticipantConnectedSupporterIdrel(where: { active:1}) {
          Userdata {
            firstname
            lastname
            accesscode
            active
            address
            address2
            businessId
            city
            country
            createdby
            createdon
            deviceNotificationToken
            dob
            email
            emailverified
            gender
            guardianId
            id
            initials
            loginDevice
            ndisNumber
            passcode
            password
            phonenumber
            profileimage
            realm
            role
            state
            updatedby
            updatedon
            username
            verificationDoc1Name
            verificationDoc1Url
            verificationDoc2Name
            verificationDoc2Url
            verificationDoc3Name
            verificationDoc3Url
            verificationtoken
            zipcode
            emailVerified
            verificationToken
            business_id
          }
        }
      }
    }
  }`;
export const OnlyParticipantConnectedBusinesses = `
  query ($where: JSON) {
    allParticipantConnectedBusinesses(where: $where) { 
      totalCount
      ParticipantConnectedBusinesses{
        isBusinessFlagged
        fkParticipantConnectedBusinessStoreIdrel(where: { active:1}){
          Businesses{
            id
            storeTelephoneNo
            storeManagerName
            storeName
            mobileNo
            email
            txnLocationAddress
            txnLocationCity
            abnNumber
          }
        }
      }
    }
  }`;

export const UserdataCardtransfer = (id, amt, desc, isbusiness) =>
  `
mutation {
  UserdataCardtransfer(userid:${id},amount:"${amt}",description:"${desc}",flag:0,isbusiness:${isbusiness})
}
`;
export const UserdataCardBlock = (id, isbusiness) =>
  `
mutation {
  UserdataCardBlock(userid:${id},isbusiness:${isbusiness})
}
`;

export const UserdataCheckBalance = (id, isbusiness) =>
  `
mutation {
  UserdataCheckBalance(userid:${id},isbusiness:${isbusiness})
}
`;
export const getCardDetailsQuery = `
query($where:JSON){
  allCardDetails(where:$where){
    CardDetails{
      id
      cardLimit
      cardName
      cardNumber
      cvc
      cardstatus
      userId
      accountname
      accountnumber
      bsb
      expiryDate

      isCardLocked
    }
  }
}
`;
export const updateCardStatus = id =>
  `
mutation  {
    saveCardDetail(obj: {id: ${id}, cardstatus: "1"}) {
    id,cardstatus
  }
}`;

export const updateCardLimit = (userId, id, limit) =>
  `
mutation  {
  saveCardDetail(obj:{userId:${userId},id:${id},cardLimit:${limit}}) {
    id,cardLimit,userId
  }
}`;

export const updateSuperledger = `
mutation saveSuperLedger($obj: SuperLedgerInput!) {
saveSuperLedger(obj: $obj) {
id
userId
fkuseridsuperledgermaprel {
Userdata {
loginDevice
plateform
}
}
}
}
`;

export const destroysupporterconnection = id =>
  `
mutation {ParticipantConnectedSupporterDeleteById(id: ${id})}
`;
export const destroybusinessconnection = id =>
  `mutation{
    ParticipantConnectedBusinessDeleteById(id:${id})
}`;

export const supporterdata = `query{
  allUserdata(where:{role:"SUPPORTER"}){
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

export const GetUserdataNotification = (token, title, body, data) =>
  `
mutation{
  UserdataNotification(deviceToken:"${token}",title:"${title}",body:"${body}",data:{type:"${data}"})
}
`;
