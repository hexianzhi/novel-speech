export const base = {
  state: {
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

  },
  effects: {
 
  }
}
 