import { axiosClient } from "@/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingButton from "@mui/lab/LoadingButton";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  inStock: z.boolean().optional(),
});

export type UpdateFormSchema = z.infer<typeof formSchema>;

export const Route = createFileRoute("/_admin/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { history } = useRouter();

  const handleBack = () => {
    history.go(-1);
  };

  const url = `/products/${id}`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => axiosClient.get(url),
  });

  const result = data?.data;

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: UpdateFormSchema) => axiosClient.patch(url, data),
    onSuccess() {},
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "electronics",
      imageUrl: "https://mui.com/material-ui/api/loading-button/",
      inStock: false,
    },
  });

  const onSubmit = (data: UpdateFormSchema) => {
    mutate(data);
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

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isDirty || !isValid || isSuccess}
            loading={isPending}
            size="large"
            sx={{ mt: 3 }}
          >
            Update Product
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
