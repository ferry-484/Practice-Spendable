export const adminPaymentRequestList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
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
    // {
    //   Header: "Buisness Member",
    //   accessor: "buisnessMemberName",
    //   sortable: false
    // },
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
      Header: "Extra Notes",
      accessor: "extraNotes",
      sortable: false
    },
    {
      Header: "Added On",
      accessor: "createdAt",
      sortable: false
    },
    {
      Header: "Payment Status",
      accessor: "paymentStatus",
      sortable: false
    },
     {
       Header: "Store Name",
       accessor: "storeName",
       sortable: false
     },
    {
      Header: "PPAN",
      accessor: "cardNumber",
      sortable: false
    },
    {
      Header: "Status",
      accessor: "cardStatus",
      sortable: false
    }
  ]
};
