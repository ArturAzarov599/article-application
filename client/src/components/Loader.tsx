import { FC } from "react";

import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface ILoaderProps {
  open: boolean;
}

const Loader: FC<ILoaderProps> = ({ open }) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    <CircularProgress />
  </Backdrop>
);

export default Loader;
