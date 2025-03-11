import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LightBox from "./ui/LightBox";

interface ImageViewerProps {
  name: string;
}
function ImageViewer({ name }: ImageViewerProps) {
  return (
    <LightBox name={name}>
      <ImageOutlinedIcon fontSize="small" />
    </LightBox>
  );
}

export default ImageViewer;
