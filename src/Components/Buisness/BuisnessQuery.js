import gql from "graphql-tag";

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

export const allBusinessesInfo = id => `query{
  allBusinesses(where:{id:${id}}){
    Businesses{
      id
      storeName  
      abnNumber
      mobileNo
      storeTelephoneNo
      websiteUrl
      email
      txnLocationAddress
      txnLocationCity
      txnLocationState
      txnLocationCountry
      txnLocationZipCode
      contactLocationAdress
      contactLocationCity
      contactLocationState
      contactLocationCountry
      contactLocationZipCode
      storeManagerName
    }
  }
}`;

export const saveBusiness = gql`
  mutation saveBusiness($obj: BusinessInput!) {
    saveBusiness(obj: $obj) {
      id
    }
  }
`;

export const allBusinessesMemberInfo = (id, last, first) => `
query{
  allUserdata(where:{businessId:${id},active:1,order:"id desc"},last:${last},first:${first}){
    totalCount
    Userdata{
     id
      firstname
      lastname
      email
      phonenumber
      active
      dob
      fkUserdataBusinessIdrel{
        Businesses
        {
          storeName
        }
      }
      }
  }
}
`;

export const allBusinessesMemberDataInfo = id => `
query{
  allUserdata(where: {id: ${id},active:1}) {
    Userdata {
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
      fkUserdataBusinessIdrel{
        Businesses{
          storeName
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

export const editBusinessesMemberInfo = id => `
query{
  allUserdata(where: {id: ${id},active:1}) {
    Userdata {
      id
      firstname
      lastname
      email
      phonenumber
      businessId
      role
      active
      dob
      address
      city
      state
      country
      zipcode
    }
  }
}
`;

export const businessParticipantQuery = `
query($where:JSON,$last: Int, $first: Int){
  allParticipantConnectedBusinesses(where:$where,last:$last,first:$first){
    totalCount
    ParticipantConnectedBusinesses{
      id
      participantId
      fkParticipantConnectedBusinessStoreIdrel{
        Businesses{
          id
          storeName
          abnNumber
          mobileNo
          contactLocationAdress
          contactLocationCity
          email
        }
      }
    }
  }
}
`;

export const saveParticipantBusinessQuery = gql`
  mutation saveParticipantConnectedBusiness(
    $obj: ParticipantConnectedBusinessInput!
  ) {
    saveParticipantConnectedBusiness(obj: $obj) {
      id
    }
  }
`;

export const dropdownQuery = `
query{
  allUserdata(where:{role:"PARTICIPANT",active:1}){
    Userdata{
      id
      firstname
      lastname
    }
  }
  allBusinesses(where:{active:1}){
    Businesses{
      id
      storeName
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
  allBusinesses(where:{active:1}){
    Businesses{
      id
      storeName
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
