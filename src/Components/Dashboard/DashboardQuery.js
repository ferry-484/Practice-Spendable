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