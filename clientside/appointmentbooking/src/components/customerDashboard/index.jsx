import React, { useState, useEffect } from "react";
import Navbar from "../common/navbarcomponent/navbar.component";
import AppointmentBooking from "../appointmentBooking/appointmentBooking";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import styles from "../css/styles";
import { withStyles } from "@material-ui/core";

function CustomerDashboard() {
  const [availabletAppointments, setAvailableAppointments] = useState("");
  const [appointmentModal, showAppointmentModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");

  const functions = ["Search"];
  const classes = styles();

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    getAvailableAppointments();
  }, []);

  const bookAppointment = (item) => {
    showAppointmentModal(true);
    const fromTime = item.timeslot.split("-")[0];
    const toTime = item.timeslot.split("-")[1];
    item = { ...item, fromTime, toTime };
    setAppointmentDetails(item);
  };

  // API Calls
  const getAllCustomers = () => {
    fetch("http://localhost:5000/Customer/allCustomers")
      .then((response) => response.json())
      .then((data) => {
        const detail = data.find((item) => item.customerName === "Anjana A");
        setCustomerDetails(detail);
      });
  };

  const getAvailableAppointments = () => {
    fetch("http://localhost:5000/Appointment/availableAppointments")
      .then((response) => response.json())
      .then((data) => {
        setAvailableAppointments(data);
      });
  };
  return (
    <div>
      {!appointmentModal ? (
        <React.Fragment>
          <div>
            <Navbar
              function={functions}
              user={"customer"}
              customerDetails={customerDetails}
            />
          </div>

          {availabletAppointments &&
            availabletAppointments.length > 0 &&
            availabletAppointments.map((item) => {
              console.log(item);
              return (
                <div className={classes.inputsContainer}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.sellerName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Appointment date: {item.appointmentDate}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Appointment time : {item.timeslot}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => bookAppointment(item)}
                        color="primary"
                      >
                        Book Appointment
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
        </React.Fragment>
      ) : (
        <AppointmentBooking
          user={"customer"}
          appointmentDetails={appointmentDetails}
          customerDetails={customerDetails}
        />
      )}
    </div>
  );
}
export default withStyles(styles)(CustomerDashboard);
