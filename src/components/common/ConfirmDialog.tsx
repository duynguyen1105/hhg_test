import {
    Button,
    ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography
} from "@material-ui/core";
import WarningIcon from '@material-ui/icons/Warning';
import React from "react";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(10),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    color: theme.palette.secondary.main,
    "&:hover": {
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function ConfirmDialog(props: any) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disabled className={classes.titleIcon}>
          <WarningIcon className={classes.titleIcon}/>
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <ButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            onClick={confirmDialog.onConfirm}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
          >
            No
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
