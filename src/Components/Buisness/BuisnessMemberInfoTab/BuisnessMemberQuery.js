export const connectedParticipantQuery = `query ($where: JSON,$last:Int,$first:Int) {
  allParticipantConnectedBusinesses(where: $where,last:$last,first:$first) {
    totalCount
    ParticipantConnectedBusinesses {
      id
    	fkParticipantConnectedBusinessParticipantIdrel{
        Userdata{
          id
          firstname
          lastname
          email
          dob
          phonenumber
          address
          city
          ndisNumber
        }
      }
    }
  }
}
`;

export const buisnessPaymentRequestQuery = `
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
            firstname
            lastname
          }
        }
        fkPaymentRequestSupporterIdrel{
          Userdata{
            firstname
            lastname
          }
        }
        fkPaymentRequestBusinessMemberIdrel{
          Userdata{
            firstname
            lastname
          }
        }
        fkPaymentRequestItemCategoryIdrel{
          MasterItemCategories{
            categoryName
          }
        }
    }
  }
}
`;
