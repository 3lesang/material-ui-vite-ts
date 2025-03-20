import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MovieIcon from "@mui/icons-material/Movie";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Grid2 from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useS3Url } from "./useS3Url";

interface ListFileProps {
  rows?: any[];
  columns: any[];
}

interface S3MediaProps {
  name: string;
  size: string;
}

const render = (i: number, columns: any[], row: any) => {
  return columns?.[i]?.renderCell
    ? columns?.[i]?.renderCell(row[columns?.[i]?.field])
    : row[columns[i]?.field];
};

function S3Media({ name, size }: S3MediaProps) {
  const { data } = useS3Url(name);

  const Avatar = () => {
    if (data?.type?.includes("image")) {
      return <ImageIcon fontSize="small" />;
    }
    if (data?.type?.includes("video")) {
      return <MovieIcon fontSize="small" />;
    }
  };

  const Media = () => {
    if (data?.type?.includes("image")) {
      return <CardMedia image={data?.src} sx={{ height: 140 }} />;
    }
    if (data?.type?.includes("video")) {
      return (
        <Stack
          height={140}
          bgcolor="lightgray"
          justifyContent="center"
          alignItems="center"
        >
          <MovieIcon />
        </Stack>
      );
    }
  };

  return (
    <Card>
      <CardHeader
        sx={{
          "& .MuiCardHeader-content": {
            display: "block",
            overflow: "hidden",
          },
        }}
        slotProps={{
          title: {
            noWrap: true,
            textOverflow: "ellipsis",
          },
        }}
        title={name}
        avatar={<Avatar />}
        action={
          <IconButton>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        }
      />
      <Media />
      <CardContent>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {size}
        </Typography>
      </CardContent>
    </Card>
  );
}

function ListFile({ rows, columns }: ListFileProps) {
  return (
    <Grid2 container spacing={1}>
      {rows?.map((row) => (
        <Grid2 size={3}>
          <S3Media
            name={render(0, columns, row)}
            size={render(2, columns, row)}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ListFile;
