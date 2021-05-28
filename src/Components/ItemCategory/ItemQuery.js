import gql from "graphql-tag";
export const itemCategoryQuery = `
query allMasterItemCategories($where:JSON,$last: Int, $first: Int){
    allMasterItemCategories(where:$where,last:$last,first:$first){
      totalCount
      MasterItemCategories{
        id
        categoryName
        isActive
        fktiertypemaprel{
          Tiertypes{
            tierType
          }
        }
      
      }
    }
  }
`;

export const saveMasterItemCategory = gql`
  mutation saveMasterItemCategory($obj: MasterItemCategoryInput!) {
    saveMasterItemCategory(obj: $obj) {
      id
    }
  }
`;

export const itemCategoryId = id => `
query{
  allMasterItemCategories(where:{id:${id}}){
    MasterItemCategories{
     id
      categoryName
      tierId
      isActive
      }
  }
}
`;

export const saveTier = gql`
  mutation saveTiertype($obj: TiertypeInput!) {
    saveTiertype(obj: $obj) {
      id
    }
  }
`;

export const tierQuery = `
query($where:JSON){
  allTiertypes(where:$where){
    totalCount
    Tiertypes{
      id
      tierType
      active
    }
  }
}
`;

export const tierDropdownData = `
query{
  allTiertypes(where:{active:1}){
    totalCount
    Tiertypes{
      id
      tierType
      active
    }
  }
}
`;
