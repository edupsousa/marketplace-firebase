import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";

function App() {
  return (
    <>
      <AppNavBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
