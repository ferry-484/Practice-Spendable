import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import Login from "../../Login/Login";
import ForgotPassword from "../../Login/ForgotPassword";
import ForgotPasswordEmail from "../../Login/ForgotPasswordEmail";
import Dashboard from "../Dashboard/Dashboard";
import SideBar from "./SideBar/Sidebar";
import Logout from "../Logout/Logout";
import Participant from "../Participant/Participant";
import AddParticipant from "../Participant/AddParticipant";
import EditParticipant from "../Participant/EditParticipant";
import ParticipantInfo from "../Participant/ParticipantInfo";
import Buisness from "../Buisness/Buisness";
import PaymentRequests from "../PaymentRequests/PaymentRequests";
import AddBuisness from "../Buisness/AddBuisness";
import EditBuisness from "../Buisness/EditBuisness";
import BuisnessInfo from "../Buisness/BuisnessInfo";
import SuperLedger from "../SuperLedger/SuperLedger";
import Settings from "../Setting/Settings";
import Admin from "../Admin/Admin";
import Guardian from "../Guardian/Guardian";
import Supporter from "../Supporter/Supporter";
import AddGuardian from "../Guardian/AddGuardian";
import EditGuardian from "../Guardian/EditGuardian";
import GuardianInfo from "../Guardian/GuardianInfo";
import AddSupporter from "../Supporter/AddSupporter";
import EditSupporter from "../Supporter/EditSupporter";
import SupporterInfo from "../Supporter/SupporterInfo";
import BuisnessMember from "../Buisness/BuisnessMember";
import BuisnessMemberInfo from "../Buisness/BuisnessMemberInfo";
import AddBuisnessMember from "../Buisness/AddBuisnessMember";
import BusinessType from "../Buisness/BusinessType";
import AddType from "../Buisness/AddType";
import EditBuisnessMember from "../Buisness/EditBuisnessMember";
import GuardianMember from "../Guardian/GuardianMember";
import AddGuardianParticipant from "../Guardian/AddGuardianParticipant";
import EditGuardianParticipant from "../Guardian/EditGuardianParticipant";
import itemCategory from "../ItemCategory/ItemCategory";
import AddItemCategory from "../ItemCategory/AddItemCategory";
import EditItemCategory from "../ItemCategory/EditItemCategory";
import Profile from "../Profile/Profile";
import ItemCategory from "../ItemCategory/ItemCategory";
import CardDetails from "../Participant/CardDetails/CardDetails";
import CardLimit from "../Participant/CardLimit"
import AddFunds from "../SuperLedger/AddFunds";
import Budget from "../Budget/Budget";
import AddBudget from "../Budget/AddBudget";
import GuardianLedger from "../SuperLedger/GuardianLedger";
import EditBudget from "../Budget/EditBudget";
import AddTier from "../ItemCategory/AddTier";
import Signup from "../../../src/Login/SignUp";
function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route
          exact={true}
          path="/login"
          render={(e, props) => <Login {...e} data={props} />}
        />
        <Route
          exact={true}
          path="/"
          render={(e, props) =>
            localStorage.getItem("token") ? (
              <Redirect to="dashboard"></Redirect>
            ) : (
              <Login {...e} data={props} />
            )
          }
        />
        <Route
          exact={true}
          path="/dashboard"
          render={(e, props) => (
            <SideBar>
              <Dashboard {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/participants"
          render={(e, props) => (
            <SideBar>
              <Participant {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/guardians"
          render={(e, props) => (
            <SideBar>
              <Guardian {...e} data={props} />
            </SideBar>
          )}
        />

        <Route
          exact={true}
          path="/cardlimit"
          render={(e, props) => (
            <SideBar>
              <CardLimit {...e} data={props} />
            </SideBar>
          )}
        />

        <Route
          exact={true}
          path="/budget"
          render={(e, props) => (
            <SideBar>
              <Budget {...e} data={props} />
            </SideBar>
          )}
        />

        <Route
          exact={true}
          path="/addBudget"
          render={(e, props) => (
            <SideBar>
              <AddBudget {...e} data={props} />
            </SideBar>
          )}
        />

        <Route
          exact={true}
          path="/editBudget"
          render={(e, props) => (
            <SideBar>
              <EditBudget {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addGuardian"
          render={(e, props) => (
            <SideBar>
              <AddGuardian {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/add"
          render={(e, props) => (
            <SideBar>
              <AddType {...e} data={props} />
            </SideBar>
          )}
        />

       <Route
          exact={true}
          path="/addBuisnesstype"
          render={(e, props) => (
            <SideBar>
              <BusinessType {...e} data={props} />
            </SideBar>
          )}
        />

         <Route
          exact={true}
          path="/editGuardian"
          render={(e, props) => (
            <SideBar>
              <EditGuardian {...e} data={props} />
            </SideBar>
          )}
        />  
        <Route
          exact={true}
          path="/guardianInfo"
          render={(e, props) => (
            <SideBar>
              <GuardianInfo {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/guardianMember"
          render={(e, props) => (
            <SideBar>
              <GuardianMember {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addGuardianParticipant"
          render={(e, props) => (
            <SideBar>
              <AddGuardianParticipant {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/editGuardianParticipant"
          render={(e, props) => (
            <SideBar>
              <EditGuardianParticipant {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/supporter"
          render={(e, props) => (
            <SideBar>
              <Supporter {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addSupporter"
          render={(e, props) => (
            <SideBar>
              <AddSupporter {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/editSupporter"
          render={(e, props) => (
            <SideBar>
              <EditSupporter {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/supporterInfo"
          render={(e, props) => (
            <SideBar>
              <SupporterInfo {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/admin"
          render={(e, props) => (
            <SideBar>
              <Admin {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addParticipants"
          render={(e, props) => (
            <SideBar>
              <AddParticipant {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/profile"
          render={(e, props) => (
            <SideBar>
              <Profile {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/editParticipants"
          render={(e, props) => (
            <SideBar>
              <EditParticipant {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/participantInfo"
          render={(e, props) => (
            <SideBar>
              <ParticipantInfo {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/buisness"
          render={(e, props) => (
            <SideBar>
              <Buisness {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addBuisness"
          render={(e, props) => (
            <SideBar>
              <AddBuisness {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/editBuisness"
          render={(e, props) => (
            <SideBar>
              <EditBuisness {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/buisnessInfo"
          render={(e, props) => (
            <SideBar>
              <BuisnessInfo {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/paymentRequest"
          render={(e, props) => (
            <SideBar>
              <PaymentRequests {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/superLedger"
          render={(e, props) => (
            <SideBar>
              <SuperLedger {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/guardianLedger"
          render={(e, props) => (
            <SideBar>
              <GuardianLedger {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addFunds"
          render={(e, props) => (
            <SideBar>
              <AddFunds {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/settings"
          render={(e, props) => (
            <SideBar>
              <Settings {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/buisnessMember"
          render={(e, props) => (
            <SideBar>
              <BuisnessMember {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/buisnessMemberInfo"
          render={(e, props) => (
            <SideBar>
              <BuisnessMemberInfo {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addBuisnessMember"
          render={(e, props) => (
            <SideBar>
              <AddBuisnessMember {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/editBuisnessMember"
          render={(e, props) => (
            <SideBar>
              <EditBuisnessMember {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/itemCategory"
          render={(e, props) => (
            <SideBar>
              {/* <ItemCategory/> */}
              <ItemCategory {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addItemCategory"
          render={(e, props) => (
            <SideBar>
              <AddItemCategory {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/editItemCategory"
          render={(e, props) => (
            <SideBar>
              <EditItemCategory {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/addTier"
          render={(e, props) => (
            <SideBar>
              <AddTier {...e} data={props} />
            </SideBar>
          )}
        />
        <Route
          exact={true}
          path="/cardDetails"
          render={(e, props) => (
            <SideBar>
              <CardDetails {...e} data={props} />
            </SideBar>
          )}
        />
        <Route exact={true} path="/logout" component={Logout} />

        <Route
          exact={true}
          path="/forgotpassword"
          render={(e, props) => <ForgotPassword {...e} data={props} />}
        />
        <Route
          exact={true}
          path="/ForgotPasswordEmail"
          render={(e, props) => <ForgotPasswordEmail {...e} data={props} />}
        />
        <Route
          exact={true}
          path="/signup"
          render={(e, props) => <Signup {...e} data={props} />}
        />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
