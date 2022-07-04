import { Grid } from '@mui/material'
import Map from './map'
import Dashboard from './dashboard';


function App() {
  return (
    <Grid container sx={{height: '100vh', width: '100vw'}}>
      <Grid item xs={3}>
        <Dashboard/>
      </Grid>
      <Grid item xs={9}>
        <Map/>
      </Grid>
    </Grid>
  );
}

export default App;
