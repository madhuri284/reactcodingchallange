import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ErrorType from "./error-type";
import InfoType from "./info-type";
import WarningType from "./warning-type";

const useStyles = makeStyles(() =>
  createStyles({
    startStyle: {
      backgroundColor: "#14F5D7",
      marginRight: "16px",
    },
    rowC: {
      marginLeft: "15%",
      width: "75%",
      display: "flex",
      flexDirection: "row",
    },
  })
);

const MessageGrid = (props) => {
  const classes = useStyles();
  const [isStarted, setIsStarted] = React.useState(true);
  const [messageList, setMessageList] = React.useState(props.messages);
  const [errorList, setErrorList] = React.useState([]);
  const [warnList, setWarnList] = React.useState([]);
  const [infoList, setInfoList] = React.useState([]);

  React.useEffect(() => {
    setMessageList(props.messages);
  }, [props.messages]);

  React.useEffect(() => {
    let eList = [];
    let wList = [];
    let iList = [];
    messageList.map((mess) => {
      if (mess.priority === 1) {
        eList.unshift(mess);
      }
      if (mess.priority === 2) {
        wList.unshift(mess);
      }
      if (mess.priority === 3) {
        iList.unshift(mess);
      }
    });
    setErrorList(eList);
    setWarnList(wList);
    setInfoList(iList);
  }, [messageList]);

  const handleClear = () => {
    props.clearMessages();
  };

  const handleStart = () => {
    isStarted ? props.stopMessages() : props.startMessages();
    setIsStarted(isStarted ? false : true);
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%" }}>
        <Button
          variant="contained"
          className={classes.startStyle}
          onClick={handleStart}
        >
          {isStarted ? "Stop" : "Start"}
        </Button>
        <Button
          variant="contained"
          className={classes.startStyle}
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
      <div className={classes.rowC}>
        <Grid item xs={4}>
          <ErrorType
            messageList={errorList}
            clearMessageById={props.clearMessageById}
          />
        </Grid>
        <Grid item xs={4}>
          <WarningType
            messageList={warnList}
            clearMessageById={props.clearMessageById}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoType
            messageList={infoList}
            clearMessageById={props.clearMessageById}
          />
        </Grid>
      </div>
    </>
  );
};

export default MessageGrid;
