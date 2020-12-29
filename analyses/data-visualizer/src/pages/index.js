import React from "react"
import {Helmet} from 'react-helmet'
import Typography from '@material-ui/core/Typography';

import HubsWrapper from "../components/HubsWrapper"

export default function Home() {
  return (
  <div>

    <Helmet>
      <title>Prototype Visualizer</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Helmet>

    <Typography variant='h4'>Prototype Visualizer</Typography>

    <HubsWrapper />

  </div>
  )
}
