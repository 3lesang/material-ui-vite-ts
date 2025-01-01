import { axiosClient } from "@/axios";
import BackButton from "@/components/BackButton";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
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
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_admin/product/create")({
  component: RouteComponent,
});

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  inStock: z.boolean().optional(),
});

export type CreateFormSchema = z.infer<typeof formSchema>;

function RouteComponent() {
  const { history } = useRouter();

  const handleBack = () => {
    history.go(-1);
  };

  const url = "/products";

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateFormSchema) => axiosClient.post(url, data),
    onSuccess() {
      handleBack();
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "test",
      description: "test",
      price: 30000,
      category: "electronics",
      imageUrl: "https://mui.com/material-ui/api/loading-button/",
      inStock: false,
    },
  });

  const onSubmit = (data: CreateFormSchema) => {
    mutate(data);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <BackButton />
        <Typography variant="h5" component="h1" gutterBottom>
          Create New Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Product Name"
                multiline
                rows={3}
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
                size="small"
                label="Description"
                margin="normal"
                multiline
                rows={8}
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
                size="small"
                label="Price"
                type="number"
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
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
                <Select
                  {...field}
                  label="Category"
                  error={!!errors.category}
                  size="small"
                >
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
                size="small"
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
                  <Checkbox
                    {...field}
                    checked={field.value}
                    color="primary"
                    size="small"
                  />
                }
                label="In Stock"
                sx={{ mt: 2 }}
              />
            )}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            loading={isPending}
            size="large"
            sx={{ mt: 3 }}
          >
            Create Product
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
