import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./dashboard.css"
import { fetchMethod } from "../../FetchMethod";
import { guardianDashboardCount , paymentGuardianRequestAllQuery} from "./DashboardQuery";
import { withRouter } from "react-router-dom";
 class GuardianDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buisnessCount:undefined,
            participantCount:undefined,
            supporterCount: undefined,
            paymentCount : undefined
        };
    }
    paymentRouting = () => {
        this.props.history.push("/paymentRequest");
    }
    componentWillMount() {
        this.totalDashboardCount();
        this.totalPaymentCount();
    }

    totalPaymentCount = () =>{
        fetchMethod(paymentGuardianRequestAllQuery(localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).id : ''))
            .then(res => res.json())
            .then(res => {
                let paymentData = res.data.allPaymentRequests.PaymentRequests || [];
                paymentData = paymentData.filter(item=> item.fkPaymentRequestParticipantIdrel.Userdata.length > 0 )
    
                this.setState({ 
                    paymentCount:
                    paymentData !== null
                    ? paymentData.length
                    : "",
    
                 })
            })
            .catch(e => {
                
                this.setState({ paymentCount: [] });
              });
    }

    totalDashboardCount = () => {
        fetchMethod(
          guardianDashboardCount(
            JSON.parse(localStorage.getItem("userInfo")).id
          )
        )
          .then(res => res.json())
          .then(res => {
            this.setState({
              buisnessCount:
                res &&
                res.data &&
                res.data.allBusinesses &&
                res.data.allBusinesses !== null
                  ? res.data.allBusinesses.totalCount
                  : 0,
              participantCount:
                res && res.data && res.data.id1 && res.data.id1 !== null
                  ? res.data.id1.totalCount
                  : 0,
              supporterCount:
                res && res.data && res.data.id3 && res.data.id3 !== null
                  ? res.data.id3.totalCount
                  : 0
            });
          });
    }
    buisnessRouting = () => {
        this.props.history.push("/buisness");
    }
    participantRouting=()=>{
        this.props.history.push("/participants");
    }
    supporterRouting=()=>{
        this.props.history.push("/supporter");
    }
 
    render() {
        return (
            <div className="dashboardSection">
                <h2>Dashboard</h2>
                <div className="cardSection">
                    <div className="cardFlex">
                        <Card className="businnessCard" onClick={this.buisnessRouting}>
                            <CardContent>
                                <div className="cardHeader">
                                    <h3>Business</h3>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="42"
                                            height="36.736"
                                            viewBox="0 0 42 36.736"
                                        >
                                            <g id="business" transform="translate(0 -32.088)">
                                                <g
                                                    id="Group_1713"
                                                    data-name="Group 1713"
                                                    transform="translate(0 32.088)"
                                                >
                                                    <path
                                                        id="Path_3027"
                                                        data-name="Path 3027"
                                                        d="M182.338,33.952a8.264,8.264,0,0,0-1.824-.974,13.428,13.428,0,0,0-9.615,0,8.263,8.263,0,0,0-1.824.974,1.38,1.38,0,0,0-.543,1.1v2.166l1.38.738,1.38-.738V35.831a10.408,10.408,0,0,1,8.828,0v1.384l1.38.738,1.38-.738V35.049A1.38,1.38,0,0,0,182.338,33.952Z"
                                                        transform="translate(-154.707 -32.088)"
                                                        fill="#e8834d"
                                                    />
                                                    <g
                                                        id="Group_1712"
                                                        data-name="Group 1712"
                                                        transform="translate(13.825 5.127)"
                                                    >
                                                        <path
                                                            id="Path_3028"
                                                            data-name="Path 3028"
                                                            d="M168.533,94.589v1.524l1.38.738,1.38-.738V94.589Z"
                                                            transform="translate(-168.533 -94.589)"
                                                            fill="#d66e41"
                                                        />
                                                        <path
                                                            id="Path_3029"
                                                            data-name="Path 3029"
                                                            d="M312.566,94.589H309.8v1.524l1.38.738,1.38-.738Z"
                                                            transform="translate(-298.216 -94.589)"
                                                            fill="#d66e41"
                                                        />
                                                    </g>
                                                    <path
                                                        id="Path_3030"
                                                        data-name="Path 3030"
                                                        d="M13.247,298.286v12.263a2.636,2.636,0,0,0,2.636,2.636H50.438a2.636,2.636,0,0,0,2.636-2.636V298.286Z"
                                                        transform="translate(-12.16 -276.449)"
                                                        fill="#365e7d"
                                                    />
                                                    <path
                                                        id="Path_3031"
                                                        data-name="Path 3031"
                                                        d="M13.247,279.705v1.524c2.19,1.739,7.978,5.114,19.913,5.114s17.723-3.375,19.913-5.114V279.7H13.247Z"
                                                        transform="translate(-12.16 -259.393)"
                                                        fill="#2b4d66"
                                                    />
                                                    <path
                                                        id="Path_3032"
                                                        data-name="Path 3032"
                                                        d="M.972,125.952c2.1,1.709,7.879,5.206,20.028,5.206s17.929-3.5,20.028-5.206A4.4,4.4,0,0,0,42,123.169v-7.364a2.636,2.636,0,0,0-2.636-2.636H2.636A2.636,2.636,0,0,0,0,115.805v7.364a4.4,4.4,0,0,0,.972,2.783Z"
                                                        transform="translate(0 -106.518)"
                                                        fill="#407093"
                                                    />
                                                    <path
                                                        id="Path_3033"
                                                        data-name="Path 3033"
                                                        d="M41.028,237.123c-2.1,1.709-7.879,5.206-20.028,5.206s-17.929-3.5-20.028-5.206A2.636,2.636,0,0,1,0,235.078V236.6a2.636,2.636,0,0,0,.972,2.045c2.1,1.709,7.879,5.206,20.028,5.206s17.929-3.5,20.028-5.206A2.636,2.636,0,0,0,42,236.6v-1.524A2.636,2.636,0,0,1,41.028,237.123Z"
                                                        transform="translate(0 -218.426)"
                                                        fill="#365e7d"
                                                    />
                                                    <path
                                                        id="Path_3034"
                                                        data-name="Path 3034"
                                                        d="M228.366,310.5c1.364,0,2.469-1.013,2.469-3.207v-1.5a.879.879,0,0,0-.879-.879h-3.181a.879.879,0,0,0-.879.879v1.5C225.9,309.484,227,310.5,228.366,310.5Z"
                                                        transform="translate(-207.366 -282.533)"
                                                        fill="#ffe27a"
                                                    />
                                                    <path
                                                        id="Path_3035"
                                                        data-name="Path 3035"
                                                        d="M228.366,336.343a2.469,2.469,0,0,1-2.469-2.469V335.4a2.469,2.469,0,0,0,4.938,0v-1.524A2.469,2.469,0,0,1,228.366,336.343Z"
                                                        transform="translate(-207.366 -309.118)"
                                                        fill="#f9cf58"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <div className="cardBody">
                                    <span>{this.state.buisnessCount?this.state.buisnessCount:0}</span>
                                    <span>Total Business</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="participantCard" onClick={this.participantRouting}>
                            <CardContent>
                                <div className="cardHeader">
                                    <h3>Participant</h3>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48.328"
                                            height="36.054"
                                            viewBox="0 0 48.328 36.054"
                                        >
                                            <g id="participant" transform="translate(0 -65.015)">
                                                <ellipse
                                                    id="Ellipse_179"
                                                    data-name="Ellipse 179"
                                                    cx="3.068"
                                                    cy="2.685"
                                                    rx="3.068"
                                                    ry="2.685"
                                                    transform="translate(38.355 75.755)"
                                                    fill="#785550"
                                                />
                                                <path
                                                    id="Path_2946"
                                                    data-name="Path 2946"
                                                    d="M408.65,181.479a2.712,2.712,0,0,1,1.918-2.486,3.434,3.434,0,0,0-1.151-.2,2.709,2.709,0,1,0,0,5.37,3.434,3.434,0,0,0,1.151-.2A2.712,2.712,0,0,1,408.65,181.479Z"
                                                    transform="translate(-367.994 -103.039)"
                                                    fill="#694b4b"
                                                />
                                                <path
                                                    id="Path_2947"
                                                    data-name="Path 2947"
                                                    d="M378.25,321.868l-2.482-1.241a1.534,1.534,0,0,1-.848-1.372v-2.3h-4.6v2.3a1.534,1.534,0,0,1-.848,1.372l-2.482,1.241a2.3,2.3,0,0,0-1.272,2.058v4.533a.767.767,0,0,0,.767.767h12.274a.767.767,0,0,0,.767-.767v-4.533A2.3,2.3,0,0,0,378.25,321.868Z"
                                                    transform="translate(-331.194 -228.158)"
                                                    fill="#e6af78"
                                                />
                                                <path
                                                    id="Path_2948"
                                                    data-name="Path 2948"
                                                    d="M416.379,320.021a6.062,6.062,0,0,0,2.342-.473,1.509,1.509,0,0,1-.041-.294v-2.3h-4.6v2.3a1.51,1.51,0,0,1-.041.3A6.1,6.1,0,0,0,416.379,320.021Z"
                                                    transform="translate(-374.955 -228.158)"
                                                    fill="#d29b6e"
                                                />
                                                <path
                                                    id="Path_2949"
                                                    data-name="Path 2949"
                                                    d="M378.25,360.538l-1.768-.884a4.6,4.6,0,0,1-7.727,0l-1.768.884a2.3,2.3,0,0,0-1.272,2.058v4.533a.767.767,0,0,0,.767.767h12.274a.767.767,0,0,0,.767-.767V362.6A2.3,2.3,0,0,0,378.25,360.538Z"
                                                    transform="translate(-331.194 -266.828)"
                                                    fill="#d5dced"
                                                />
                                                <circle
                                                    id="Ellipse_180"
                                                    data-name="Ellipse 180"
                                                    cx="5.37"
                                                    cy="5.37"
                                                    r="5.37"
                                                    transform="translate(36.054 78.056)"
                                                    fill="#5a4146"
                                                />
                                                <path
                                                    id="Path_2950"
                                                    data-name="Path 2950"
                                                    d="M420.847,207.8a5.382,5.382,0,0,0-4.128-4.494,5.526,5.526,0,0,0-1.158-.131,2.468,2.468,0,0,0-1.119,4.663,2.015,2.015,0,0,0,.2.088l2.672,4.838s.712.049,1.43.071A5.359,5.359,0,0,0,420.847,207.8Z"
                                                    transform="translate(-374.104 -125.119)"
                                                    fill="#694b4b"
                                                />
                                                <path
                                                    id="Path_2951"
                                                    data-name="Path 2951"
                                                    d="M395,260.815h0a4.6,4.6,0,0,1-4.564-4.007.774.774,0,0,1,.41-.8,6.4,6.4,0,0,0,1.358-.917,4.43,4.43,0,0,0,1.049-1.381.759.759,0,0,1,.865-.42,13.216,13.216,0,0,1,5.207,2.668.742.742,0,0,1,.264.617A4.6,4.6,0,0,1,395,260.815Z"
                                                    transform="translate(-353.576 -170.485)"
                                                    fill="#f0c087"
                                                />
                                                <path
                                                    id="Path_2952"
                                                    data-name="Path 2952"
                                                    d="M399.324,255.959a13.216,13.216,0,0,0-5.207-2.668.759.759,0,0,0-.865.42,4.391,4.391,0,0,1-.7,1.023v0a4.106,4.106,0,0,1-.348.355,6.4,6.4,0,0,1-1.358.917.774.774,0,0,0-.41.8,4.6,4.6,0,0,0,3.867,3.942,3.338,3.338,0,0,1-1.6-3v-1.094c.174-.129.35-.257.526-.414a6.108,6.108,0,0,0,1.1-1.294,11.584,11.584,0,0,1,4,2.175c.145.128.506.46.928.856a4.569,4.569,0,0,0,.34-1.4A.742.742,0,0,0,399.324,255.959Z"
                                                    transform="translate(-353.576 -170.485)"
                                                    fill="#e6af78"
                                                />
                                                <path
                                                    id="Path_2953"
                                                    data-name="Path 2953"
                                                    d="M482.093,376.18a2.3,2.3,0,0,1,.468,1.383V382.1a.767.767,0,0,1-.767.767h-2.3V379a1.534,1.534,0,0,1,.576-1.2Z"
                                                    transform="translate(-434.233 -281.794)"
                                                    fill="#c7cfe2"
                                                />
                                                <path
                                                    id="Path_2954"
                                                    data-name="Path 2954"
                                                    d="M24.381,213.6v.538a6.139,6.139,0,0,0,.315,1.941l1.219,3.658h2.3V211.3H26.682A2.3,2.3,0,0,0,24.381,213.6Z"
                                                    transform="translate(-22.08 -132.479)"
                                                    fill="#5a4146"
                                                />
                                                <path
                                                    id="Path_2955"
                                                    data-name="Path 2955"
                                                    d="M49.6,207.837l-1.3,4.543-6.137-5.37a1.534,1.534,0,0,1-1.534-1.534h0a2.3,2.3,0,0,1,2.3-2.3h5.37a1.534,1.534,0,0,1,1.534,1.534v1.442A6.136,6.136,0,0,1,49.6,207.837Z"
                                                    transform="translate(-36.799 -125.119)"
                                                    fill="#694b4b"
                                                />
                                                <rect
                                                    id="Rectangle_410"
                                                    data-name="Rectangle 410"
                                                    width="4.603"
                                                    height="3.395"
                                                    transform="translate(5.37 89.562)"
                                                    fill="#e6af78"
                                                />
                                                <path
                                                    id="Path_2956"
                                                    data-name="Path 2956"
                                                    d="M56.889,326.488a6.086,6.086,0,0,0,4.6,0v-1.409h-4.6Z"
                                                    transform="translate(-51.519 -235.517)"
                                                    fill="#d29b6e"
                                                />
                                                <path
                                                    id="Path_2957"
                                                    data-name="Path 2957"
                                                    d="M13.673,345.852l-3.7-1.057-2.3,1.527-2.3-1.527-3.7,1.057A2.3,2.3,0,0,0,0,348.065v5.608a.767.767,0,0,0,.767.767H14.575a.767.767,0,0,0,.767-.767v-5.608A2.3,2.3,0,0,0,13.673,345.852Z"
                                                    transform="translate(0 -253.372)"
                                                    fill="#d5dced"
                                                />
                                                <path
                                                    id="Path_2958"
                                                    data-name="Path 2958"
                                                    d="M74.677,369.16H73.143l.383-8.111h.767Z"
                                                    transform="translate(-66.239 -268.091)"
                                                    fill="#afb9d2"
                                                />
                                                <path
                                                    id="Path_2959"
                                                    data-name="Path 2959"
                                                    d="M37.111,252.338h0a4.6,4.6,0,0,1-4.6-4.6v-.9a1.534,1.534,0,0,1,.449-1.085l1.391-1.391a1.516,1.516,0,0,1,1.114-.451c2.452.077,4.623.6,5.809,1.762a1.514,1.514,0,0,1,.442,1.086v.977A4.6,4.6,0,0,1,37.111,252.338Z"
                                                    transform="translate(-29.44 -162.009)"
                                                    fill="#f0c087"
                                                />
                                                <path
                                                    id="Path_2960"
                                                    data-name="Path 2960"
                                                    d="M34.809,247.026a1.531,1.531,0,0,1,1.626-1.532,16.187,16.187,0,0,1,5.256,1.036,1.484,1.484,0,0,0-.421-.859c-1.186-1.159-3.357-1.684-5.809-1.761h0a1.516,1.516,0,0,0-1.114.451l-1.391,1.391a1.534,1.534,0,0,0-.449,1.085v.9a4.6,4.6,0,0,0,3.327,4.42,4.565,4.565,0,0,1-1.026-2.885Z"
                                                    transform="translate(-29.44 -162.008)"
                                                    fill="#e6af78"
                                                />
                                                <path
                                                    id="Path_2961"
                                                    data-name="Path 2961"
                                                    d="M3.068,369.1a2.3,2.3,0,0,0-.674-1.627L.42,365.5A2.292,2.292,0,0,0,0,366.812v5.608a.767.767,0,0,0,.767.767h2.3Z"
                                                    transform="translate(0 -272.119)"
                                                    fill="#c7cfe2"
                                                />
                                                <path
                                                    id="Path_2962"
                                                    data-name="Path 2962"
                                                    d="M74.294,362.583h-.767a.383.383,0,0,1-.383-.384v-1.151h1.534V362.2A.384.384,0,0,1,74.294,362.583Z"
                                                    transform="translate(-66.239 -268.091)"
                                                    fill="#959cb5"
                                                />
                                                <g
                                                    id="Group_1710"
                                                    data-name="Group 1710"
                                                    transform="translate(4.521 90.814)"
                                                >
                                                    <path
                                                        id="Path_2963"
                                                        data-name="Path 2963"
                                                        d="M51.051,340.478l-1.3.993a.46.46,0,0,1-.683-.145L47.9,339.2l.469-.716a.307.307,0,0,1,.465-.057Z"
                                                        transform="translate(-47.901 -338.341)"
                                                        fill="#c7cfe2"
                                                    />
                                                    <path
                                                        id="Path_2964"
                                                        data-name="Path 2964"
                                                        d="M81.27,340.478l1.3.993a.46.46,0,0,0,.683-.145l1.166-2.13-.469-.716a.307.307,0,0,0-.465-.057Z"
                                                        transform="translate(-78.12 -338.341)"
                                                        fill="#c7cfe2"
                                                    />
                                                </g>
                                                <path
                                                    id="Path_2965"
                                                    data-name="Path 2965"
                                                    d="M150.479,91.864a25.949,25.949,0,0,0,11-2.8.765.765,0,0,0,.411-.811c-.238-1.422-.879-5.683-1.439-13.265-.455-6.168-4.465-9.972-9.972-9.972s-9.517,3.8-9.972,9.972c-.56,7.582-1.2,11.843-1.439,13.265a.765.765,0,0,0,.411.811A25.951,25.951,0,0,0,150.479,91.864Z"
                                                    transform="translate(-125.931)"
                                                    fill="#5a4146"
                                                />
                                                <path
                                                    id="Path_2966"
                                                    data-name="Path 2966"
                                                    d="M225.809,89.065a.765.765,0,0,0,.411-.811c-.238-1.422-.879-5.683-1.439-13.265-.455-6.168-4.465-9.972-9.972-9.972q-.579,0-1.135.056a3.973,3.973,0,0,0-.81,7.739c.066.02.1.029.1.029L214.5,91.857l.006.005A25.764,25.764,0,0,0,225.809,89.065Z"
                                                    transform="translate(-190.262 -0.001)"
                                                    fill="#694b4b"
                                                />
                                                <path
                                                    id="Path_2967"
                                                    data-name="Path 2967"
                                                    d="M121.9,299.019v-4.138a3.069,3.069,0,0,1,1.829-2.807l6.462-2.854a1.534,1.534,0,0,0,.914-1.4v-3.373h7.671v3.373a1.534,1.534,0,0,0,.914,1.4l6.462,2.854a3.068,3.068,0,0,1,1.829,2.807v4.138a.767.767,0,0,1-.767.767H122.672A.767.767,0,0,1,121.9,299.019Z"
                                                    transform="translate(-110.398 -198.717)"
                                                    fill="#e6af78"
                                                />
                                                <path
                                                    id="Path_2968"
                                                    data-name="Path 2968"
                                                    d="M146.157,345.086l-4.766-2.105a6.895,6.895,0,0,1-12.891,0l-4.766,2.105a3.069,3.069,0,0,0-1.829,2.807v4.138a.767.767,0,0,0,.767.767h24.547a.767.767,0,0,0,.767-.767v-4.138A3.068,3.068,0,0,0,146.157,345.086Z"
                                                    transform="translate(-110.397 -251.729)"
                                                    fill="#00c3ff"
                                                />
                                                <path
                                                    id="Path_2969"
                                                    data-name="Path 2969"
                                                    d="M219.429,286.667a9.128,9.128,0,0,0,7.671,0v-2.223h-7.671v2.223Z"
                                                    transform="translate(-198.717 -198.717)"
                                                    fill="#d29b6e"
                                                />
                                                <path
                                                    id="Path_2970"
                                                    data-name="Path 2970"
                                                    d="M193.362,151.423a17.038,17.038,0,0,0-8.741-3.683,1.534,1.534,0,0,0-1.611.82,10.485,10.485,0,0,1-3.577,3.987,1.5,1.5,0,0,0-.64,1.245v.435a7.846,7.846,0,0,0,7.16,7.917,7.672,7.672,0,0,0,8.182-7.654v-1.346A2.276,2.276,0,0,0,193.362,151.423Z"
                                                    transform="translate(-161.917 -74.901)"
                                                    fill="#f0c087"
                                                />
                                                <path
                                                    id="Path_2971"
                                                    data-name="Path 2971"
                                                    d="M193.79,151.952a2.2,2.2,0,0,0-.43-.529,17.037,17.037,0,0,0-8.741-3.683,1.534,1.534,0,0,0-1.611.82,8.9,8.9,0,0,1-.463.817,10.842,10.842,0,0,1-3.1,3.161,1.518,1.518,0,0,0-.652,1.254v.435a7.864,7.864,0,0,0,6.74,7.868,7.639,7.639,0,0,1-2.138-5.3V151.97a1.531,1.531,0,0,1,1.378-1.528A17.563,17.563,0,0,1,193.79,151.952Z"
                                                    transform="translate(-161.916 -74.901)"
                                                    fill="#e6af78"
                                                />
                                                <g
                                                    id="Group_1711"
                                                    data-name="Group 1711"
                                                    transform="translate(11.507 93.778)"
                                                >
                                                    <path
                                                        id="Path_2972"
                                                        data-name="Path 2972"
                                                        d="M123.052,369.742a3.064,3.064,0,0,0-1.147,2.386v4.138a.767.767,0,0,0,.767.767h4.6v-2.115a2.3,2.3,0,0,0-.674-1.627Z"
                                                        transform="translate(-121.905 -369.742)"
                                                        fill="#00aaf0"
                                                    />
                                                    <path
                                                        id="Path_2973"
                                                        data-name="Path 2973"
                                                        d="M345.555,369.742a3.064,3.064,0,0,1,1.147,2.386v4.138a.767.767,0,0,1-.767.767h-4.6v-2.115a2.3,2.3,0,0,1,.674-1.627Z"
                                                        transform="translate(-320.621 -369.742)"
                                                        fill="#00aaf0"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <div className="cardBody">
                                    <span>{this.state.participantCount?this.state.participantCount:0}</span>
                                    <span>Total Participant</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="supporterCard" onClick={this.supporterRouting}>
                            <CardContent>
                                <div className="cardHeader">
                                    <h3>Supporter</h3>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="43.666" height="47.62" viewBox="0 0 43.666 47.62">
                                            <g id="supporter" transform="translate(-21.253 0)">
                                                <path id="Path_3084" data-name="Path 3084" d="M174.9,236.091v-7.806h-1.648v7.806l-8.031,5.521.933,1.358,7.922-5.447L182,242.97l.933-1.358Z" transform="translate(-130.577 -207.052)" fill="#e4eaf6" />
                                                <path id="Path_3085" data-name="Path 3085" d="M230.478,141.682V139.02h-6.845v2.662l3.422,3.042Z" transform="translate(-183.557 -126.09)" fill="#e6af78" />
                                                <path id="Path_3086" data-name="Path 3086" d="M172.728,168.406l-4.705-1.107a.755.755,0,0,1-.2-.08l-3.811,2.223-3.663-2.331a.757.757,0,0,1-.346.187l-4.705,1.107a1.521,1.521,0,0,0-1.173,1.481v2.978a.761.761,0,0,0,.761.76H173.14a.761.761,0,0,0,.761-.76v-2.978A1.521,1.521,0,0,0,172.728,168.406Z" transform="translate(-120.516 -151.569)" fill="#707487" />
                                                <path id="Path_3087" data-name="Path 3087" d="M223.633,139.02v2.808c4.311,1.553,6.845-2.334,6.845-2.334v-.474Z" transform="translate(-183.557 -126.09)" fill="#d29b6e" />
                                                <path id="Path_3088" data-name="Path 3088" d="M207.28,44.985l.331,7.29a2.282,2.282,0,0,0,.91,1.722l1.572,1.179a2.281,2.281,0,0,0,1.369.456h1.521a2.282,2.282,0,0,0,1.369-.456L215.925,54a2.282,2.282,0,0,0,.91-1.722l.331-7.29Z" transform="translate(-168.725 -40.801)" fill="#f0c087" />
                                                <path id="Path_3089" data-name="Path 3089" d="M211.083,46.506c1.521,0,3.8-.38,4.344-1.521H207.28l.331,7.29a2.282,2.282,0,0,0,.91,1.722l1.572,1.179a2.281,2.281,0,0,0,1.369.456h.761c-.761,0-2.282-1.521-2.282-3.422V47.647A1.214,1.214,0,0,1,211.083,46.506Z" transform="translate(-168.725 -40.801)" fill="#e6af78" />
                                                <g id="Group_1723" data-name="Group 1723" transform="translate(33.611 17.375)">
                                                    <path id="Path_3090" data-name="Path 3090" d="M330.565,189.023l2.464-2.213a1.518,1.518,0,0,1,.328.943v2.978a.761.761,0,0,1-.761.761h-2.662v-1.053A1.9,1.9,0,0,1,330.565,189.023Z" transform="translate(-313.583 -186.81)" fill="#5b5d6e" />
                                                    <path id="Path_3091" data-name="Path 3091" d="M156.921,189.023l-2.464-2.213a1.518,1.518,0,0,0-.328.943v2.978a.761.761,0,0,0,.761.761h2.662v-1.053A1.9,1.9,0,0,0,156.921,189.023Z" transform="translate(-154.129 -186.81)" fill="#5b5d6e" />
                                                    <path id="Path_3092" data-name="Path 3092" d="M252.109,203.769h-1.9l.238-3.422h1.426Z" transform="translate(-241.272 -199.088)" fill="#5b5d6e" />
                                                </g>
                                                <path id="Path_3093" data-name="Path 3093" d="M252.109,192.17h-1.9v.22a.921.921,0,0,0,.921.921h.059a.921.921,0,0,0,.921-.921v-.22Z" transform="translate(-207.661 -174.296)" fill="#515262" />
                                                <g id="Group_1724" data-name="Group 1724" transform="translate(38.935 14.648)">
                                                    <path id="Path_3094" data-name="Path 3094" d="M212.455,157.584l3.476,3.128a13.116,13.116,0,0,0-2.175,1.482.488.488,0,0,1-.756-.171l-1.633-3.592.517-.775A.38.38,0,0,1,212.455,157.584Z" transform="translate(-211.368 -157.487)" fill="#5b5d6e" />
                                                    <path id="Path_3095" data-name="Path 3095" d="M263.906,157.584l-3.476,3.128a13.118,13.118,0,0,1,2.175,1.482.488.488,0,0,0,.755-.171l1.633-3.592-.517-.775A.381.381,0,0,0,263.906,157.584Z" transform="translate(-255.867 -157.487)" fill="#5b5d6e" />
                                                </g>
                                                <path id="Path_3096" data-name="Path 3096" d="M285.216,15.6l.357,2.519c1.627.325,1.862,2.879,1.9,3.609a.75.75,0,0,0,.12.372l.621.963a3.643,3.643,0,0,1,.76-2.662S289.3,14.074,285.216,15.6Z" transform="translate(-239.412 -13.93)" fill="#785550" />
                                                <path id="Path_3097" data-name="Path 3097" d="M306.362,86.849l-.429,1.718a.457.457,0,0,1-.444.346h0a.457.457,0,0,1-.454-.4l-.22-1.757a.787.787,0,0,1,.781-.885h0A.787.787,0,0,1,306.362,86.849Z" transform="translate(-257.184 -77.884)" fill="#f0c087" />
                                                <path id="Path_3098" data-name="Path 3098" d="M196.176.984l.563.384a5.686,5.686,0,0,0-2.068,5.1,4.684,4.684,0,0,1,.761,2.662l.761-.761s-.294-2.2,1.141-3.042c1.331-.784,2.5-.38,3.684-.38,3.185,0,4.076-1.2,3.921-2.662-.08-.756-1.236-2.332-4.183-2.282A12.8,12.8,0,0,0,196.176.984Z" transform="translate(-157.257 0)" fill="#694b4b" />
                                                <path id="Path_3099" data-name="Path 3099" d="M195.954,17.949a4.177,4.177,0,0,1,.784-3.244,5.686,5.686,0,0,0-2.068,5.1,4.684,4.684,0,0,1,.761,2.662l.761-.761s-.294-2.2,1.141-3.042c1.331-.784,2.5-.38,3.684-.38a9.345,9.345,0,0,0,1.371-.094C199.935,18.27,198.489,16.412,195.954,17.949Z" transform="translate(-157.257 -13.337)" fill="#5a4146" />
                                                <path id="Path_3100" data-name="Path 3100" d="M199.126,86.849l.429,1.718a.457.457,0,0,0,.444.346h0a.457.457,0,0,0,.454-.4l.22-1.757a.787.787,0,0,0-.781-.885h0A.787.787,0,0,0,199.126,86.849Z" transform="translate(-161.308 -77.884)" fill="#e6af78" />
                                                <path id="Path_3101" data-name="Path 3101" d="M283.534,228.967h-1.9a.761.761,0,0,0-.76.761h3.422A.761.761,0,0,0,283.534,228.967Z" transform="translate(-235.473 -207.671)" fill="#5b5d6e" />
                                                <path id="Path_3102" data-name="Path 3102" d="M97.6,416.291v-2.662H90.758v2.662l3.422,3.042Z" transform="translate(-63.041 -375.158)" fill="#e6af78" />
                                                <path id="Path_3103" data-name="Path 3103" d="M39.854,443.016l-4.705-1.107a.752.752,0,0,1-.2-.08l-3.811,2.223-3.663-2.331a.757.757,0,0,1-.346.187l-4.705,1.107a1.521,1.521,0,0,0-1.173,1.481v2.978a.76.76,0,0,0,.761.76H40.266a.76.76,0,0,0,.761-.76V444.5A1.521,1.521,0,0,0,39.854,443.016Z" transform="translate(0 -400.638)" fill="#eff2fa" />
                                                <path id="Path_3104" data-name="Path 3104" d="M90.758,413.629v2.808c4.311,1.553,6.845-2.334,6.845-2.334v-.474Z" transform="translate(-63.041 -375.158)" fill="#d29b6e" />
                                                <path id="Path_3105" data-name="Path 3105" d="M74.4,319.595l.331,7.29a2.282,2.282,0,0,0,.91,1.722l1.572,1.179a2.281,2.281,0,0,0,1.369.456h1.521a2.282,2.282,0,0,0,1.369-.456l1.572-1.179a2.281,2.281,0,0,0,.91-1.722l.331-7.29Z" transform="translate(-48.208 -289.87)" fill="#f0c087" />
                                                <path id="Path_3106" data-name="Path 3106" d="M78.207,321.115c1.521,0,3.8-.38,4.344-1.521H74.4l.331,7.29a2.282,2.282,0,0,0,.91,1.722l1.572,1.179a2.281,2.281,0,0,0,1.369.456h.761c-.761,0-2.282-1.521-2.282-3.422v-4.563A1.214,1.214,0,0,1,78.207,321.115Z" transform="translate(-48.208 -289.869)" fill="#e6af78" />
                                                <g id="Group_1725" data-name="Group 1725" transform="translate(21.253 42.916)">
                                                    <path id="Path_3107" data-name="Path 3107" d="M197.689,463.633l2.464-2.214a1.518,1.518,0,0,1,.328.943v2.978a.761.761,0,0,1-.761.761h-2.662v-1.054A1.9,1.9,0,0,1,197.689,463.633Z" transform="translate(-180.707 -461.419)" fill="#e4eaf6" />
                                                    <path id="Path_3108" data-name="Path 3108" d="M24.046,463.633l-2.464-2.214a1.518,1.518,0,0,0-.328.943v2.978a.761.761,0,0,0,.761.761h2.662v-1.054A1.9,1.9,0,0,0,24.046,463.633Z" transform="translate(-21.254 -461.419)" fill="#e4eaf6" />
                                                </g>
                                                <path id="Path_3109" data-name="Path 3109" d="M119.234,478.378h-1.9l.238-3.422H119Z" transform="translate(-87.144 -430.781)" fill="#5b5d6e" />
                                                <path id="Path_3110" data-name="Path 3110" d="M119.234,466.78h-1.9V467a.921.921,0,0,0,.921.921h.059a.921.921,0,0,0,.921-.921v-.22Z" transform="translate(-87.144 -423.366)" fill="#515262" />
                                                <g id="Group_1726" data-name="Group 1726" transform="translate(26.577 40.188)">
                                                    <path id="Path_3111" data-name="Path 3111" d="M79.579,432.193l3.476,3.128A13.115,13.115,0,0,0,80.88,436.8a.488.488,0,0,1-.755-.171l-1.633-3.592.517-.775A.38.38,0,0,1,79.579,432.193Z" transform="translate(-78.492 -432.095)" fill="#e4eaf6" />
                                                    <path id="Path_3112" data-name="Path 3112" d="M131.031,432.193l-3.476,3.128a13.114,13.114,0,0,1,2.175,1.482.488.488,0,0,0,.755-.171l1.633-3.592-.517-.775A.38.38,0,0,0,131.031,432.193Z" transform="translate(-122.992 -432.095)" fill="#e4eaf6" />
                                                </g>
                                                <path id="Path_3113" data-name="Path 3113" d="M152.341,290.2l.356,2.519c1.627.325,1.862,2.879,1.9,3.609a.75.75,0,0,0,.12.372l.621.963a3.643,3.643,0,0,1,.761-2.662S156.429,288.683,152.341,290.2Z" transform="translate(-118.896 -262.998)" fill="#785550" />
                                                <path id="Path_3114" data-name="Path 3114" d="M173.486,361.457l-.429,1.718a.457.457,0,0,1-.444.346h0a.457.457,0,0,1-.454-.4l-.22-1.757a.787.787,0,0,1,.781-.885h0A.787.787,0,0,1,173.486,361.457Z" transform="translate(-136.666 -326.951)" fill="#f0c087" />
                                                <path id="Path_3115" data-name="Path 3115" d="M63.3,275.593l.563.384a5.686,5.686,0,0,0-2.068,5.1,4.685,4.685,0,0,1,.761,2.662l.761-.76s-.294-2.2,1.141-3.042c1.331-.784,2.5-.38,3.684-.38,3.185,0,4.076-1.2,3.921-2.662-.08-.756-1.236-2.332-4.183-2.282A12.8,12.8,0,0,0,63.3,275.593Z" transform="translate(-36.74 -249.068)" fill="#694b4b" />
                                                <path id="Path_3116" data-name="Path 3116" d="M63.079,292.557a4.177,4.177,0,0,1,.784-3.244,5.686,5.686,0,0,0-2.068,5.1,4.685,4.685,0,0,1,.761,2.662l.761-.76s-.294-2.2,1.141-3.042c1.331-.784,2.5-.38,3.684-.38a9.352,9.352,0,0,0,1.371-.094C67.06,292.878,65.614,291.02,63.079,292.557Z" transform="translate(-36.74 -262.404)" fill="#5a4146" />
                                                <path id="Path_3117" data-name="Path 3117" d="M66.251,361.458l.429,1.718a.457.457,0,0,0,.444.346h0a.457.457,0,0,0,.454-.4l.22-1.757a.787.787,0,0,0-.781-.885h0A.787.787,0,0,0,66.251,361.458Z" transform="translate(-40.791 -326.952)" fill="#e6af78" />
                                                <path id="Path_3118" data-name="Path 3118" d="M150.659,503.575h-1.9a.76.76,0,0,0-.761.76h3.422A.761.761,0,0,0,150.659,503.575Z" transform="translate(-114.956 -456.738)" fill="#e4eaf6" />
                                                <path id="Path_3119" data-name="Path 3119" d="M335.561,277.513c-7.671,0-6.82,9.329-6.785,16.089a.722.722,0,0,0,.354.617,12.948,12.948,0,0,0,12.863,0,.722.722,0,0,0,.354-.617C342.382,286.842,343.232,277.513,335.561,277.513Z" transform="translate(-278.881 -251.702)" fill="#694b4b" />
                                                <path id="Path_3120" data-name="Path 3120" d="M335.072,277.72c-7.134.4-6.325,9.46-6.291,16.069a.722.722,0,0,0,.354.617,12.715,12.715,0,0,0,6.432,1.71l1.939-13.57" transform="translate(-278.886 -251.89)" fill="#5a4146" />
                                                <path id="Path_3121" data-name="Path 3121" d="M356.675,277.513c-4.362,0-4.665,5.27-4.665,5.27,2.514-.424,4.059.636,6.6-.424l-1.939,13.57a12.715,12.715,0,0,0,6.432-1.71.722.722,0,0,0,.354-.617C363.5,286.842,364.346,277.513,356.675,277.513Z" transform="translate(-299.994 -251.702)" fill="#694b4b" />
                                                <path id="Path_3122" data-name="Path 3122" d="M434.843,298.737c.03-5.809.657-13.509-4.033-15.562a4.306,4.306,0,0,0,.155,2.381c.969,1.939,1.939,1.939,2.908,3.392.969,5.331-1.852,10.989-2.789,11.76h0a12.188,12.188,0,0,0,3.405-1.354A.722.722,0,0,0,434.843,298.737Z" transform="translate(-371.377 -256.837)" fill="#785550" />
                                                <path id="Path_3123" data-name="Path 3123" d="M329.164,428.588l-4.324-1.8a.969.969,0,0,1-.6-.895V424.72H319.4v1.171a.969.969,0,0,1-.6.895l-4.324,1.8a1.454,1.454,0,0,0-.895,1.342v1.939a.969.969,0,0,0,.969.969H329.09a.969.969,0,0,0,.969-.969V429.93A1.454,1.454,0,0,0,329.164,428.588Z" transform="translate(-265.139 -385.217)" fill="#e6af78" />
                                                <path id="Path_3124" data-name="Path 3124" d="M329.163,449.315l-4.181-1.742-3.163,1.365-3.163-1.365-4.181,1.742a1.454,1.454,0,0,0-.895,1.342V452.6a.969.969,0,0,0,.969.969h14.539a.969.969,0,0,0,.969-.969v-1.939A1.454,1.454,0,0,0,329.163,449.315Z" transform="translate(-265.138 -405.945)" fill="#eff2fa" />
                                                <path id="Path_3125" data-name="Path 3125" d="M368.551,424.718H363.7v1.171a.969.969,0,0,1-.6.895l-.676.281C367.6,428.383,368.551,424.718,368.551,424.718Z" transform="translate(-309.448 -385.216)" fill="#d29b6e" />
                                                <g id="Group_1727" data-name="Group 1727" transform="translate(48.442 40.835)">
                                                    <path id="Path_3126" data-name="Path 3126" d="M315.942,471.372,314,469.825a1.451,1.451,0,0,0-.417,1.015v1.939a.969.969,0,0,0,.969.969h1.939v-1.24A1.454,1.454,0,0,0,315.942,471.372Z" transform="translate(-313.58 -466.963)" fill="#e4eaf6" />
                                                    <path id="Path_3127" data-name="Path 3127" d="M462.391,472.836V470.9a1.451,1.451,0,0,0-.411-1.009l-1.952,1.541a1.454,1.454,0,0,0-.546,1.135v1.24h1.939A.969.969,0,0,0,462.391,472.836Z" transform="translate(-445.913 -467.021)" fill="#e4eaf6" />
                                                    <path id="Path_3128" data-name="Path 3128" d="M397.51,465.919h-.145a.412.412,0,0,1-.412-.412v-3.245h.969v3.245A.412.412,0,0,1,397.51,465.919Z" transform="translate(-389.199 -460.103)" fill="#e4eaf6" />
                                                    <path id="Path_3129" data-name="Path 3129" d="M364.355,441.207l-2.774-2.08a.388.388,0,0,0-.555.1l-.548.822,1.7,2.381a.388.388,0,0,0,.558.077Z" transform="translate(-356.116 -439.049)" fill="#e4eaf6" />
                                                    <path id="Path_3130" data-name="Path 3130" d="M402.164,441.207l2.774-2.08a.388.388,0,0,1,.555.1l.548.822-1.7,2.381a.388.388,0,0,1-.558.077Z" transform="translate(-393.925 -439.049)" fill="#e4eaf6" />
                                                </g>
                                                <path id="Path_3131" data-name="Path 3131" d="M358.211,324.41c-2.423,2.423-7.179.485-7.179,4.362l.3,2.856a1.939,1.939,0,0,0,.989,1.519l2.759,1.533a1.454,1.454,0,0,0,1.412,0l2.759-1.533a1.938,1.938,0,0,0,.989-1.519l.347-3.392a5.358,5.358,0,0,0,.022-.726C360.43,326.277,358.7,325.379,358.211,324.41Z" transform="translate(-299.107 -294.237)" fill="#f0c087" />
                                                <path id="Path_3132" data-name="Path 3132" d="M351.032,328.773l.3,2.856a1.939,1.939,0,0,0,.989,1.519l2.759,1.533a1.448,1.448,0,0,0,.987.148h0a4.063,4.063,0,0,1-2.219-2.663c-.254-.687-.606-4.321-.3-4.766.6-.878,3.938-.969,4.924-2.6q-.073-.091-.135-.182l-.011-.015a1.855,1.855,0,0,1-.114-.194C355.788,326.834,351.032,324.9,351.032,328.773Z" transform="translate(-299.107 -294.238)" fill="#e6af78" />
                                                <path id="Path_3133" data-name="Path 3133" d="M419.881,501.577h-1.26a.824.824,0,0,0-.824.824v.145H420.7V502.4A.824.824,0,0,0,419.881,501.577Z" transform="translate(-359.663 -454.926)" fill="#e4eaf6" />
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <div className="cardBody">
                                    <span>{this.state.supporterCount?this.state.supporterCount:0}</span>
                                    <span>Total Supporter</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="paymentCard" onClick={this.paymentRouting}>
                            <CardContent>
                                <div className="cardHeader">
                                    <h3>Payment Request</h3>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                                            <g id="payment_request" data-name="payment request" transform="translate(0 -0.301)">
                                                <path id="Path_3005" data-name="Path 3005" d="M457.041,69.494,449.1,61.543V93.405h10.621V75.95A9.1,9.1,0,0,0,457.041,69.494Zm0,0" transform="translate(-415.726 -56.69)" fill="#ffb782" />
                                                <path id="Path_3006" data-name="Path 3006" d="M6.2,30.916.2,15.341a3.034,3.034,0,0,1,1.741-3.922L30.261.512a3.034,3.034,0,0,1,3.922,1.741l6,15.575a3.034,3.034,0,0,1-1.741,3.922L10.125,32.657A3.035,3.035,0,0,1,6.2,30.916Zm0,0" transform="translate(0 -0.007)" fill="#de4c3c" />
                                                <path id="Path_3007" data-name="Path 3007" d="M66.148,101.961,32.2,115.122l2.261,5.869L68.41,107.836Zm0,0" transform="translate(-29.803 -94.104)" fill="#7a4930" />
                                                <path id="Path_3008" data-name="Path 3008" d="M0,20.025V3.335A3.035,3.035,0,0,1,3.038.3H33.383a3.035,3.035,0,0,1,3.035,3.035v16.69a3.035,3.035,0,0,1-3.035,3.035H3.038A3.035,3.035,0,0,1,0,20.025Zm0,0" transform="translate(-0.004)" fill="#4398d1" />
                                                <path id="Path_3009" data-name="Path 3009" d="M125.5.3h-3.224L99.52,23.06H125.5a3.035,3.035,0,0,0,3.035-3.035V3.335A3.035,3.035,0,0,0,125.5.3Zm0,0" transform="translate(-92.123)" fill="#3e8cc7" />
                                                <path id="Path_3010" data-name="Path 3010" d="M40.832,163.609h3.035v1.517H40.832Zm0,0" transform="translate(-37.798 -151.17)" fill="#5eb3d1" />
                                                <path id="Path_3011" data-name="Path 3011" d="M40.832,224.852h3.035v1.517H40.832Zm0,0" transform="translate(-37.798 -207.861)" fill="#5eb3d1" />
                                                <path id="Path_3012" data-name="Path 3012" d="M224.555,224.852h3.035v1.517h-3.035Zm0,0" transform="translate(-207.865 -207.861)" fill="#5eb3d1" />
                                                <path id="Path_3013" data-name="Path 3013" d="M102.074,163.609h3.034v1.517h-3.034Zm0,0" transform="translate(-94.488 -151.17)" fill="#5eb3d1" />
                                                <path id="Path_3014" data-name="Path 3014" d="M163.313,163.609h3.035v1.517h-3.035Zm0,0" transform="translate(-151.175 -151.17)" fill="#5eb3d1" />
                                                <path id="Path_3015" data-name="Path 3015" d="M224.555,163.609h3.035v1.517h-3.035Zm0,0" transform="translate(-207.865 -151.17)" fill="#5eb3d1" />
                                                <path id="Path_3016" data-name="Path 3016" d="M418.484,41.129H420V43.4h-1.517Zm0,0" transform="translate(-387.381 -37.794)" fill="#5eb3d1" />
                                                <path id="Path_3017" data-name="Path 3017" d="M377.656,41.129h1.517V43.4h-1.517Zm0,0" transform="translate(-349.587 -37.794)" fill="#5eb3d1" />
                                                <path id="Path_3018" data-name="Path 3018" d="M336.828,41.129h1.517V43.4h-1.517Zm0,0" transform="translate(-311.794 -37.794)" fill="#5eb3d1" />
                                                <path id="Path_3019" data-name="Path 3019" d="M296,41.129h1.517V43.4H296Zm0,0" transform="translate(-274.004 -37.794)" fill="#5eb3d1" />
                                                <path id="Path_3020" data-name="Path 3020" d="M408.277,490.23h13.655v7.586H408.277Zm0,0" transform="translate(-377.932 -453.515)" fill="#88b337" />
                                                <path id="Path_3021" data-name="Path 3021" d="M308.451,172.742a3.289,3.289,0,0,0-4.749,4.548l6.217,6.782a10.231,10.231,0,0,0,.207,10.5l.552.882h9.862V184.831Zm0,0" transform="translate(-280.333 -158.737)" fill="#ffb782" />
                                                <path id="Path_3022" data-name="Path 3022" d="M438.9,520.852h1.517v1.517H438.9Zm0,0" transform="translate(-406.277 -481.861)" fill="#6b962a" />
                                                <path id="Path_3023" data-name="Path 3023" d="M40.832,45.984V42.343a1.214,1.214,0,0,1,1.214-1.214h3.641A1.213,1.213,0,0,1,46.9,42.343v3.641A1.213,1.213,0,0,1,45.687,47.2H42.046A1.214,1.214,0,0,1,40.832,45.984Zm0,0" transform="translate(-37.798 -37.794)" fill="#fdb62f" />
                                                <path id="Path_3024" data-name="Path 3024" d="M40.832,71.75h2.276v1.517H40.832Zm0,0" transform="translate(-37.798 -66.139)" fill="#fd7b2f" />
                                                <path id="Path_3025" data-name="Path 3025" d="M91.867,71.75h2.276v1.517H91.867Zm0,0" transform="translate(-85.04 -66.139)" fill="#fd7b2f" />
                                                <path id="Path_3026" data-name="Path 3026" d="M483.633,290.762a.757.757,0,0,1-.536-.222l-3.035-3.035a.759.759,0,0,1,1.073-1.073l3.035,3.035a.759.759,0,0,1-.537,1.3Zm0,0" transform="translate(-444.185 -264.668)" fill="#f2a46f" />
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <div className="cardBody">
                                    <span>{this.state.paymentCount ? this.state.paymentCount : 0}</span>
                                    <span>Total Payment Request</span>
                                </div>
                            </CardContent>
                        </Card>


                </div>

                
                </div>

                
                </div> 
            
        );
    }
}
export default withRouter(GuardianDashboard);
