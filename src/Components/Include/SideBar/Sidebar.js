import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  List,
  Drawer,
  Collapse,
  Avatar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { adminRoutingList, guardianRoutingList } from "./RouteContent";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import BackdropLoader from "../../../services/loader";
import "./Sidebar.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  sectionDesktop: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  headerShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    // width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: "20px",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  title: {
    flexGrow: 0
    // padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(3)
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  }
}));

function SideBar(props) {
  let listConfig =
    localStorage.getItem("role") === "GUARDIAN"
      ? guardianRoutingList
      : adminRoutingList;
  // const userInitials = localStorage.getItem('userInitials');
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [close, setClose] = React.useState(false);
  const [customClass, setCustomClass] = React.useState(null);
  const [sublist, sublistOpen] = React.useState(true);
  const [loginUser, setLoginUser] = React.useState({});
  const [userInitials, setUserInitials] = React.useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [loader, setLoader] = React.useState(false);
  const sidebarHeader = "sidebarHeader";
  const handleClick = () => {
    sublistOpen(!sublist);
  };
  const handleDrawerOpen = () => {
    setCustomClass("drawerOpenClass");
    setOpen(true);
    setClose(false);
  };
  const handleDrawerClose = () => {
    setCustomClass("mainContent");
    setOpen(false);
    setClose(true);
  };

  window.addEventListener("storage", e => {
    if (e.key === "token" && e.oldValue && e.newValue === null) {
      LogOut();
    }
  });
  const LogOut = () => {
    localStorage.clear();
    return (window.location = "");
  };
  const profileScreen = () => {
    props.children.props.history.push("/profile");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BackdropLoader open={loader} />
      <div className="Sidebar">
        <IconButton
          color="inherit"
          aria-label="open d+rawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open
          })}
          style={{ color: "#4169e1" }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="persistent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
          anchor="left"
        >
          <div className={(classes.toolbar, sidebarHeader)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="235"
              height="73"
              viewBox="0 0 235 73"
            >
              <g
                id="Group_1675"
                data-name="Group 1675"
                transform="translate(-13 -18)"
              >
                <rect
                  id="Rectangle_367"
                  data-name="Rectangle 367"
                  width="235"
                  height="73"
                  rx="10"
                  transform="translate(13 18)"
                  fill="#fff"
                />
                <g
                  id="Group_1674"
                  data-name="Group 1674"
                  transform="translate(-1.764 -1)"
                >
                  <g
                    id="Group_1"
                    data-name="Group 1"
                    transform="translate(-1628.571 379.006)"
                  >
                    <path
                      id="Path_1317"
                      data-name="Path 1317"
                      d="M499.756-567.84a4.542,4.542,0,0,1-1.746.072c-.867-.261-1.522-1.235-2.058-1.921-1.106-1.478-2.1-3.019-3.186-4.516-2.1-2.891-3.479-6.258-5.016-9.458-.443-.913-1.612-2.662-1.1-3.671,1.013-1.979,3.7-1.773,5.595-1.979a72.555,72.555,0,0,1,12.488,0c2.375.1,4.88.2,5.764,2.745h.137c2.375-3.842,1.96-9.146,1.04-13.311a14.243,14.243,0,0,0-1.8-4.542,13.533,13.533,0,0,0-2.748-3.593c-2.607-2.625-5.566-4.535-9.389-4.49-2.524.03-5.043,1.862-7.136,3.1-3.661,2.17-7.307,4.446-11,6.513-3.038,1.714-7.078,3.125-8.575,6.579-1.031,2.375-.6,5.437-.6,7.959v14.821c0,3.313-.229,6.385,2.1,9.057a11.8,11.8,0,0,0,5.136,3.116,19.929,19.929,0,0,0,17.055-1.87A19.261,19.261,0,0,0,499.756-567.84Z"
                      transform="translate(1185 257.5)"
                      fill="#0053a3"
                    />
                    <path
                      id="Path_1333"
                      data-name="Path 1333"
                      d="M729.437-588.363c.574,1.372,2.215,1.972,3,3.184,2.569,4,2.984,5.241,3.457,12.305.414,4.227-1.848,6.9-3.085,9.879-.487,1.168-1.534,2.664-1.124,3.98.439,1.441,2.36,2.249,3.6,2.913,3.2,1.752,6.313,3.615,9.469,5.459,1.423.836,3.088,1.564,4.505.237.921-.856.847-2.229.847-3.4v-16.467c0-1.776.174-3.547-.557-5.215-1.128-2.573-3.454-3.748-5.755-5.06-3.52-2.008-6.956-4.231-10.567-6.056A22.307,22.307,0,0,0,729.437-588.363Z"
                      transform="translate(961.455 236.671)"
                      fill="#fb8278"
                    />
                    <path
                      id="Path_1414"
                      data-name="Path 1414"
                      d="M529.3-317.8a6.4,6.4,0,0,0,2.291,1.917l5.077,2.939c4.512,2.573,9.661,7.084,15.232,5.54,3.431-.961,6.612-3.727,9.743-5.39,2.679-1.422,5.388-2.942,7.959-4.541,1.313-.823,2.333-1.485,2.333-3.156a2.972,2.972,0,0,0-1.784-2.461c-2.03-1.245-4.174-2.48-6.312-3.578-1.688-.858-3.294-1.966-4.94-2.882a6.347,6.347,0,0,0-2.333-1.09c-1.7-.125-2.386.952-3.311,2.187-.893,1.192-1.7,2.465-2.589,3.723a20.264,20.264,0,0,1-9.606,6.751C535.409-316.037,530.012-317.8,529.3-317.8Z"
                      transform="translate(1134.124 14.204)"
                      fill="#fb8278"
                    />
                  </g>
                  <text
                    id="SpendAble"
                    transform="translate(102.764 60)"
                    fontSize="25"
                    fontFamily="SegoeUI-Bold, Segoe UI"
                    letterSpacing="-0.026em"
                    fontWeight="700"
                  >
                    <tspan x="0" y="0">
                      SpendAble
                    </tspan>
                  </text>
                  <text
                    id="Enabling_Choices_Empowering_Change"
                    data-name="Enabling Choices, Empowering Change"
                    transform="translate(89.764 77)"
                    fontSize="9"
                    fontFamily="SegoeUI, Segoe UI"
                    letterSpacing="-0.02em"
                  >
                    <tspan x="0" y="0">
                      Enabling Choices, Empowering Change
                    </tspan>
                  </text>
                </g>
              </g>
            </svg>
            <IconButton
              style={{ color: "#4169e1" }}
              className={clsx(classes.menuButton, {
                [classes.hide]: close
              })}
              onClick={handleDrawerClose}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </div>
          <div className="profilePart" onClick={profileScreen}>
            <Avatar>
              {userInitials !== null && userInitials.userInitials !== null
                ? userInitials.userInitials
                : ""}
            </Avatar>
            <div>
              <h5>{userInitials !== null ? userInitials.fullName : ""}</h5>
              <span>{userInitials !== null ? userInitials.email : ""}</span>
            </div>
          </div>
          <div className="outerDivForLists">
            <List className="lists">
              {listConfig.map((items, index) => (
                <div
                  key={index}
                  className={items.className ? items.className : ""}
                >
                  {items.type === "subListType" ? (
                    <div className="subListHeadings">
                      <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                          <span className={items.icon}></span>
                        </ListItemIcon>
                        <ListItemText primary={items.title} />
                        {sublist ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={sublist} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {items.item.map((subitem, index) => (
                            <div>
                              <ListItem
                                button
                                className={classes.nested}
                                key={subitem.title}
                                component={Link}
                                to={`${subitem.path}`}
                              >
                                <ListItemIcon>
                                  <span className={items.icon}></span>
                                </ListItemIcon>
                                <ListItemText primary={subitem.title} />
                              </ListItem>
                            </div>
                          ))}
                        </List>
                      </Collapse>
                    </div>
                  ) : (
                      <div
                        className={
                          props.children.props.location.pathname === items.path
                            ? "sidebarColor"
                            : ""
                        }
                      >
                        <span key={index}>
                          <ListItem
                            button
                            // onClick={sidebarClick}
                            key={items.title}
                            component={Link}
                            to={`${items.path}`}
                          >
                            <ListItemIcon>
                              <span className="icons">{items.image} </span>
                            </ListItemIcon>
                            <ListItemText primary={items.title} />
                          </ListItem>
                        </span>
                      </div>
                    )}
                </div>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
      {/*  */}
      <div className={customClass ? customClass : "drawerOpenClass"}>
        <div>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open
            })}
          >
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
