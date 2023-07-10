import { FC } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import { useCreateArticleMutation, useUpdateArticleMutation } from 'src/store/articles/articles.api'
import { getDate } from 'src/utils/date'
import { getEmail } from 'src/store/auth/selectors'

import { TArticleMode } from 'src/types/article-mode.type'
import { IArticle } from 'src/interfaces/article.interface'

interface IArticleModalProps {
  handleClose: () => void
  mode: TArticleMode
  selectedArticle: IArticle | null
}

const validationSchema = Yup.object({
  creator: Yup.string().required('Required').min(2, 'Creator must have more than 1 character'),
  link: Yup.string().url('must be url').required('Required'),
  publishDate: Yup.date().required('Required'),
  title: Yup.string().required('Required').min(5, 'Title can`t be less than 5 characters'),
})

const ArticleModal: FC<IArticleModalProps> = ({ handleClose, mode, selectedArticle }) => {
  const [createArticle] = useCreateArticleMutation()
  const [updateArticle] = useUpdateArticleMutation()
  const email = useSelector(getEmail)
  const isCreateMode = mode === 'create'
  const initialValues: IArticle = {
    creator: email,
    link: '',
    publishDate: getDate(),
    title: '',
    id: '',
  }
  const formValues = isCreateMode ? initialValues : selectedArticle || initialValues

  const onSaveHandler = (values: IArticle): void => {
    if (isCreateMode) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...restValues } = values
      createArticle(restValues)
    } else {
      updateArticle(values)
    }

    handleClose()
  }

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    validationSchema,
    initialValues: formValues,
    onSubmit: onSaveHandler,
  })

  return (
    <Box component='form'>
      <Dialog fullWidth maxWidth='md' open onClose={handleClose}>
        <DialogTitle textAlign='center' textTransform='uppercase' fontWeight={600}>
          {mode === 'create' ? 'create' : 'update'} article
        </DialogTitle>

        <DialogContent>
          <Box marginTop='8px'>
            <TextField
              label='Title'
              id='title'
              name='title'
              onChange={handleChange}
              value={values.title}
              fullWidth
              onBlur={handleBlur}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
          </Box>

          <Box marginY='16px'>
            <TextField
              label='URL'
              id='link'
              name='link'
              onChange={handleChange}
              value={values.link}
              onBlur={handleBlur}
              error={touched.link && Boolean(errors.link)}
              helperText={touched.link && errors.link}
              fullWidth
            />
          </Box>

          <Box display='flex' justifyContent='space-between'>
            <TextField
              label='Creator'
              id='creator'
              name='creator'
              onChange={handleChange}
              value={values.creator}
              onBlur={handleBlur}
              error={touched.creator && Boolean(errors.creator)}
              helperText={touched.creator && errors.creator}
              style={{ width: '45%' }}
            />

            <TextField
              type='date'
              label='Publish date'
              id='publishDate'
              name='publishDate'
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              value={values.publishDate}
              onBlur={handleBlur}
              error={touched.publishDate && Boolean(errors.publishDate)}
              helperText={touched.publishDate && errors.publishDate}
              style={{ width: '45%' }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button variant='contained' onClick={() => handleSubmit()}>
            save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ArticleModal
