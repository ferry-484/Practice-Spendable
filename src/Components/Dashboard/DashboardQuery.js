export const dashboardCount = `
  query {
    allBusinesses(where: { active: 1 }) {
      totalCount
    }
    allPaymentRequests {
      totalCount
    }
    id1: allUserdata(where: { role: "PARTICIPANT", active: 1 }) {
      totalCount
    }
    id2: allUserdata(where: { role: "GUARDIAN", active: 1 }) {
      totalCount
    }
    id3: allUserdata(where: { role: "SUPPORTER", active: 1 }) {
      totalCount
    }
  }  
`;

export const guardianDashboardCount = id => `
  query {
    allBusinesses(where: {active: 1 }) {
      totalCount
    }
    id1: allUserdata(where: {guardianId:${id},role: "PARTICIPANT", active: 1 }) {
      totalCount
    }
    id3: allUserdata(where: {role: "SUPPORTER", active: 1 }) {
      totalCount
    }
    id4: allSuperLedgers(where: {guardianId:${id},role: "PARTICIPANT", active: 1 }) {
      totalCount
    }

  }
`;

export const paymentGuardianRequestAllQuery = (guardianId)=> `
query{
  allPaymentRequests{
    totalCount
			PaymentRequests{
      id
      fkPaymentRequestParticipantIdrel(where:{ guardianId : ${guardianId}  }){
        Userdata{
          id
        }
      }
    }
  }
}`;

export const remainingBudgetQueryData = `
query($where:JSON){
  allBudgets(where:$where){
        Budgets{
        budgetAvailable
      }
  }  
}
`

export const superLedgerQuery = `query allSuperLedgers($where:JSON){
  allSuperLedgers (where:$where) {
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
          itemCategoryId
        }
      }
    }
  }
}`;
