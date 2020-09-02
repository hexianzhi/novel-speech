export const base = {
  state: {
    // 内容设置
    contentSetting: {} as React.CSSProperties,
    searchResultList: [] as Noval.ISearchResp[],
    bookDetail: {} as Noval.IBookDetail,
    bookInfo: {} as Noval.IBookInfo,
    chapter: {} as Noval.IChapterInfo
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    setResultList(state, searchResultList: Noval.ISearchResp[]) {
      return {
        ...state,
        searchResultList
      }
    },
    setBookDetail (state, bookDetail: Noval.IBookDetail) {
      return {
        ...state,
        bookDetail
      }
    },
    setBookInfo (state, bookInfo: Noval.IBookInfo) {
      return {
        ...state,
        bookInfo
      }
    },
    setChaprter (state, chapter: Noval.IChapterInfo) {
      return {
        ...state,
        chapter
      }
    },
    setContentSetting (state, setting: React.CSSProperties) {
      return {
        ...state,
        setting
      }
    }
  },
  effects: {
 
  }
}
 