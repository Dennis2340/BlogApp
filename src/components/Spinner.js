import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
 const Spinner = () => {
  return(
    <Box sx={{ textAlign: "center",}}>
      <Card variant="outlined" sx={{display: "block", backgroundColor: "#63C5DA", width: "50%",height: 100}}>
        <CircularProgress color="primary" size="3.5rem" sx={{marginTop: 2}}/>
        <Typography variant="h7" sx={{marginTop: 4,paddingBottom: 4, color:"white"}}>
          Loading...
        </Typography>

      </Card>

    </Box>
  )
}

export default Spinner