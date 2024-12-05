import { getProduct } from "@/api/product";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  inStock: z.boolean().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export const Route = createFileRoute("/_admin/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { history } = useRouter();

  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(Number(id)),
  });

  const result = data?.data;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      imageUrl: "",
      inStock: false,
    },
  });

  const handleBack = () => {
    history.go(-1);
  };

  const onSubmit = (data: FormSchema) => {
    console.log("Form Data:", data);
  };

  useEffect(() => {
    if (result) {
      reset(result);
    }
  }, [reset, result]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back
        </Button>
        <Typography variant="h5" component="h1">
          Product Details
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom>
          ID: {id}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Product Name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Price"
                type="number"
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select {...field} label="Category" error={!!errors.category}>
                  <MenuItem value="">Select a category</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                  <MenuItem value="home">Home & Garden</MenuItem>
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error">
                    {errors.category.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Image URL"
                type="url"
                margin="normal"
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
              />
            )}
          />

          <Controller
            name="inStock"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox {...field} checked={field.value} color="primary" />
                }
                label="In Stock"
                sx={{ mt: 2 }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Update Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
