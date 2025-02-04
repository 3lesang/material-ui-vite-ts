import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import PopupState, {
  bindHover,
  bindPopover,
  bindTrigger,
} from "material-ui-popup-state";
import HoverPopover from "material-ui-popup-state/HoverPopover";

interface APopoverProps {
  children: React.ReactNode;
  dropdown: React.ReactNode;
  trigger?: "hover" | "click";
}

const APopover = (props: APopoverProps) => {
  const bindFunction = props.trigger === "hover" ? bindHover : bindTrigger;

  const Wrapper = props.trigger === "hover" ? HoverPopover : Popover;

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <Box>
          <Box {...bindFunction(popupState)}>{props?.children}</Box>
          <Wrapper
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            onClick={popupState.close}
          >
            {props?.dropdown}
          </Wrapper>
        </Box>
      )}
    </PopupState>
  );
};

export default APopover;
