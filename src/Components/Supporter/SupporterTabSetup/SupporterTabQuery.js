import gql from "graphql-tag";

export const connectedParticipantQuery = `
query($where:JSON,$last: Int, $first: Int){
  allParticipantConnectedSupporters(where:$where,last:$last,first:$first) {
      totalCount
    ParticipantConnectedSupporters {
      id
      fkParticipantConnectedSupporterParticipantIdrel{
        Userdata{
          id
          firstname
          lastname
          email
          phonenumber
          dob
          address
          city
          ndisNumber
        }
      }
    }
  }
}
`;

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
