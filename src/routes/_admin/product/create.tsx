import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/product/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const { history } = useRouter()

  const handleSubmit = () => {}

  const handleBack = () => {
    history.go(-1)
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back
        </Button>
        <Typography variant="h5" component="h1" gutterBottom>
          Create New Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="normal"
            required
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select name="category" label="Category">
              <MenuItem value="">Select a category</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="books">Books</MenuItem>
              <MenuItem value="home">Home & Garden</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            margin="normal"
            type="url"
          />

          <FormControlLabel
            control={<Checkbox name="inStock" color="primary" />}
            label="In Stock"
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Create Product
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
