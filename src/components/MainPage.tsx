import { AppBar, Toolbar } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Counter from "./Counter";
import EmployeeTable from "./EmployeeTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === 0 ? <Counter /> : <EmployeeTable />}
    </div>
  );
}

export default function MainPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" style={{ background: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" align="center" style={{ flexGrow: 2 }}>
            Hello Health Group
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            style={{ flexGrow: 3 }}
          >
            <Tab label="Counter" />
            <Tab label="Employees Table" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0} />
      <TabPanel value={value} index={1} />
    </div>
  );
}
