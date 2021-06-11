// import React, { Component } from "react";
// import FormComponent from "../../Form/FormComponent";
// import { addItemCategoryConfig } from "./BuisnessConfig";
// import { fetchMethod } from "../../FetchMethod";
// import swal from "sweetalert";
// import { saveMasterItemCategory, tierDropdownData } from "./BuisnessQuery";
// // import "./addParticipant.css";
// import { DotLoader } from "react-spinners";
// export default class AddType extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tierOptions: undefined,
//       statusOptions: ["ACTIVE", "INACTIVE"],
//     };
//   }

//   componentWillMount() {
//     this.getTierData();
//   }

//   getTierData = () => {
//     fetchMethod(tierDropdownData)
//       .then((res) => res.json())
//       .then((res) => {
//         // this.setState({ participantOptions: res.data.allUserdata.Userdata })
//         this.setState({
//           tierOptions: res.data.allTiertypes.Tiertypes.map((item) => {
//             return { id: item.id, name: item.tierType };
//           }),
//         });
//       });
//   };

//   closeForm = () => {
//     this.props.history.push("/itemCategory");
//   };

//   preSubmitChanges = (e) => {
//     e["tierId"] = e.tierId.id;
//     // e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
//     // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
//     e["isActive"] = e["status"] === "ACTIVE" ? 1 : 0;
//     delete e.status;
//     fetchMethod(saveMasterItemCategory, { obj: e })
//       .then((res) => res.json())
//       .then((response) => {
//         const id = response.data.saveMasterItemCategory;
//         if (id && id !== null) {
//           swal({ title: "Item category added successfully", icon: "success" });
//           this.props.history.push("/itemCategory");
//         } else {
//           swal("Please try again", { icon: "error" });
//           this.props.history.push("/itemCategory");
//         }
//       });
//     return false;
//   };

//   render() {
//     return (
//       <div>
//         {this.state.tierOptions ? (
//           <div className="addParticipantSection">
//             <h3>Add Business Type</h3>
//             <FormComponent
//               formConfig={addItemCategoryConfig}
//               preSubmitChanges={this.preSubmitChanges}
//               buttonTitleCSS="adminParticipant"
//               modalCloseCallback={() => {}}
//               closeButton={this.closeForm}
//               params={{
//                 tierOptions: this.state.tierOptions,
//                 statusOptions: this.state.statusOptions,
//               }}
//             />
//           </div>
//         ) : (
//           <div className="spinner">
//             <DotLoader size={70} color={"#020f1f"} />
//           </div>
//         )}
//       </div>
//     );
//   }
// }
