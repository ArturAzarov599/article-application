import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'

import { articlesSlice } from 'src/store/articles/store'

export const useArticlesActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(articlesSlice.actions, dispatch)
}
