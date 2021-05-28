import gql from "graphql-tag";
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
    }
  }
}
`;

export const getParticipantData = id => `
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
      ndisNumber
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

export const editParticipantData = id => `
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
      ndisNumber
      guardianId
      role
      userguardianidmaprel{
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

export const saveUserdata = gql`
  mutation saveUserdata($obj: UserdataInput!) {
    saveUserdata(obj: $obj) {
      id
    }
  }
`;

export const guardianDropdownData = `
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
