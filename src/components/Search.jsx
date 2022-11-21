import { useState } from 'react'
import { Button, CssBaseline, TextField, Box, Typography, Container, Grid, Card, CardContent } from '@mui/material'

const Search = ({ composers }) => {
  
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch('')
    }

    const filterAsUserTypes = composers.filter((item) => {
        const names = item.name
        if (search === '') {
            return null;
        }
        else {
            return names.toLowerCase().includes(search)
        }
    })

    const displayComposers = filterAsUserTypes.map((composer) => {
        return (
            <Grid item key={composer.id} xs={12} sm={12} md={12}>
                <Card onClick={() => console.log('change routing here')} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent onClick={() => console.log('set redux state here')} sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {composer.name}
                    </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    })



  return (
    <>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
        <Box component="form" onSubmit={handleSearch} noValidate sx={{ mt: 1 }}>
        <TextField
              margin="normal"
              required
              fullWidth
              id="search"
              label="Search"
              name="search"
              autoComplete="search"
              autoFocus
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              value={search}
        />
        <Typography align='center'>
        <Button variant='outlined'>Search</Button>
        </Typography>
        </Box>
        </Box>
    </Container>

        <Container sx={{ py: 6 }} maxWidth='md'>
            <Grid container spacing={4}>
                {displayComposers}
            </Grid>
        </Container>
    </>
  )
}

export default Search