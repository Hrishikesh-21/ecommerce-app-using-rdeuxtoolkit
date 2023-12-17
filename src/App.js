import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import StandardImageList from './Components/StandardImageList';
import { Grid } from '@mui/material';

function App() {
  return (
<>
<Grid item xs={12}>
  <Grid item xs={4} justifyItems={"center"}>
<ResponsiveAppBar></ResponsiveAppBar>
</Grid>
<Grid item  xs={6} display={'flex'} justifyContent={"center"}>
<StandardImageList/>
</Grid>
</Grid>
</>
  );
}

export default App;
