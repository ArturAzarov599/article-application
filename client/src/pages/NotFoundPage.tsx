import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

import { ARTICLES_ROUTE } from 'src/constants/routes'

const NotFound = () => {
  const navigate = useNavigate()

  const goToArticlesPage = (): void => navigate(ARTICLES_ROUTE, { replace: true })

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography variant='h1'>404</Typography>
      <Typography variant='h6'>The page you’re looking for doesn’t exist.</Typography>
      <Button variant='contained' style={{ marginTop: '16px' }} onClick={goToArticlesPage}>
        Back to articles
      </Button>
    </Box>
  )
}

export default NotFound
