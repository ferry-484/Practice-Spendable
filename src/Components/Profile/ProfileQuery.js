import gql from "graphql-tag";

export const saveUserdata = gql`
  mutation saveUserdata($obj: UserdataInput!) {
    saveUserdata(obj: $obj) {
      id
    }
  }
`;

export const editProfileData = id => `
query{
  allUserdata(where:{id:${id},active:1}){
    Userdata{
     id
      firstname
      lastname
      email
      phonenumber
      active
      address
      city
      state
      country
      zipcode
      role
      }
  }
}`;

export const UserdataChangePassword = gql`
  mutation UserdataChangePassword(
    $id: JSON
    $oldPassword: String
    $newPassword: String
  ) {
    UserdataChangePassword(
      id: $id
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
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
