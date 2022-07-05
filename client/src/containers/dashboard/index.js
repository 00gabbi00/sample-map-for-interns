import React, { useContext } from 'react'
import { Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { MapContext } from '../../context/MapContext'

export default function Dashboard() {

  const {bounds, size, page, setPage} = useContext(MapContext)

  const handleChange = (value) => {
    setPage(value)
    console.log(value)
  }

  return (
    <Grid container sx={{width: '100%', padding: 1}} direction="column" alignItems="center">
      <Grid item>
        <Typography sx={{
          fontSize: '4vh'
          }}>
          Sample Dashboard
        </Typography> 
      </Grid>
      <Grid item>
        <Typography variant='h6' align="center">
          Polygon bound # {page+1}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Point #</TableCell>
                <TableCell>Longitude</TableCell>
                <TableCell>Latitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bounds.length > 0 ? bounds[page].map((x, i) => (
                <TableRow key={i}>
                  <TableCell>{i+1}</TableCell>
                  <TableCell>{parseFloat(x.lng).toFixed(3)}</TableCell>
                  <TableCell>{parseFloat(x.lat).toFixed(3)}</TableCell>
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
          <Stack sx={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Button sx={{backgroundColor: '#034917', color: '#ffffff'}} disabled={page === 0}
              onClick={()=>handleChange(page-1)}>
              &lt;
            </Button>
            <Button sx={{backgroundColor: '#034917', color: '#ffffff'}} disabled={page === size-1}
              onClick={()=>handleChange(page+1)}>
              &gt;
            </Button>
          </Stack>
        </TableContainer>

      </Grid>
    </Grid>
  )
}