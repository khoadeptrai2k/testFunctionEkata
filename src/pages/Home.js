import {Grid, Button, Typography} from '@material-ui/core';
import { Link } from "react-router-dom";

function Home() {

    return (
        <div>

            <Typography style={{margin:30}} variant="h2">
            React Barcode
            </Typography>

            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <Link to="/barcode_generator">
                    <Button variant="contained" size="large" color="secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" style={{padding:30}} fill="currentColor" class="bi bi-upc" viewBox="0 0 16 16">
                            <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                        </svg>
                    </Button>
                    </Link>
                </Grid>
            </Grid>
        
        </div>
    );
  }
  
  export default Home;
  