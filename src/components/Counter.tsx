import { Button, ButtonGroup, Container, Typography } from "@material-ui/core";
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount((x) => x + 1);
  };
  const handleReset = () => {
    setCount(0);
  };
  return (
    <Container style={{ textAlign: "center" }}>
      <br />
      <Typography variant="h3" style={{ color: "#4d7cc1" }}>
        Counter: {count}
      </Typography>
      <br />
      <ButtonGroup>
        <Button variant="outlined" color="primary" onClick={handleIncrease}>
          Increase
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default Counter;
