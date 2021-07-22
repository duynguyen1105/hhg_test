import {
  Button,
  ButtonGroup, Container,
  Typography
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { DeleteForeverOutlined, EditOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import apiCaller from "../utils/apiCaller";
import ConfirmDialog from "./common/ConfirmDialog";
import Loading from "./common/Loading";
import Notification from "./common/Notification";
import FormDialog from "./FormDialog";
import TablePaginationActions from "./TablePaginationActions";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#4f9ed5",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);


export default function EmployeeTable() {
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [typeFormDialog, setTypeFormDialog] = useState<string>();
  const [idEmployee, setIdEmployee] = useState<string>();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    const employeeData = await apiCaller("/", "get", null);
    setEmployeeData(employeeData?.data);
    setLoading(false);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleDeleteEmployee = async (id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setEmployeeData([]);
    setLoading(true);
    await apiCaller(`/${id}`, "delete", null);
    await fetchData();
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  const handleAddItem = async (data: any) => {
    setEmployeeData([]);
    setLoading(true);
    await apiCaller("/", "post", data);
    await fetchData();
    setNotify({
      isOpen: true,
      message: "Added Successfully",
      type: "success",
    });
  };

  const handleEditItem = async (data: any, id: string) => {
    setEmployeeData([]);
    setLoading(true);
    await apiCaller(`/${id}`, "put", data);
    await fetchData();
    setNotify({
      isOpen: true,
      message: "Edited Successfully",
      type: "success",
    });
  };

  const handleShowFormDialog = (type: string, id?: string) => {
    setOpenFormDialog(true);
    setTypeFormDialog(type);
    setIdEmployee(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <br />
      <FormDialog
        typeAction={typeFormDialog}
        open={openFormDialog}
        handleClose={handleCloseFormDialog}
        handleAddItem={(data: any) => handleAddItem(data)}
        handleEditItem={(data: any, id: string) => handleEditItem(data, id)}
        id={idEmployee}
      />
      <Typography variant="h3" align="center" style={{ color: "#4d7cc1" }}>
        Employee List
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table stickyHeader={true} size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Position</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <Loading />}
            {(rowsPerPage > 0
              ? employeeData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : employeeData
            ).map((employee) => (
              <StyledTableRow key={employee.id}>
                <StyledTableCell align="center">
                  {employee.firstname}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.lastname}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.position}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleShowFormDialog("edit", employee.id)}
                      // style={{ paddingRight: 0 }}
                    >
                      {/* Edit */}
                      <EditOutlined />
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      // style={{ paddingLeft: 0 }}
                      onClick={() =>
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this employee?",
                          subTitle: "You can't undo this action",
                          onConfirm: () => {
                            handleDeleteEmployee(employee.id);
                          },
                        })
                      }
                    >
                      <DeleteForeverOutlined />
                      {/* Delete */}
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{ background: "#4f9ed5", color: "white" }}
        onClick={() => handleShowFormDialog("add")}
      >
        New Employee
      </Button>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employeeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Container>
  );
}
