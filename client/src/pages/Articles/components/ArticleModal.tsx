import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { TArticleMode } from "src/types/article-mode.type";
import { IArticle } from "src/interfaces/article.interface";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "src/store/articles/articles.api";

interface IArticleModalProps {
  handleClose: () => void;
  mode: TArticleMode;
  selectedArticle: IArticle | null;
}

const initialValues: IArticle = {
  creator: "",
  link: "",
  publishDate: "",
  title: "",
  id: "",
};

const validationSchema = Yup.object().shape({
  creator: Yup.string()
    .required("Required")
    .min(2, "Creator must have more than 1 character"),
  link: Yup.string().url("must be url").required("Required"),
  publishDate: Yup.date().required("Required"),
  title: Yup.string()
    .required("Required")
    .min(5, "Title can`t be less than 5 characters"),
});

const ArticleModal: FC<IArticleModalProps> = ({
  handleClose,
  mode,
  selectedArticle,
}) => {
  const [createArticle, createArticleArgs] = useCreateArticleMutation();
  const [updateArticle, updateArticleArgs] = useUpdateArticleMutation();
  const isCreateMode = mode === "create";
  const handleAction = isCreateMode ? createArticle : updateArticle;
  const onSaveHandler = (values: IArticle): void => {
    handleClose();
    handleAction(values);
  };
  const formValues = isCreateMode
    ? initialValues
    : selectedArticle || initialValues;
  const { errors, values, handleChange, handleSubmit } = useFormik({
    validationSchema,
    initialValues: formValues,
    onSubmit: onSaveHandler,
  });

  return (
    <Box component="form">
      <Dialog fullWidth maxWidth="md" open onClose={handleClose}>
        <DialogTitle
          textAlign="center"
          textTransform="uppercase"
          fontWeight={600}
        >
          {mode === "create" ? "create" : "update"} article
        </DialogTitle>

        <DialogContent>
          <Box marginTop="8px">
            <TextField
              label="Title"
              id="title"
              name="title"
              onChange={handleChange}
              value={values.title}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
            />
          </Box>

          <Box marginY="16px">
            <TextField
              label="URL"
              id="link"
              name="link"
              onChange={handleChange}
              value={values.link}
              error={!!errors.link}
              helperText={errors.link}
              fullWidth
            />
          </Box>

          <Box display="flex" justifyContent="space-between">
            <TextField
              label="Creator"
              id="creator"
              name="creator"
              onChange={handleChange}
              value={values.creator}
              error={!!errors.creator}
              helperText={errors.creator}
              style={{ width: "45%" }}
            />

            <TextField
              type="date"
              label="Publish date"
              id="publishDate"
              name="publishDate"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              value={values.publishDate}
              error={!!errors.publishDate}
              helperText={errors.publishDate}
              style={{ width: "45%" }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button variant="contained" onClick={() => handleSubmit()}>
            save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ArticleModal;
