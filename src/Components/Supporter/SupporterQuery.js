import gql from "graphql-tag";
export const supporterQuery = `
query($where:JSON,$last: Int, $first: Int){
  allUserdata(where:$where,last:$last,first:$first){
    totalCount
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
`;

export const getSupporterData = id => `
query{
  allUserdata(where:{id:${id}}){
    Userdata{
     id
      firstname
      lastname
      email
      phonenumber
      dob
      address
      city
      state
			zipcode
      country
      profileimage
			verificationDoc1Url
      verificationDoc2Url
      verificationDoc3Url
      verificationDoc1Name
      verificationDoc2Name
      verificationDoc3Name
    }
  }
}
`;

export const saveUserdata = gql`
  mutation saveUserdata($obj: UserdataInput!) {
    saveUserdata(obj: $obj) {
      id
    }
  }
`;

export const editSupporterData = id => `
query{
  allUserdata(where:{id:${id},active:1,order:"id desc"}){
    Userdata{
     id
      firstname
      lastname
      email
      phonenumber
      active
      dob
      address
      city
      state
      country
      zipcode
      role
      }
  }
}
`;

export const supporterParticipantQuery = `
query($where:JSON,$last: Int, $first: Int){
  allParticipantConnectedSupporters(where:$where,last:$last,first:$first){
    totalCount
    ParticipantConnectedSupporters{
  		id
      supporterId
      participantId
      isSupporterFlagged
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
  id1:  allParticipantConnectedSupporters(where:$where){
    totalCount
    ParticipantConnectedSupporters{
  		id
      supporterId
      participantId
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

export const saveParticipantSupporterQuery = gql`
  mutation saveParticipantConnectedSupporter(
    $obj: ParticipantConnectedSupporterInput!
  ) {
    saveParticipantConnectedSupporter(obj: $obj) {
      id
    }
  }
`;

export const dropdownQuery = `
query{
  allUserdata(where:{role:"SUPPORTER"}){
    Userdata{
      id
      firstname
      lastname
      phonenumber
    }
  }
   id1:allUserdata(where:{role:"PARTICIPANT",active:1}){
    Userdata{
      id
      firstname
      lastname
      phonenumber
    }
  }
}
`;

export const guardiandropdownQuery = `

query allUserdata ($where:JSON){
  allUserdata(where:$where){
    Userdata{
      id
      firstname
      lastname
    }
  }

   id1:allUserdata(where:{role:"SUPPORTER",active:1}){
    Userdata{
      id
      firstname
      lastname
    }
  }
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
      accountname
      accountnumber
      bsb
      cardtypeid
      expiryDate
      isCardLocked
      fkcardtypeidrel{
        Cardtypes{
          id
          cardtype
        }
      }

    }
  }
}
`;

export const updateBankDetail = `
 mutation saveCardDetail($obj: CardDetailInput!) {
  saveCardDetail(obj: $obj) {
    id
    userId
    cardLimit
    cardName
    createdAt
    cardNumber
    cvc,
    accountname,
    accountnumber,
    bsb
  }
}`;

// export const getCardDetailsQuery = `
// query($where:JSON){
//   allCardDetails(where:$where){
//     CardDetails{
//       id
//       businessId
//       cardLimit
//       cardName
//       cardNumber
//       cvc
//       cardstatus
//       userId
//       accountname
//       accountnumber
//       bsb
//       expiryDate

//       isCardLocked
//     }
//   }
// }
// `;

export const supporterdata = `query{
  allUserdata(where:{role:"SUPPORTER"}){
    Userdata{
      id
      firstname
      lastname
    }
  }`;

export const allcardtypes = `
{
  allCardtypes {
    Cardtypes {
      id
      cardtype
    }
  }
}
`;
