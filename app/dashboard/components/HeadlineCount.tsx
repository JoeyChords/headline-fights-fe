import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1 = config.PUB_1;
const PUB_2 = config.PUB_2;

export default function HeadlineCount(props: any) {
  return (
    <>
    <Stack spacing={2}>
    <Typography variant="h5">Headlines Rated</Typography>
      <Typography align="center" component="p" variant="h1" sx={{ fontWeight: 'bold' }}>
        {props.total}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, pl: 4 }}>
      {PUB_1}: {props.pub1Total} <br></br> {PUB_2}: {props.pub2Total}
      </Typography>
    </Stack>
      
    </>
  );
}