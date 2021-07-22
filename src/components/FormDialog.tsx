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

  const [dataEmployee, setDataEmployee] = useState<any>(initialData);
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    positionError: "",
  });
  const [loading, setLoading] = useState(true);

  const validate = () => {
    let isError = false;

    if (dataEmployee.firstname.length < 2) {
      isError = true;
      errors.firstNameError = "Username needs to be atleast 5 characters long";
    }

    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!dataEmployee.email.match(validRegex)) {
      isError = true;
      errors.emailError = "Requires valid email";
    }

    setErrors({
      ...errors,
    });

    return isError;
  };

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

  const onChange = (event: any) => {
    setDataEmployee({
      ...dataEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const onSave = async (event: any) => {
    event.preventDefault();
    const err = validate();
    if (true) {
      typeAction === "add"
        ? await handleAddItem(dataEmployee)
        : await handleEditItem(dataEmployee, id);
      setDataEmployee(initialData);
      handleClose();
    }
  };

  const onClose = () => {
    handleClose();
    setErrors({
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      positionError: "",
    });
    // setDataEmployee(initialData);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={onSave} noValidate>
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
                // error={validate}
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
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClose}
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
