import { ButtonGroup, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import apiCaller from "../utils/apiCaller";
import Loading from "./common/Loading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type EmployeeValue = {
  firstname: string;
  lastname: string;
  email: string;
  position: string;
};

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("First Name is required")
    .max(32, "First Name must be less than 20 characters"),
  lastname: yup
    .string()
    .required("Last Name is required")
    .max(32, "Last Name must be less than 20 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  position: yup.string().required("Position is required"),
});

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

  const [dataEmployee, setDataEmployee] = useState<EmployeeValue>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (dataEmployee) {
      setValue("firstname", dataEmployee.firstname);
      setValue("lastname", dataEmployee.lastname);
      setValue("email", dataEmployee.email);
      setValue("position", dataEmployee.position);
    }
  }, [dataEmployee]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<EmployeeValue>({ resolver: yupResolver(schema) });

  const fetchData = async () => {
    setDataEmployee(initialData);
    if (typeAction === "edit") {
      setLoading(true);
      const data = await apiCaller(`/${id}`, "get", null);
      setDataEmployee(data?.data);
      setLoading(false);
    }
  };

  const onSave = async (data: any) => {
    handleClose();
    typeAction === "add"
      ? await handleAddItem(data)
      : await handleEditItem(data, id);
    setDataEmployee(initialData);
    fetchData();
  };

  const handleOnClose = () => {
    clearErrors(["firstname", "lastname", "email", "position"]);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit((data) => onSave(data))}>
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5" style={{ color: "#4d7cc1" }}>
            {typeAction === "add" ? "Add new employee" : "Edit employee"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {loading && <Loading />}

          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <Controller
                render={({ field: { value, onChange, ref } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    fullWidth
                    label="First Name *"
                    error={errors.firstname ? true : false}
                    helperText={errors.firstname?.message}
                  />
                )}
                name="firstname"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field: { value, onChange, ref } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    fullWidth
                    label="Last Name *"
                    error={errors.lastname ? true : false}
                    helperText={errors.lastname?.message}
                  />
                )}
                name="lastname"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field: { value, onChange, ref } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    fullWidth
                    label="Email *"
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                  />
                )}
                name="email"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field: { value, onChange, ref } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    fullWidth
                    label="Position *"
                    error={errors.position ? true : false}
                    helperText={errors.position?.message}
                  />
                )}
                name="position"
                control={control}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOnClose}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </DialogActions>
      </form>
    </Dialog>
  );
}
