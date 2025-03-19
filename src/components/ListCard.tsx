import { CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Grid2";
import { useS3Url } from "./S3Image";

interface ListCardProps {
  rows?: any[];
  columns: any[];
}

interface S3MediaProps {
  name: string;
}

const render = (i: number, columns: any[], row: any) => {
  return columns?.[i]?.renderCell
    ? columns?.[i]?.renderCell(row[columns?.[i]?.field])
    : row[columns[i]?.field];
};

function S3Media({ name }: S3MediaProps) {
  const { data } = useS3Url(name);
  return <CardMedia image={data} sx={{ height: 140 }} />;
}

function ListCard({ rows, columns }: ListCardProps) {
  return (
    <Grid2 container spacing={1}>
      {rows?.map((row) => (
        <Grid2 size={3}>
          <Card>
            <S3Media name={render(0, columns, row)} />
            <CardContent>
              <Typography gutterBottom variant="body1" component="div">
                {render(1, columns, row)}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {render(2, columns, row)}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ListCard;
