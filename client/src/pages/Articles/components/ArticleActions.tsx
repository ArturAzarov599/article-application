import { useState } from 'react'
import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import ArticleModal from 'src/pages/Articles/components/ArticleModal'

import { getEmail } from 'src/store/auth/selectors'
import { getSelectedArticle } from 'src/store/articles/selectors'
import { useDeleteArticleMutation } from 'src/store/articles/articles.api'
import { useArticlesActions } from 'src/store/articles/hooks/useArticlesActions'

import { TArticleMode } from 'src/types/article-mode.type'

const ArticleActions = () => {
  const email = useSelector(getEmail)
  const [mode, setMode] = useState<TArticleMode>('create')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const selectedArticle = useSelector(getSelectedArticle)
  const { selectArticle } = useArticlesActions()
  const [deleteArticle] = useDeleteArticleMutation()

  const handleModalState = (state: boolean): void => setOpenModal(state)

  const handleButtonClick = (mode: TArticleMode): void => {
    handleModalState(true)
    setMode(mode)
  }

  const onDelete = (): void => {
    if (selectedArticle) {
      deleteArticle(selectedArticle.id)
      selectArticle(null)
    }
  }

  return (
    <Grid
      item
      container
      xs={2}
      alignItems='end'
      padding='16px'
      height='100%'
      direction='column'
      style={{
        opacity: email ? 1 : 0,
        visibility: email ? 'visible' : 'hidden',
      }}
    >
      <Grid item>
        <Button variant='contained' color='success' onClick={() => handleButtonClick('create')}>
          create
        </Button>
      </Grid>

      <Grid item marginY='20px'>
        <Button
          variant='contained'
          color='warning'
          onClick={() => handleButtonClick('update')}
          disabled={!selectedArticle}
        >
          update
        </Button>
      </Grid>

      <Grid item>
        <Button variant='contained' color='error' disabled={!selectedArticle} onClick={onDelete}>
          delete
        </Button>
      </Grid>

      {openModal && (
        <ArticleModal
          handleClose={() => handleModalState(false)}
          mode={mode}
          selectedArticle={selectedArticle}
        />
      )}
    </Grid>
  )
}

export default ArticleActions
