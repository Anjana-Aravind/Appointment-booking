import React, { useCallback, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "../css/styles";
import { withStyles } from "@material-ui/core";

function PendingRequest(props) {
  const [pendingRequestDetails, setPendingRequestDetails] = useState(
    props.pendingRequestDetails
  );

  const classes = styles();

  const renderInputCard = () => {
    return (
      pendingRequestDetails &&
      pendingRequestDetails.length > 0 &&
      pendingRequestDetails.map((item) => {
        return (
          <React.Fragment>
            <div className={classes.inputsContainer}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    ></Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Customer name:{item.customerName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Contact number:{item.contactNumber}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Appointment date:{item.appointmentDate}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Appointment time :{item.timeslot}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <div
                    className={[
                      classes.inlineFlex,
                      classes.marginRightMedium,
                    ].join(" ")}
                  >
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => approveRequest("Accept")}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => approveRequest("Reject")}
                    >
                      Reject
                    </Button>
                  </div>
                </CardActions>
                <CardActions></CardActions>
              </Card>
            </div>
          </React.Fragment>
        );
      })
    );
  };

  const approveRequest = (action, item) => {
    const status = null;
    const appId = item.appointmentId;
    if (action === "Accept") {
      status = "Accepted";
    } else {
      status = "Rejected";
    }
    fetch(`http://localhost:5000/appointment/approveAppointment/?id=${appId}`, {
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentStatus: status,
      }),
    })
      .then((res) => res.json())
      .then((res) => {});
  };
  return (
    <div>
      {props.pendingRequestDetails ? <div>{renderInputCard()}</div> : "jjjj"}
    </div>
  );
}

export default withStyles(styles)(PendingRequest);
