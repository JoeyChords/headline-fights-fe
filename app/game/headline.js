import Image from "next/image";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { spacing } from "@mui/system";

<Grid container spacing={3}></Grid>;

var photo = "/public/images/image-not-found.png";

// This gets called on every request
async function getHeadline() {
  // Fetch data from external API
  const res = await fetch("http://localhost:3000/headlines");
  const data = await res.json();
  let dataString = JSON.stringify(data);
  let headline = JSON.parse(dataString);
  console.log(data);

  return headline;
}

export default async function Headline() {
  let headline = await getHeadline();
  console.log(headline);
  if (headline[0].photo_source_url != null) {
    photo = headline[0].photo_source_url;
    if (headline[0].photo_source_url.slice(0, 1) != "h") {
      photo = "https://" + headline[0].photo_source_url;
    }
  }
  return (
    <>
      <Container sx={{ mt: 30 }} maxWidth="lg">
        <Grid direction="row" justifyContent="center" alignItems="center" container spacing={2}>
          <Grid justifyContent="center" alignItems="center" xs={6}>
            <h2>{headline[0].headline}</h2>
            <Image className="rounded-lg" alt="" src={photo} width={720} height={405} />
          </Grid>
          <Grid xs={6}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
