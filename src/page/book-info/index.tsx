import React from 'react'
import './index.scss'
import utils from 'src/utils'
import Http from 'src/utils/axios'
import {RouteChildrenProps } from 'react-router-dom'

interface IState {
  bookInfo:  Noval.IBookInfo
}

type IProps = {
  bookInfo: Noval.IBookInfo
} & RouteChildrenProps

const prefixCls = 'book-info-page'
export default class BookInfoPage extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      bookInfo: props.location.state
    }
  }

  handleClick = (chapter: Noval.IChapterInfo) => {
    this.props.history.push('/bookDetail', chapter)
  }

  render () {
    const {bookInfo} = this.state
    // const {bookInfo} = this.props

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
          {bookInfo.chapterList && bookInfo.chapterList.map(chapter => (
            <li className={`${prefixCls}-chapter-item`} onClick={() => this.handleClick(chapter)}>{chapter.chapterName}</li>
          ))}
        </ul>
      </div>
    )
  }

}