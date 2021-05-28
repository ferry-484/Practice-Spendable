export const adminPaymentRequestList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    // {
    //   Header: "Participant",
    //   accessor: "participant",
    //   sortable: false
    // },

    // {
    //   Header: "Supporter",
    //   accessor: "supporter",
    //   sortable: false
    // },
    // {
    //   Header: "Business Member",
    //   accessor: "buisnessMember",
    //   sortable: false
    // },

    {
      Header: "Payment MadeBy",
      accessor: "madeby",
      sortable: false
    },
    {
      Header: "Payment MadeFor",
      accessor: "madefor",
      sortable: false
    },
    {
      Header: "Item Category",
      accessor: "categoryName",
      sortable: false
    },
    {
      Header: "Item Detail",
      accessor: "itemDetail",
      sortable: false
    },
    {
      Header: "Requested Amount",
      accessor: "requestedAmount",
      sortable: false
    },
    {
      Header: "Payment Status",
      accessor: "paymentStatus",
      sortable: false
    }
  ]
};

export const adminParticipantList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "First Name",
      accessor: "firstname",
      sortable: false
    },
    {
      Header: "Last Name",
      accessor: "lastname",
      sortable: false
    },
    {
      Header: "Email",
      accessor: "email",
      sortable: false
    },
    {
      Header: "Mobile No.",
      accessor: "phonenumber",
      sortable: false
    },
    {
      Header: "Date Of Birth",
      accessor: "dob",
      sortable: false
    },
    {
      Header: "Address",
      accessor: "address",
      sortable: false
    }
    // {
    //   Header: "NDIS Number",
    //   accessor: "ndisNumber",
    //   sortable: false
    // }
  ]
};
