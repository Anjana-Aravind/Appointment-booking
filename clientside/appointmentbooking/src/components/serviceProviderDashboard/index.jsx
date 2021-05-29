import React, { useCallback, useState, useEffect } from "react";
import Navbar from "../common/navbarcomponent/navbar.component";
import AppointmentBooking from "../appointmentBooking/appointmentBooking";
import PendingRequest from "../appointmentBooking/pendingRequest";

import styles from "../css/styles";
import { withStyles } from "@material-ui/core";

function ServiceProviderDashboard() {
  const [appointmentModal, showAppointmentModal] = useState(false);
  const [sellerDetails, setSellerDetails] = useState("");
  const [pendingRequestDetails, setPendingRequestDetails] = useState("");
  const [pendingRequest, showPendingRequest] = useState("");

  const functions = ["Add"];

  useEffect(() => {
    getPendingBookingRequest();
  });

  useEffect(() => {
    getAllSellers();
  }, []);

  // API
  const getPendingBookingRequest = () => {
    fetch("http://localhost:5000/Appointment/getPendingRequest")
      .then((response) => response.json())
      .then((data) => {
        setPendingRequestDetails(data);
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
      <div>
        <Navbar
          function={functions}
          onAddAppointment={showAppointmentModal}
          sellerDetails={sellerDetails}
          pendingRequestDetails={pendingRequestDetails}
          showPendingRequest={showPendingRequest}
        />
      </div>
      {appointmentModal && (
        <AppointmentBooking
          user={"seller"}
          sellerDetails={sellerDetails}
          showAppointmentModal={showAppointmentModal}
        />
      )}
      {pendingRequest && (
        <PendingRequest pendingRequestDetails={pendingRequestDetails} />
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(ServiceProviderDashboard);
