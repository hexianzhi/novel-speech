import { init, RematchRootState } from '@rematch/core'
import * as models from './model'

const store = init({
  models,
})

export type IStore = typeof store
export type IDispatch = typeof store.dispatch
export type IRootState = RematchRootState<typeof models>
export default store