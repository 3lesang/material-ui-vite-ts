import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid2 from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  inStock: z.boolean().optional(),
});

export type ProductSchema = z.infer<typeof formSchema>;

interface FormProps {
  defaultValues?: ProductSchema;
  onSubmit?: (data: ProductSchema) => void;
  actionText?: string;
}

function ProductForm({ defaultValues, onSubmit, actionText }: FormProps) {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const beforeSubmit = (data: ProductSchema) => {
    onSubmit?.(data);
  };

  return (
    <Card component="form" onSubmit={handleSubmit(beforeSubmit)}>
      <CardHeader
        title="Product"
        subheader="Define the rights given to the product"
        action={
          <Button type="submit" disabled={!isDirty || !isValid}>
            {actionText}
          </Button>
        }
      />
      <CardContent>
        <Grid2 container spacing={1}>
          <Grid2 size={6}>
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
          </Grid2>
          <Grid2 size={6}>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Slug"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Price"
                  type="number"
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
          </Grid2>
          <Grid2 size={3}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select {...field} label="Category" error={!!errors.category}>
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
          </Grid2>
          <Grid2 size={3}>
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
                    />
                  }
                  label="In Stock"
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Description"
                  multiline
                  minRows={5}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
}

export default ProductForm;
