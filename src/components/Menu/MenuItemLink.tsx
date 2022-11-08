import { Link } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ListItemIcon, ListItemText, MenuItem, SvgIconTypeMap } from "@mui/material";

interface IMenuItemLink {
  jsxElement?: JSX.Element | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string });
  path: string;
  text: string;
  onClick?: (e: any) => void;
}
export default function MenuItemLink(props: IMenuItemLink) {
  return (
    <Link to={props.path} style={{ textDecoration: "none" }}>
      <MenuItem onClick={props.onClick} sx={{ color: "text.primary", justifyContent: "flex-start" }}>
        <ListItemIcon>{props.jsxElement}</ListItemIcon>
        <ListItemText> {props.text}</ListItemText>
      </MenuItem>
    </Link>
  );
}
