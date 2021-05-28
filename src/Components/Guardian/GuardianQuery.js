import gql from "graphql-tag";
export const guardianQuery = `
query($where:JSON,$last: Int, $first: Int){
  allUserdata(where:$where,last:$last,first:$first){
    totalCount
    Userdata{
      id
      firstname
      lastname
      email
      phonenumber
      address
      city
      active
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

export const allGuardianData = id => `
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

export const allGuardianParticipantInfo = (id, last, first) => `
query{
  allUserdata(where:{guardianId:${id},active:1,order:"id desc"},last:${last},first:${first}){
    totalCount
    Userdata{
     id
      firstname
      lastname
      email
      phonenumber
      active
      address
      city
      active
      }
  }
}
`;

export const editGuardianPaticipantInfo = id => `
query{
  allUserdata(where: {id: ${id},active:1}) {
    Userdata {
      id
      firstname
      lastname
      dob
      email
      phonenumber
      address
      city
      state
      country
      zipcode
      guardianId
      role
      active
    }
  }
}
`;
