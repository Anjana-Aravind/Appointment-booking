import React, { useCallback, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from "../css/styles";
import { withStyles } from "@material-ui/core";

function Appointment(props) {
  const [appointmentModal, showAppointmentModal] = useState(true);
  const classes = styles();

  const [appointmentDetails, setAppointmentDetails] = useState(
    props.appointmentDetails
      ? props.appointmentDetails
      : {
          sellerName: "Huda beauty salon",
          appointmentDate: getDate(),
          fromTime: "10:00 AM",
          toTime: "12.30 PM",
        }
  );
  const [sellerDetails, setSellerDetails] = useState("");
  const [appointmentSuccessMessage, setAppointmentSuccessMessage] =
    useState(false);

  useEffect(() => {
    getAllSellers();
  }, []);

  const handleChange = (e) => {
    setAppointmentDetails({
      ...appointmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const inputfields = () => {
    return (
      <div>
        <div
          className={[classes.inputsContainer, classes.marginTopMedium].join(
            " "
          )}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={appointmentDetails.sellerName}
            label={"Salon name"}
            name="sellerName"
            className="classes.inputs"
          />
        </div>

        <div
          className={[classes.inputsContainer, classes.marginTopMedium].join(
            " "
          )}
        >
          <TextField
            id="date"
            label="Appointment date"
            value={appointmentDetails.appointmentDate}
            type="date"
            name="appointmentDate"
            defaultValue={getDate()}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </div>
        <div
          className={[classes.inputsContainer, classes.marginTopMedium].join(
            " "
          )}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={appointmentDetails.fromTime}
            label="From time"
            className="classes.inputs"
            name="fromTime"
            onChange={handleChange}
          />
        </div>
        <div
          className={[classes.inputsContainer, classes.marginTopMedium].join(
            " "
          )}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={appointmentDetails.toTime}
            label="To time"
            className="classes.inputs"
            name="toTime"
            className="classes.inputs"
            onChange={handleChange}
          />

          {props.user == "customer" && (
            <div>
              <div
                className={[
                  classes.inputsContainer,
                  classes.marginTopMedium,
                ].join(" ")}
              >
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    appointmentDetails.customerName
                      ? appointmentDetails.customerName
                      : ""
                  }
                  label="Customer name"
                  className="classes.inputs"
                  name="customerName"
                  className="classes.inputs"
                  onChange={handleChange}
                />
              </div>
              <div
                className={[
                  classes.inputsContainer,
                  classes.marginTopMedium,
                ].join(" ")}
              >
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    appointmentDetails.contactNumber
                      ? appointmentDetails.contactNumber
                      : ""
                  }
                  label="Contact number"
                  className="classes.inputs"
                  name="contactNumber"
                  className="classes.inputs"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>
        <div
          className={[classes.inputsContainer, classes.marginTopMedium].join(
            " "
          )}
        >
          {props.user === "seller" ? (
            <Button
              className={classes}
              variant="contained"
              color="primary"
              onClick={addAppointmentDetails}
            >
              Add Appointment
            </Button>
          ) : (
            <Button
              className={classes}
              variant="contained"
              color="primary"
              onClick={bookAppointmentDetails}
            >
              Book appointment
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Books a new appointment for the customer

  const bookAppointmentDetails = () => {
    fetch("http://localhost:5000/appointment/bookAppointment", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerId: sellerDetails._id,
        customerId: props.customerDetails._id,
        customerName: props.customerDetails.customerName,
        contactId: props.customerDetails.contactId,
        appointmentDate: appointmentDetails.appointmentDate,
        appointmentId: appointmentDetails._id,
        timeslot: appointmentDetails.fromTime + "-" + appointmentDetails.toTime,
        appointmentStatus: null,
      }),
    }).then((res) => res.json(), updateAppointmentAvailability());
  };

  // Updates the  availability status of the appointment

  const updateAppointmentAvailability = () => {
    const appId = appointmentDetails._id;
    fetch(
      `http://localhost:5000/appointment/updateAppointmentAvailabilityStatus/?id=${appId}`,
      {
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAvailable: 0,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.isAdded == true) {
          setAppointmentSuccessMessage(true); //
          setTimeout(() => {
            // ***
            setAppointmentSuccessMessage(false);
            showAppointmentModal(false);
            props.showAppointmentModal(false);
          }, 3000);
        }
      });
  };

  // Add a new appointment for the seller

  const addAppointmentDetails = () => {
    fetch("http://localhost:5000/appointment/addAppointment", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerId: sellerDetails._id,
        sellerName: sellerDetails.sellerName,
        appointmentDate: appointmentDetails.appointmentDate,
        timeslot: appointmentDetails.fromTime + "-" + appointmentDetails.toTime,
        isAvailable: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isAdded == true) {
          setAppointmentSuccessMessage(true); //
          setTimeout(() => {
            // ***
            setAppointmentSuccessMessage(false);
            showAppointmentModal(false);
            props.showAppointmentModal(false);
          }, 3000);
        }
      });
  };

  const getAllSellers = () => {
    fetch("http://localhost:5000/Seller")
      .then((response) => response.json())
      .then((data) => {
        const detail = data.find(
          (item) => item.sellerName === "Huda Beauty Salon"
        );
        setSellerDetails(detail);
      });
  };

  return (
    <React.Fragment>
      {appointmentModal && (
        <div>
          <Card className={classes.card}>
            {!appointmentSuccessMessage ? (
              <div className={classes.textAlignCenter}>
                <div>
                  {props.user == "customer"
                    ? "Book appointment"
                    : "Add appointment"}
                </div>
                {inputfields()}
              </div>
            ) : (
              "Appoinment added successfully"
            )}
          </Card>
        </div>
      )}
    </React.Fragment>
  );
}

const getDate = () => {
  const formatYmd = (date) => date.toISOString().slice(0, 10);
  const date = formatYmd(new Date());
  return date;
};

export default withStyles(styles)(Appointment);
