import { axiosClient } from "@/axios";
import { generateSlug } from "@/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid2 from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  price: z.number().optional(),
  category_id: z.number(),
  inStock: z.boolean().optional(),
  code: z.string().optional(),
  sku: z.string().optional(),
});

export type ProductSchema = z.infer<typeof formSchema>;

interface FormProps {
  defaultValues?: ProductSchema;
  onSubmit?: (data: ProductSchema) => void;
  actionText?: string;
}

const categoryUrl = "/categories";

function ProductForm({ defaultValues, onSubmit, actionText }: FormProps) {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (nameValue) {
      setValue("slug", generateSlug(nameValue), { shouldValidate: true });
    }
  }, [nameValue, setValue]);

  const beforeSubmit = (data: ProductSchema) => {
    onSubmit?.(data);
  };

  const { data } = useQuery({
    queryKey: [categoryUrl],
    queryFn: () =>
      axiosClient.get(categoryUrl, { params: { page: 1, limit: 10 } }),
  });

  return (
    <Card component="form" onSubmit={handleSubmit(beforeSubmit)}>
      <CardHeader
        title="Product"
        subheader="Define the rights given to the product"
        action={<Button type="submit">{actionText}</Button>}
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
                  multiline
                  minRows={3}
                  required
                  label="Name"
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
                  multiline
                  minRows={3}
                  required
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
              rules={{
                required: "Price is required",
                min: { value: 1, message: "Minimum price is $1" },
              }}
              render={({ field, fieldState }) => (
                <NumericFormat
                  value={field.value}
                  label="Price"
                  fullWidth
                  thousandSeparator=","
                  prefix="$"
                  customInput={TextField}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  allowNegative={false}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue);
                  }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={3}>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    {...field}
                    label="Category"
                    error={!!errors.category_id}
                  >
                    {data?.data?.data?.map((item: any) => (
                      <MenuItem value={item?.id} key={item?.id}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category_id && (
                    <Typography variant="caption" color="error">
                      {errors.category_id.message}
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
