import { FC } from "react";

import Typography from "@mui/material/Typography";

interface IMenuItemProps {
  title: string;
  onClick: () => void;
}

const MenuItem: FC<IMenuItemProps> = ({ onClick, title }) => (
  <Typography
    sx={{ minWidth: 100 }}
    onClick={onClick}
    color="white"
    fontSize={18}
    style={{ cursor: "pointer" }}
  >
    {title}
  </Typography>
);

export default MenuItem;
