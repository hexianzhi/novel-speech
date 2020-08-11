import React from 'react'
import './index.scss'
import {RouteChildrenProps } from 'react-router-dom'
import { connect } from 'react-redux'
import {IRootState, IDispatch} from 'src/store'
import _ from 'lodash'

type IProps = RouteChildrenProps<any, Noval.IBookInfo> &
ReturnType<typeof mapState> &
ReturnType<typeof mapDispatch>  

 
const mapState = (state: IRootState) => ({
  bookInfo: state.base.bookInfo,
  chapter: state.base.chapter
})

const mapDispatch = (dispatch: IDispatch) => ({
  setChaprter: dispatch.base.setChaprter
})


const prefixCls = 'book-info-page'
class BookInfoPage extends React.Component<IProps, any> {
 
  handleClick = (chapter: Noval.IChapterInfo) => {
    this.props.history.push(`/bookDetail`)
    if(_.isEqual(chapter, this.props.chapter)) return
    this.props.setChaprter(chapter)
  }

  render () {
    const bookInfo = this.props.bookInfo 

    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-main`}>
          <img src={bookInfo.imgSrc} alt=''></img>
          <div className={`${prefixCls}-main-info`}>
            <div className={`${prefixCls}-name`}>书名：{bookInfo.name}</div>
            <div className={`${prefixCls}-author`}>作者：{bookInfo.author}</div>
            <div className={`${prefixCls}-lastUpdateTime`}>最后更新时间：{bookInfo.lastUpdateTime}</div>
            <div className={`${prefixCls}-newestChapter`}>最新章节：{bookInfo.newestChapter}</div>
          </div>
        </div>
        <ul className={`${prefixCls}-list`}>
          {bookInfo.chapterList && bookInfo.chapterList.map((chapter, index) => (
            <li key={index} className={`${prefixCls}-chapter-item`} onClick={() => this.handleClick(chapter)}>{chapter.chapterName}</li>
          ))}
        </ul>
      </div>
    )
  }

}

const BookInfoPageWrap = connect(mapState,mapDispatch)(BookInfoPage)
export default BookInfoPageWrap