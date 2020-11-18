import React from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(8),
      background: "#F56236",
    },
  },
}));

const ErrorType = (props) => {
  const classes = useStyles();

  const handleOnClick = (id) => {
    props.clearMessageById(id);
  };

  return (
    <>
      <h3 style={{ marginBottom: "2px" }}>Error Type 1</h3>
      <div> count: {props.messageList.length} </div>
      {props.messageList.map((messageInfo) => {
        return (
          <div className={classes.root} key={messageInfo.id}>
            <Paper elevation={3}>
              <div style={{ marginTop: "8px", marginLeft: "12px" }}>
                {messageInfo.message}
              </div>

              <div
                style={{
                  textAlign: "right",
                  marginRight: "16px",
                  cursor: "pointer",
                }}
                onClick={() => handleOnClick(messageInfo.id)}
              >
                Clear
              </div>
            </Paper>
          </div>
        );
      })}
    </>
  );
};

export default ErrorType;
