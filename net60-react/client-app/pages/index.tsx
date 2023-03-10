import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";


export function Home() {

  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState("");
  const [reportId, setReportId] = useState("");
  const [dashboardId, setDashboardId] = useState("");

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
          <Grid className="GridForm" sx={{ display: 'flex', flexDirection: 'column' }} container >

            <div className="formInputs">
              <Grid item mb={3} mt={-1}>
                <h2 className="textColor">Fill in the fields</h2>
              </Grid>
              <Grid item mb={1} mt={-1}>
                <TextField value={workspaceId} onChange={(e) => setWorkspaceId(e.target.value)} margin="normal" id="outlined-basic" label="Workspace Id" sx={{ input: { backgroundColor: '#282c34' } }} />
                <br />
                <TextField value={reportId} onChange={(e) => setReportId(e.target.value)} margin="normal" id="outlined-basic" label="Report Id" sx={{ input: { backgroundColor: '#282c34' } }} />
                <br />
                <TextField value={dashboardId} onChange={(e) => setDashboardId(e.target.value)} margin="normal" id="outlined-basic" label="Dashboard Id" sx={{ input: { backgroundColor: '#282c34' } }} />
              </Grid>
            </div>

            <Grid item mb={1}>
              {reportId === "" && dashboardId === "" ? <Button onClick={() => router.push({
                pathname: '/workspace/',
                query: { groupId: `${workspaceId}` }
              })} variant="contained" sx={{ backgroundColor: "#1fa7d4" }}>
                <b className="textColor">Submit</b>
              </Button> :
                <>
                  {reportId !== "" && dashboardId === "" ? <Button onClick={() => router.push({
                    pathname: '/report/',
                    query: {
                      groupId: `${workspaceId}`,
                      repId: `${reportId}`
                    }
                  })}
                    variant="contained" sx={{ backgroundColor: "#1fa7d4" }}>
                    <b className="textColor">Submit</b>
                  </Button> : <Button onClick={() => router.push({
                    pathname: '/dashboard/',
                    query: {
                      groupId: `${workspaceId}`,
                      dashId: `${dashboardId}`
                    }
                  })}
                    variant="contained" sx={{ backgroundColor: "#1fa7d4" }}>
                    <b className="textColor">Submit</b>
                  </Button>}
                </>
              }
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Home;