import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ReactPlayer from "react-player";

function CustomPlayer() {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        bgcolor="lightgray"
        zIndex={99}
      >
        <Stack justifyContent="center" alignItems="center" height={1}>
          <IconButton>
            <PlayArrowIcon />
          </IconButton>
        </Stack>
      </Box>

      <ReactPlayer
        width={"100%"}
        height="100%"
        url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
      />
    </Box>
  );
}

export default CustomPlayer;
