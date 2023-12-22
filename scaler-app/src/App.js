import './App.css';
import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {Container} from '@mui/material';
import Main from "./pages/Main";
import {ToastContainer} from "react-toastify";


function App() {
  return (
      <>
          <Container maxWidth="xl" style={{ paddingBottom:'30px'}}>
              <Main/>
          </Container>
          <ToastContainer />
      </>
  );
}

export default App;
