import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

import styles from "../../css/styles";
import { withStyles } from "@material-ui/core";

const Navbar = (props) => {
  const classes = styles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {props.user === "customer"
          ? "Welcome" + ", " + props.customerDetails.customerName
          : props.sellerDetails.sellerName}
        <Typography variant="h6" className={classes.title}>
          APPOINTMENT
        </Typography>
        {props.pendingRequestDetails && props.pendingRequestDetails.length > 0 && (
          <div
            className={classes.marginRightMedium}
            onClick={() => {
              props.showPendingRequest(true);
            }}
          >
            {" "}
            Pending Request -{" "}
            {props.pendingRequestDetails && props.pendingRequestDetails.length}
          </div>
        )}
        {props.function.includes("Add") ? (
          <div
            onClick={() => {
              props.onAddAppointment(true);
            }}
            className={classes.inlineFlex}
          >
            <AddIcon /> Add Appointment
          </div>
        ) : (
          <div className={classes.flex}>
            <SearchIcon />
            <TextField
              id="standard-basic"
              label="Search Salon..."
              size="small"
            />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Navbar);
