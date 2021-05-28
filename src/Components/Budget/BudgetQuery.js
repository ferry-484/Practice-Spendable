import gql from "graphql-tag";

export const budgetQuery = `
query($where:JSON,$last: Int, $first: Int){
  allBudgets(where:$where,last:$last,first:$first){
    totalCount
    Budgets{
      id
      budgetAvailable
      createdAt
      fkBudgetParticipantIdrel{
       Userdata{
        firstname
        lastname
        role
      }
      }
      fkSupporterIdBudgetMaprel{
        Userdata{
          firstname
          lastname
          role
        }
      }
      fkBusinessIdBudgetMaprel{
        Businesses{
          storeName   
          id
        }
      }
      fkBudgetItemCategoryIdrel{
        MasterItemCategories{
          categoryName
          isActive
          fktiertypemaprel{
            Tiertypes{
              id
              tierType
            }
          }
        }
      }
    }

  }
}
`;

export const saveBudget = gql`
  mutation saveBudget($obj: BudgetInput!) {
    saveBudget(obj: $obj) {
      id
    }
  }
`;

export const participantQuery = `
query{
  allUserdata(where:{active:1}){
    Userdata{
      id
      firstname
      lastname
    }
  }
}
`;

export const getAllItemCategory = `
query{
  allMasterItemCategories{
    MasterItemCategories{
      categoryName
      id
    }
  }
}
`;

// export const editBudgetQuery = id => `
// query{
//   allBudgets(where:{id:${id}}){
//     Budgets{
//      id
//         budgetAvailable

//       }
//   }
// }
// `;

export const editBudgetQuery = id => `
query{
    allBudgets (where:{id:${id}}){
      Budgets{
        id
          itemCategoryId
          budgetAvailable
        participantId

        fkBudgetParticipantIdrel{
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

export const participantQueryData = `
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

export const categoryQueryData = `
query($where:JSON){
  allMasterItemCategories(where:$where){
    MasterItemCategories{
      id
      categoryName
      tierId
      isActive
    }
  }
}
`;

export const businessQueryData = `
query($where:JSON){
  allBusinesses(where:$where){
    Businesses{
      id   
      storeManagerName
      storeName
    }
  }
}`;

export const budgetTotalData = `
query($where:JSON){
  allBudgets(where:$where){
    totalCount
    Budgets{
      id
      budgetAvailable
      createdAt
      fkBudgetParticipantIdrel{
       Userdata{
        firstname
        lastname
      }
      }
      fkBudgetItemCategoryIdrel{
        MasterItemCategories{
          categoryName
          id
        }
      }
    }
  }
}
`;

export const getAllTier = `
{
  allTiertypes(where:{active:1}){
    Tiertypes{
      id
      tierType
    }
  }
}`;
