export const paymentGuardianRequestAllQuery = (guardianId) => `
query($where:JSON){
  allPaymentRequests(where:$where){
    totalCount
			PaymentRequests{
      id
      isrelated
        participantId
        supporterId
        businessMemberId
        itemCategoryId
        itemDetail
        requestedAmount
        extraNotes
        cardId
        createdbycardid
        storeId
        externaltransid
        paymentStatus
        createdAt
        createdBy
        paymentStatus
        fkpaymentrequestcreatebymaprel{
          Userdata{
            id
            firstname
            lastname
            role
          }
        }
       fkPaymentRequestParticipantIdrel(where:{ guardianId : ${guardianId}  }){
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
        fkPaymentRequestCreatedbyCardIdrel{
          CardDetails{
            id
            cardName
            cardLimit
            cardNumber
            cardstatus
          }
        }
        fkPaymentRequestStoreIdrel{
          Businesses{
            id
            storeName
          }
        }
    }
  }
}`;

export const paymentGuardianRequestQuery = (guardianId) => `
query($where:JSON,$last: Int, $first: Int){
  
  allPaymentRequests(where:$where,last:$last,first:$first){
    totalCount
			PaymentRequests{
      id
      isrelated
        participantId
        supporterId
        businessMemberId
        itemCategoryId
        itemDetail
        requestedAmount
        extraNotes
        cardId
        createdbycardid
        storeId
        externaltransid
        paymentStatus
        createdAt
        createdBy
        paymentStatus
        fkpaymentrequestcreatebymaprel{
          Userdata{
            id
            firstname
            lastname
            role
          }
        }
       fkPaymentRequestParticipantIdrel(where:{ guardianId : ${guardianId}  }){
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
        fkPaymentRequestCreatedbyCardIdrel{
          CardDetails{
            id
            cardName
            cardLimit
            cardNumber
            cardstatus
          }
        }
        fkPaymentRequestStoreIdrel{
          Businesses{
            id
            storeName
          }
        }
    }
  }
}`;

export const paymentQuery = `
query($where:JSON,$last: Int, $first: Int){
  allPaymentRequests(where:$where,last:$last,first:$first){
    totalCount
			PaymentRequests{
      id
      isrelated
        participantId
        supporterId
        businessMemberId
        itemCategoryId
        itemDetail
        requestedAmount
        extraNotes
        cardId
        createdbycardid
        storeId
        externaltransid
        paymentStatus
        createdAt
        createdBy
        paymentStatus
        fkpaymentrequestcreatebymaprel{
          Userdata{
            id
            firstname
            lastname
            role
          }
        }
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
        fkPaymentRequestCreatedbyCardIdrel{
          CardDetails{
            id
            cardName
            cardLimit
            cardNumber
            cardstatus
          }
        }
        fkPaymentRequestStoreIdrel{
          Businesses{
            id
            storeName
          }
        }
    }
  }
}`;

export const paymentImagesList = `query allRequestItemImages($where:JSON){
  allRequestItemImages(where:$where){
    RequestItemImages{
      id
      itemImageUrl
      paymentRequestId
    }
  }
}`;

export const paymentShoppingList = `query allRequestItemShoppingLists($where:JSON){
  allRequestItemShoppingLists(where:$where){
    RequestItemShoppingLists{
      id
      itemName
      itemPrice
    }
  }
}`;

export const paymentDisputes = `query allDisputes($where:JSON){
  allDisputes(where:$where){
    Disputes{
      id
      createdAt
      createdBy
      disputeStatus
      fkDisputeCreatedbyrel{
        Userdata{
          id
          firstname
          lastname
        }
      }
    }
  }
}
`;

export const userdataQuery = `
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
    }
  }
}

`;

export const disputeQuery = `query allDisputes ($where:JSON){
  allDisputes(where:$where){
    Disputes{
      id
      paymentRequestId 
      createdAt
      createdBy
      disputeStatus
    }
  }
}`;

export const UserdataCardtransfer = (id, amt, desc, flag, isbusiness) =>
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

export const updateCardStatus = (id) =>
  `
mutation  {
    saveCardDetail(obj: {id: ${id}, cardstatus: "1"}) {
    id,cardstatus
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

export const getCardDetailsQuery = `
query($where:JSON){
  allCardDetails(where:$where){
    CardDetails{
      id
      businessId
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

export const updateCardLimit = (userId, id, limit) =>
  `
mutation  {
  saveCardDetail(obj:{userId:${userId},id:${id},cardLimit:${limit}}) {
    id,cardLimit,userId
  }
}`;

export const GetUserdataNotification = (token, title, body, data) =>
  `
mutation{
  UserdataNotification(deviceToken:"${token}",title:"${title}",body:"${body}",data:{type:"${data}"})
}
`;

export const getUserBudget = (userId, itemId) => `query{
  allBudgets(where:{participantId:${userId},itemCategoryId:${itemId}}){
    Budgets{
      id
      budgetAvailable
    }
  }
}`;

export const updateUserBudget = `
  mutation saveBudget($obj: BudgetInput!) {
    saveBudget(obj: $obj) {
      budgetAvailable
    }
  }
`;

// allPaymentRequests(where:$where,last:$last,first:$first){
//   edges{
//     node{
//       participantId
//     }
//   }
// }
