import React from "react"
import {Helmet} from 'react-helmet'
import Typography from '@material-ui/core/Typography';

import HubsWrapper from "../components/HubsWrapper"

export default function Home() {
  return (
  <div>

    <Helmet>
      <title>Interactive Analysis</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Helmet>

    <Typography variant='h4'>Interactive Analysis</Typography>
    <br />
    <Typography variant='h6'>TODO</Typography>
    <Typography>> Decrease information density in question text answers (info will move to table)</Typography>
    <Typography>> Create system to determine shared values across categories for the question descriptions</Typography>
    <Typography>> Add alternate results view: table with detailed numbers and percentages</Typography>
    <Typography>> Add instructions, glossary of terms, and detailed breakdown of assumptions and data limitations</Typography>
    <br />

    <HubsWrapper />

  </div>
  )
}
