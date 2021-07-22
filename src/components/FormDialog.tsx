import { ButtonGroup, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import apiCaller from "../utils/apiCaller";
import Loading from "./common/Loading";

export default function FormDialog(props: any) {
  const {
    typeAction,
    open,
    handleClose,
    handleAddItem,
    handleEditItem,
    id = "",
  } = props;

  const initialData = {
    firstname: "",
    lastname: "",
    email: "",
    position: "",
  };

  const initialIsError = {
    firstname: false,
    lastname: false,
    email: false,
    position: false,
  };

  const [dataEmployee, setDataEmployee] = useState<any>(initialData);
  const [errorsMessage, setErrorsMessage] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
  });

  const [loading, setLoading] = useState(true);

  const [isError, setIsError] = useState(initialIsError);

  const fetchData = async () => {
    setDataEmployee(initialData);
    if (typeAction === "edit") {
      setLoading(true);
      const data = await apiCaller(`/${id}`, "get", null);
      setDataEmployee(data?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onChange = async (event: any) => {
    if (event.target.value.length === 0) {
      setIsError({ ...isError, [event.target.name]: true });
      setErrorsMessage({
        ...errorsMessage,
        [event.target.name]: "This field is required!",
      });
    } else {
      setIsError({ ...isError, [event.target.name]: false });
      setErrorsMessage({ ...errorsMessage, [event.target.name]: "" });
    }

    if (event.target.name === "email") {
      if (!validateEmail(event.target.value)) {
        setIsError({ ...isError, email: true });
        setErrorsMessage({ ...errorsMessage, email: "Invalid email!" });
      } else {
        setIsError({ ...isError, [event.target.name]: false });
        setErrorsMessage({ ...errorsMessage, [event.target.name]: "" });
      }
    }

    setDataEmployee({
      ...dataEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const onSave = async (event: any) => {
    event.preventDefault();
    if (JSON.stringify(isError) === JSON.stringify(initialIsError)) {
      handleClose();
      typeAction === "add"
        ? await handleAddItem(dataEmployee)
        : await handleEditItem(dataEmployee, id);
      setDataEmployee(initialData);
      fetchData();
      setIsError(initialIsError);
    }
  };

  const onClose = () => {
    handleClose();
    setErrorsMessage({
      firstname: "",
      lastname: "",
      email: "",
      position: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form noValidate>
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5" style={{ color: "#4d7cc1" }}>
            {typeAction === "add" ? "Add new employee" : "Edit employee"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {loading && <Loading />}

          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="firstname"
                type="text"
                label="First Name"
                value={dataEmployee.firstname}
                onChange={onChange}
                error={isError.firstname}
                helperText={errorsMessage.firstname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="lastname"
                type="text"
                label="Last Name"
                value={dataEmployee.lastname}
                onChange={onChange}
                error={isError.lastname}
                helperText={errorsMessage.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                fullWidth
                required
                type="email"
                label="Email"
                value={dataEmployee.email}
                onChange={onChange}
                error={isError.email}
                helperText={errorsMessage.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="position"
                type="text"
                label="Position"
                value={dataEmployee.position}
                onChange={onChange}
                error={isError.position}
                helperText={errorsMessage.position}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button
              variant="outlined"
              color="primary"
              onClick={onSave}
              type="submit"
            >
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </DialogActions>
      </form>
    </Dialog>
  );
}
