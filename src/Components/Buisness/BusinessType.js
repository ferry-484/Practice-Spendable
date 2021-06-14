import React, { Component } from 'react'
import { Button, 
  Dialog, 
  FormControl, 
  IconButton, 
  TextField, 
  Typography, withStyles } from '@material-ui/core'
import CloseIcon from "@material-ui/icons/Close"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import { fetchMethod } from '../../FetchMethod'
import { activateDeactivateBusinessTypes, addBusinessType, businessTypesListing } from './BuisnessQuery'
import swal from 'sweetalert'
import { DotLoader } from 'react-spinners'
import ReactTableComponent from '../../ReactTable/ReactTable'
import { adminBusinessTypesList } from './BuisnessConfig'
import Activate from "../../assets/Activate_User.svg"
import Delete from "../../assets/delete.svg";
import Deactivate from "../../assets/Deactivate_User.svg"
import Edit from "../../assets/edit.svg"
import "./buisness.css";

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
});
  
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                    >
                    <CloseIcon />
                </IconButton>
            ) : null}
            <Typography variant="h6">{children}</Typography>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2)
    }
}))(MuiDialogContent);
  
const DialogButton = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1)
    }
}))(MuiDialogActions);

export class BusinessTypeListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            businessType: undefined,
            listData: undefined,
            count: 0,
            pageNo: parseInt(localStorage.getItem("rows")),
            rows: parseInt(localStorage.getItem("rows")),
            editBusinessType: {} ,
            pagenewNo: parseInt(localStorage.getItem("rows")),
           rowsnewNo: parseInt(localStorage.getItem("rows")),
        }
    }

    componentWillMount() {
        this.getBusinessTypes();
    }

    getBusinessTypes = () => {
        fetchMethod(businessTypesListing, {
          last: this.state.rowsnewNo,
          first: this.state.pagenewNo,
        })
        .then(res => res.json())
        .then(res => {
          if(res?.data?.allMasterBusinessTypes?.MasterBusinessTypes.length) {
            this.setState({
                count: res?.data?.allMasterBusinessTypes?.totalCount,
                listData: res?.data?.allMasterBusinessTypes?.MasterBusinessTypes
            })
          }
        })
        .catch(e => {
            swal({ title: e.message, icon: "warning" });
            this.setState({ listData: [] });
        });
    }

    handleClose = () => {
        this.setState({
            openModal: false
        })
    }

    openModalBox = () => {
        this.setState({
            openModal: true,
            editBusinessType: {},
            businessType: undefined
        })
    }

    handleActivateDeactivate = (row) => {
        console.log(row)
        if(row.isActive === 1 || row.isActive === "1") {
            swal({
                title: "Are you sure you really want to deactivate this record",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(() => {
                fetchMethod(activateDeactivateBusinessTypes, {obj: {id: row.id, businessType: row.businessType, isActive: 0}})
                .then(res => res.json())
                .then(res => {
                    const id = res?.data?.saveMasterBusinessType?.id;
                    swal({
                        title: id
                          ? "Deactivated successfully"
                          : "Error in deactivating.",
                        icon: "success"
                    });
                    this.getBusinessTypes();
                    console.log(res);
                })
            })
            .catch(e => {
                swal("Something went wrong",{
                    icon: 'warning'
                })
              this.setState({ listData: [] });
            })
        }
        if(row.isActive === 0 || row.isActive === "0") {
            swal({
                title: "Are you sure you really want to activate this record.",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(() => {
                fetchMethod(activateDeactivateBusinessTypes, {obj: {id: row.id, businessType: row.businessType, isActive: 1}})
                .then(res => res.json())
                .then(res => {
                    const id = res?.data?.saveMasterBusinessType?.id;
                    swal({
                        title: id ? "Activated successfully" : "Error in activating.",
                        icon: "success"
                    });
                    this.getBusinessTypes();
                })
            })
            .catch(e => {
                swal("Something went wrong",{
                    icon: 'warning'
                })
              this.setState({ listData: [] });
            })
        }
    }

    handleEditModal = (row) => {
        this.setState({
            openModal: true,
            editBusinessType: row
        })
    }

    editdataBusinessType = (row) => {
      // fetchMethod(activateDeactivateBusinessTypes, {obj:
      //   {id: this.state.editBusinessType.id, businessType: this.state.businessType, isActive: 1}})
      // .then(res => res.json())
      // .then(resp => {
      //     console.log(resp)
      //     if(resp?.data?.MasterBusinessTypeAdd?.status === 200) {
      //         this.setState({
      //             openModal: false
      //         })
      //         swal("Edit Business succesfully", {
      //             icon: 'success'
      //         })
      //     } else {
      //         swal(resp?.data?.MasterBusinessTypeAdd?.msg || "Something went wrong", {
      //             icon: 'warning'
      //         })
      //     }
      //     this.getBusinessTypes();
      // })
      // .catch(err => {
      //     swal(err.msg || "Something went wrong", {
      //         icon: 'warning'
      //     })
      // })

      fetchMethod(activateDeactivateBusinessTypes, {obj: 
        {id: this.state.editBusinessType, businessType: this.state.businessType, isActive: 1}})
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const id = res?.data?.saveMasterBusinessType?.id;
        swal({
            title: id
              ? "Edited successfully"
              : "Error in Editing.",
            icon: "success"
        });
        this.getBusinessTypes();
        console.log(res);
    })
    .catch(e => {
      swal("Something went wrong",{
          icon: 'warning'
      })
    //this.setState({ listData: [] });
  })
  }


    saveBusinessType = () => {
        fetchMethod(addBusinessType, {obj: {business_type: this.state.businessType, isActive: 1}})
        .then(res => res.json())
        .then(resp => {
            console.log(resp)
            if(resp?.data?.MasterBusinessTypeAdd?.status === 200) {
                this.setState({
                    openModal: false
                })
                swal("Business type added succesfully", {
                    icon: 'success'
                })
            } else {
                swal(resp?.data?.MasterBusinessTypeAdd?.msg || "Something went wrong", {
                    icon: 'warning'
                })
            }
            this.getBusinessTypes();
        })
        .catch(err => {
            swal(err.msg || "Something went wrong", {
                icon: 'warning'
            })
        })
    }

    updatePagination = (pageNumber, size) => {
        this.setState(
          {
            pagenewNo: pageNumber,
            rowsnewNo: size,
          },
          () => {
            this.getBusinessTypes();
          }
        );
    };

    debounce = (debounceTimer, func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
    return debounceTimer;
  };
  debounceTimer = null;

    render() {
        const nameColumn = [
            {
              Header: "S No.",
              Cell: row => {
                return <div className="dot">{row.original.sNo}</div>;
              },
              width: 60
            }
        ];

        const actionButton = [
            {
                Header: "",
                sortable: false,
                Cell: row => (
                  <div className="action">
                    {row.original.isActive == 1 ? (
                      <IconButton
                        aria-label="edit"
                        onClick={() => this.handleEditModal(row.original)}
                      >
                        <img src={Edit} alt="Edit" />
                      </IconButton>
                    ) : (
                      ""
                    )}
                    <IconButton
                      className="statusLink"
                      aria-label="delete"
                      onClick={() => this.handleActivateDeactivate(row.original)}
                    >
                       {/* <img src={Delete} alt="Delete" /> */}
                
                      {row.original.isActive === 1 ? (
                        <img src={Delete} alt="Delete" />
                      ) : (
                        <img src={Delete} alt="Delete" color="disabled"
                         />
                      )}
                      {/* <img src={Delete} alt="Delete" /> */}
                    </IconButton>
                  </div>
                )
            }
        ]

        // const actionButton = [
        //   // {
        //   //   Header: "View Members",
        //   //   sortable: false,
        //   //   Cell: row => (
        //   //     <div
        //   //       onClick={() => {
        //   //         this.viewMember(row.original);
        //   //       }}
        //   //     >
        //   //       <span>View</span>
        //   //     </div>
        //   //   )
        //   // },
        //   // {
        //   //   Header: "View Card",
        //   //   sortable: false,
        //   //   Cell: row => (
        //   //     <div
        //   //       onClick={() => {
        //   //         this.openModalBox(row.original);
        //   //       }}
        //   //     >
        //   //       <span className="viewimageLink">
        //   //         <u>View</u>
        //   //       </span>
        //   //     </div>
        //   //   )
        //   // },
        //   {
        //     Header: "",
        //     sortable: false,
        //     Cell: row => (
        //       <div className="action">
        //         {/* {row.original.active == 1 ? ( */}
        //           <IconButton
        //             aria-label="edit"
        //             onClick={() => this.handleEditModal(row.original)}
        //           >
        //             <img src={Edit} alt="Edit" />
        //           </IconButton>
        //           <IconButton
        //           aria-label="delete"
        //           onClick={() => this.handleDelete(row.original)}
        //         >
        //           <img src={Delete} alt="Delete" />
        //         </IconButton>
        //         {/* ) : ( */}
        //           {/* "" */}
        //         {/* )} */}
        //         {/* <IconButton
        //           className="statusLink"
        //           aria-label="delete"
        //           onClick={() => this.handleDelete(row.original)}
        //         >
        //           {row.original.active === 1 ? (
        //             <img src={Activate} alt="ACTIVATE" />
        //           ) : (
        //             <img src={Deactivate} alt="Delete" />
        //           )} */}
        //           {/* <img src={Delete} alt="Delete" /> */}
        //         {/* </IconButton> */}
        //       </div>
        //     )
        //   }
        // ];
    
        const columns = nameColumn.concat(adminBusinessTypesList.columns).concat(actionButton)

        return (
            <div>
                <div className="buisnessSection">
                    <h3>Business Types</h3>
                    <div className="formFlex addType">
                      <Button onClick={this.openModalBox}>Add Type</Button>
                    </div>
                    <Dialog
                        open={this.state.openModal}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        ariadescribedby="simple-modal-description"
                        className="chooseBuisness"
                    >
                        <DialogTitle onClose={this.handleClose}>
                            {this.state.editBusinessType.businessType ? "Edit" : "Add" } Business Type
                        </DialogTitle>
                        <DialogContent>
                            <FormControl>
                                <TextField id="outlined-basic" label="Business type" value={this.state.editBusinessType.businessType} variant="outlined" 
                                onChange={evt => this.setState({businessType: evt.target.value})}/>
                            </FormControl>
                        </DialogContent>
                        <DialogButton>
                            <Button onClick={() => this.handleClose()}>Cancel</Button>
                             <Button onClick={() => this.state.editBusinessType ? this.editdataBusinessType() : this.saveBusinessType()
                              }>Save</Button> 
                           {/* <Button onClick={() => this.saveBusinessType()
                              }>Save</Button> */}
                        </DialogButton>
                    </Dialog>

                    {this.state.listData ? (
                        <div className="bussinessDataTable">
                            <ReactTableComponent
                                listData={this.state.listData}
                                listConfig={adminBusinessTypesList}
                                columns={columns}
                                dataCount={this.state.count}
                                updatePagination={this.updatePagination}
                                initialPage=
                                {
                                  this.state.listData
                                  ? this.state.pagenewNo / this.state.rowsnewNo
                                  : this.state.pageNo / this.state.rows
                                }
                                onRowClick={() => {}}
                                forSerialNo={
                                  this.state.listData
                                  ? {
                                      pageNo: this.state.pagenewNo,
                                      pageSize: this.state.rowsnewNo,
                                    }
                                  : { pageNo: this.state.pageNo, pageSize: this.state.rows }
                                }
                            />
                        </div>
                        ) : (
                        <div className="spinner">
                            <DotLoader size={70} color={"#020f1f"} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default BusinessTypeListing




// import React, { Component } from "react";
// import SearchIcon from "../../assets/search.svg";
// import { 
//   Button, 
//   Dialog, 
//   FormControl, 
//   IconButton, 
//   TextField, 
//   Typography, 
//   } from '@material-ui/core';

// import ReactTableComponent from "../../ReactTable/ReactTable";
// import { adminBusinessTypesList } from './BuisnessConfig'
// import Edit from "../../assets/edit.svg";
// import Delete from "../../assets/delete.svg";
// import Activate from "../../assets/Activate_User.svg";
// import Deactivate from "../../assets/Deactivate_User.svg";
// import { fetchMethod } from "../../FetchMethod";
// import {
//   businessQuery,
//   businessType,   
//   saveBusiness,
//   saveMasterBusinessType,
//   addbusinessTypeQuery,
//   getCardDetailsQuery,
// } from "./BuisnessQuery";

// import { 
//   activateDeactivateBusinessTypes, 
//   addBusinessType, 
//   businessTypesListing } from './BuisnessQuery';
// import { DotLoader } from "react-spinners";
// import swal from "sweetalert";
// import "./buisness.css";
// import MuiDialogTitle from "@material-ui/core/DialogTitle";
// import MuiDialogContent from "@material-ui/core/DialogContent";
// import CloseIcon from "@material-ui/icons/Close";
// import { withStyles } from "@material-ui/core/styles";
// import MuiDialogActions from "@material-ui/core/DialogActions";
// import { withRouter } from "react-router-dom";
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: "absolute",
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           className={classes.closeButton}
//           onClick={onClose}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//       <Typography variant="h6">{children}</Typography>
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogButton = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

// class BuisnessType extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       openModal: false,
//       pageNo: parseInt(localStorage.getItem("rows")),
//       rows: parseInt(localStorage.getItem("rows")),
//       listData: undefined,
//       filter: {
//         // active: 1,
//         order: "id asc",
//       },
//       search: "",
//       count: 0,
//       businessType: undefined,
//       cardData: [],
//   editBusinessType: {}
//     };
//   }

//   componentWillMount() {
//     this.getBusinessTypes();
//   }

//   //   componentDidMount(){
//   //       this.saveBusinessType();
//   //   }

//   //   getBuisnessData = () => {
//   //     fetchMethod(addbusinessTypeQuery, {
//   //       where: this.state.filter,
//   //       last: this.state.rows,
//   //       first: this.state.pageNo
//   //     })
//   //       .then(res => res.json())
//   //       .then(res => {
//   //         console.log(res)
//   //         if (res && res.error && res.error.statusCode === 401) {
//   //           swal({ title: res.error.message, icon: "warning" }).then(() => {
//   //             localStorage.clear();
//   //             window.location = "/";
//   //           });
//   //         } else {
//   //           this.setState({
//   //             count:
//   //               res.data &&
//   //               res.data.allMasterBusinessTypes &&
//   //               res.data.allMasterBusinessTypes !== null
//   //                 ? res.data.allMasterBusinessTypes.totalCount
//   //                 : "",
//   //             listData:
//   //               res.data &&
//   //               res.data.allMasterBusinessTypes &&
//   //               res.data.allMasterBusinessTypes !== null
//   //                 ? res.data.allMasterBusinessTypes.MasterBusinessTypes
//   //                 : ""
//   //           });
//   //         }
//   //       })
//   //       .catch(e => {
//   //         swal({ title: e.message, icon: "warning" });
//   //         this.setState({ listData: [] });
//   //       });
//   //   };

// updatePagination = (pageNumber, size) => {
//   this.setState(
//     {
//       pageNo: pageNumber,
//       rows: size
//     },
//     () => {
//       this.getBusinessTypes();
//     }
//   );
// };

//   // debounce = (debounceTimer, func, delay) => {
//   //   clearTimeout(debounceTimer);
//   //   debounceTimer = setTimeout(func, delay);
//   //   return debounceTimer;
//   // };
//   // debounceTimer = null;

//   // handleSearchChange = event => {
//   //   let { filter } = this.state;
//   //   // filter = { storeName: { like: `%${event.target.value}%` } };
//   //   filter["and"] = [
//   //     {
//   //       or: [
//   //         { storeName: { like: `%${event.target.value}%` } },
//   //         { contactLocationCity: { like: `%${event.target.value}%` } }
//   //       ]
//   //     }
//   //   ];

//   //   this.setState({ listData: undefined });
//   //   this.setState({
//   //     search: event.target.value,
//   //     filter,
//   //     pageNo: this.state.rows
//   //   });
//   //   this.debounceTimer = this.debounce(
//   //     this.debounceTimer,
//   //     () => {
//   //       this.getBuisnessData();
//   //     },
//   //     200
//   //   );
//   // };

//   getBuisnessData = () => {
//     // this.setState({ listData: [], count: 0 });
//     fetchMethod(addbusinessTypeQuery, {
//       where: this.state.filter,
//       last: this.state.rowsnewNo,
//       first: this.state.pagenewNo,
//     })
//       .then((res) => res.json())
//       .then(
//         (res) => {
//           console.log(res);
//           if (res && res.error && res.error.statusCode === 401) {
//             swal({ title: res.error.message, icon: "warning" }).then(() => {
//               localStorage.clear();
//               window.location = "/";
//             });
//           } else {
//             res.data.allMasterBusinessTypes.MasterBusinessTypes.map((item) => {
//               return (item.businesstype = item.businessType);
//             });
//             this.setState({
//               listData:
//                 res.data &&
//                 res.data.allMasterBusinessTypes &&
//                 res.data.allMasterBusinessTypes !== null
//                   ? res.data.allMasterBusinessTypes.MasterBusinessTypes
//                   : "",
//             });
//           }
//         },
//         () => {
//           // this.BusinessmodalDropdownData();
//         }
//       )
//       .catch((e) => {
//         swal({ title: e.message, icon: "warning" });
//         this.setState({ listData: [] });
//       });
//   };

//   getBusinessTypes = () => {  
//   fetchMethod(businessTypesListing)
//   .then(res => res.json())
//   .then(res => {
//     if(res?.data?.allMasterBusinessTypes?.MasterBusinessTypes.length) {
//       this.setState({
//           count: res?.data?.allMasterBusinessTypes?.totalCount,
//           listData: res?.data?.allMasterBusinessTypes?.MasterBusinessTypes
//       })
//     }
//   })
//   .catch(e => {
//       swal({ title: e.message, icon: "warning" });
//       this.setState({ listData: [] });
//   });
// }

//   handleDelete = (row) => {
//     if (row.active === 1 || row.active === "1") {
//       swal({
//         title: "Are you sure you really want to deactivate this record",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//       }).then((willDelete) => {
//         if (willDelete) {
//           const test = {
//             id: row.id,
//             active: 0,
//           };

//           fetchMethod(saveBusiness, { obj: test })
//             .then((res) => res.json())
//             .then((res) => {
//               const id = res.data.saveBusiness.id;
//               swal({
//                 title: id
//                   ? "Deactivated successfully"
//                   : "Error in deactivating.",
//                 icon: "success",
//               });
//               if (id) {
//                 let pageNo = this.state.pageNo;
//                 let previousData = this.state.listData.length;
//                 this.setState({ listData: undefined });

//                 const { filter } = this.state;

//                 let search = this.state.search;

//                 if (this.state.search != "" && previousData === 1) {
//                   pageNo = this.state.rows;
//                   delete filter["and"];
//                   search = "";
//                 } else if (
//                   this.state.search == "" &&
//                   previousData === 1 &&
//                   pageNo != this.state.rows
//                 ) {
//                   pageNo = this.state.pageNo - this.state.rows;
//                 } else {
//                   pageNo = this.state.pageNo;
//                 }

//                 this.setState({ pageNo, filter, search }, () =>
//                   this.getBuisnessData()
//                 );
//               }
//             })
//             .catch((e) => {
//               swal({ title: e.message, icon: "warning" });
//               this.setState({ listData: [] });
//             });
//         }
//       });
//     }

//     if (row.active === 0 || row.active === "0") {
//       swal({
//         title: "Are you sure you really want to activate this record.",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//       }).then((willDelete) => {
//         if (willDelete) {
//           const test = {
//             id: row.id,
//             active: 1,
//           };

//           fetchMethod(saveBusiness, { obj: test })
//             .then((res) => res.json())
//             .then((res) => {
//               const id = res.data.saveBusiness.id;
//               swal({
//                 title: id ? "Activated successfully" : "Error in activating.",
//                 icon: "success",
//               });
//               if (id) {
//                 let pageNo = this.state.pageNo;
//                 let previousData = this.state.listData.length;
//                 this.setState({ listData: undefined });

//                 const { filter } = this.state;

//                 let search = this.state.search;

//                 if (this.state.search != "" && previousData === 1) {
//                   pageNo = this.state.rows;
//                   delete filter["and"];
//                   search = "";
//                 } else if (
//                   this.state.search == "" &&
//                   previousData === 1 &&
//                   pageNo != this.state.rows
//                 ) {
//                   pageNo = this.state.pageNo - this.state.rows;
//                 } else {
//                   pageNo = this.state.pageNo;
//                 }

//                 this.setState({ pageNo, filter, search }, () =>
//                   this.getBuisnessData()
//                 );
//               }
//             })
//             .catch((e) => {
//               swal({ title: e.message, icon: "warning" });
//               this.setState({ listData: [] });
//             });
//         }
//       });
//     }
//   };

//   handleClose = () => {
//     this.setState({
//       openModal: false,
//     });
//   };

//   openModalBox = () => {
//     this.setState({
//       openModal: true,
//     });
//   };

// handleActivateDeactivate = (row) => {
//   console.log(row)
//   if(row.isActive === 1 || row.isActive === "1") {
//       swal({
//           title: "Are you sure you really want to deactivate this record",
//           icon: "warning",
//           buttons: true,
//           dangerMode: true
//       }).then(() => {
//           fetchMethod(activateDeactivateBusinessTypes, {obj: {id: row.id, businessType: row.businessType, isActive: 0}})
//           .then(res => res.json())
//           .then(res => {
//               const id = res?.data?.saveMasterBusinessType?.id;
//               swal({
//                   title: id
//                     ? "Deactivated successfully"
//                     : "Error in deactivating.",
//                   icon: "success"
//               });
//               this.getBusinessTypes();
//               console.log(res);
//           })
//       })
//       .catch(e => {
//           swal("Something went wrong",{
//               icon: 'warning'
//           })
//         this.setState({ listData: [] });
//       })
//   }
//   if(row.isActive === 0 || row.isActive === "0") {
//       swal({
//           title: "Are you sure you really want to activate this record.",
//           icon: "warning",
//           buttons: true,
//           dangerMode: true
//       }).then(() => {
//           fetchMethod(activateDeactivateBusinessTypes, {obj: {id: row.id, businessType: row.businessType, isActive: 1}})
//           .then(res => res.json())
//           .then(res => {
//               const id = res?.data?.saveMasterBusinessType?.id;
//               swal({
//                   title: id ? "Activated successfully" : "Error in activating.",
//                   icon: "success"
//               });
//               this.getBusinessTypes();
//           })
//       })
//       .catch(e => {
//           swal("Something went wrong",{
//               icon: 'warning'
//           })
//         this.setState({ listData: [] });
//       })
//   }
// }

// handleEditModal = (row) => {
//   this.setState({
//       openModal: true,
//       editBusinessType: row
//   })
// }

//   saveBusinessType = () => {
//   fetchMethod(addBusinessType, {obj: {business_type: this.state.businessType, isActive: 1}})
//   .then(res => res.json())
//   .then(resp => {
//       console.log(resp)
//       if(resp?.data?.MasterBusinessTypeAdd?.status === 200) {
//           this.setState({
//               openModal: false
//           })
//           swal("Business type added succesfully", {
//               icon: 'success'
//           })
//       } else {
//           swal(resp?.data?.MasterBusinessTypeAdd?.msg || "Something went wrong", {
//               icon: 'warning'
//           })
//       }
//       this.getBusinessTypes();
//   })
//   .catch(err => {
//       swal(err.msg || "Something went wrong", {
//           icon: 'warning'
//       })
//   })
// }

//   handleEditModal = (data) => {
//     this.props.history.push({
//       pathname: "/editBuisness",
//       state: { details: data.id },
//     });
//   };

//   render() {
//     const nameColumn = [
//       {
//         Header: "S No.",
//         Cell: (row) => {
//           return <div className="dot">{row.original.sNo}</div>;
//         },
//         width: 45,
//       },
//     ];

//     const actionButton = [
//   {
//     Header: "",
//     sortable: false,
//     Cell: row => (
//       <div className="action">
//         {row.original.isActive == 1 ? (
//           <IconButton
//             aria-label="edit"
//             onClick={() => this.handleEditModal(row.original)}
//           >
//             <img src={Edit} alt="Edit" />
//           </IconButton>
//         ) : (
//           ""
//         )}
//         <IconButton
//           className="statusLink"
//           aria-label="delete"
//           onClick={() => this.handleActivateDeactivate(row.original)}
//         >
//           {row.original.isActive === 1 ? (
//             <img src={Activate} alt="ACTIVATE" />
//           ) : (
//             <img src={Deactivate} alt="Delete" />
//           )}
//           {/* <img src={Delete} alt="Delete" /> */}
//         </IconButton>
//       </div>
//     )
// }
// ]

//      const columns = 
// nameColumn.concat(adminBusinessTypesList.columns).concat(actionButton)

//     return (
//       <div className="buisnessSection">
//         <h3>Business Types</h3>
//         <div className="formFlex addType">
// <Button onClick={this.openModalBox}>Add Type</Button>
// </div>
//         <Dialog
//           open={this.state.openModal}
//           onClose={this.handleClose}
//           aria-labelledby="simple-modal-title"
//           ariadescribedby="simple-modal-description"
//           className="chooseBuisness"
//         >
//           <DialogTitle onClose={this.handleClose}>
// {this.state.editBusinessType.businessType ? "Edit" : "Add" } Business Type
// </DialogTitle>
//           <DialogContent>
//             <FormControl>

// <TextField id="outlined-basic" 
// label="Business type" 
// value={this.state.editBusinessType.businessType} 
// variant="outlined" onChange={evt => this.setState({businessType: evt.target.value})}/>

//             </FormControl>
//           </DialogContent>
//           <DialogButton>
//             <Button onClick={() => this.handleClose()}>Cancel</Button>
//             <Button onClick={() => this.saveBusinessType()}>Save</Button>
//           </DialogButton>
//         </Dialog>
//         <div></div>
//         {this.state.listData ? (
//           <div className="bussinessDataTable">
//             <ReactTableComponent
//               listData={this.state.listData}
//               listConfig={adminBusinessTypesList}
//               columns={columns}
//               dataCount={this.state.count}
//               updatePagination={this.updatePagination}
//               initialPage={this.state.pageNo / this.state.rows}
//               onRowClick={() => {}}
//               forSerialNo={{
//                 pageNo: this.state.pageNo,
//                 pageSize: this.state.rows,
//               }}
//             />
//           </div>
//         ) : (
//           <div className="spinner">
//             <DotLoader size={70} color={"#020f1f"} />
//           </div>
//         )}
//         {/* {this.state.listData && this.state.listData.length > 0 ? (
//                  this.state.listData.map((item, index) => {
//                    return (
//                     <div className="bussinessDataTable">
//                     <ReactTableComponent
//                       listData={this.state.listData}
//                       listConfig={addBusinessList}
//                       columns={columns}
//                       dataCount={this.state.count}
//                       updatePagination={this.updatePagination}
//                       initialPage={this.state.pageNo / this.state.rows}
//                       onRowClick={() => {}}
//                       forSerialNo={{
//                         pageNo: this.state.pageNo,
//                         pageSize: this.state.rows
//                       }}
//                     />
//                   </div>
//                       );
//                     })
//                   ) : (
//                     <div className="spinner">
//                       <DotLoader size={70} color={"#020f1f"} />
//                     </div>
//                   )}  */}
//       </div>
//     );
//   }
// }

// export default withRouter(BuisnessType);







