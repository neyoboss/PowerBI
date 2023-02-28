import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import Link from "next/link";
import axios from "axios";

function Home() {
  const [workspaceId, setWorkspaceId] = useState("");
  const [reportId, setReportId] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  return (
    <>
      <div className='square'>
        <img src="/kmwe_logo.png" alt={'KMWE Logo'} className="image" />
      </div>

      <ThemeProvider theme={darkTheme}>
        <Container maxWidth="sm">
          <Grid className="GridForm" container >

            <div className="formInputs">
              <Grid item mb={3} mt={-1}>
                <h2 className="textColor">Input Workspace Id & Report Id</h2>
              </Grid>
              <Grid item mb={1} mt={-1}>
                <TextField value={workspaceId} onChange={(e) => setWorkspaceId(e.target.value)} margin="normal" id="outlined-basic" label="Workspace Id" sx={{ input: { backgroundColor: '#282c34' } }} />
                <br />
                <TextField value={reportId} onChange={(e) => setReportId(e.target.value)} margin="normal" id="outlined-basic" label="Report Id" sx={{ input: { backgroundColor: '#282c34' } }} />
              </Grid>
            </div>

            <Grid item mb={1}>
              <Button variant="contained" sx={{ backgroundColor: "#1fa7d4" }}>
                <Link href={{
                  pathname: `/report`,
                  query: {
                    workspaceId: `${workspaceId}`,
                    reportId: `${reportId}`
                  }
                }}>
                  <b className="textColor">Submit</b>
                </Link>
              </Button>
            </Grid>

          </Grid>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Home;