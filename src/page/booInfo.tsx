import React from 'react'


interface IProps {
  bookInfo: Noval.IBookInfo
}

const prefixCls = 'book-info-page'
export default class BookInfoPage extends React.Component<IProps, any> {
  constructor (props: IProps) {
    super(props)
  }

  handleClick = () => {
    // TODO
  }
 
  render () {
    const {bookInfo} = this.props

    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-main`}>
          <img src={bookInfo.imgSrc} alt=''></img>
          <div className={`${prefixCls}-main-info`}>
            <div className={`${prefixCls}-name`}>书名：{bookInfo.name}</div>
            <div className={`${prefixCls}-name`}>作者：{bookInfo.author}</div>
            <div className={`${prefixCls}-name`}>最后更新时间：{bookInfo.lastUpdateTime}</div>
            <div className={`${prefixCls}-name`}>最新章节：{bookInfo.newestChapter}</div>
          </div>
        </div>
        <div className={`${prefixCls}-list`}>
          {bookInfo.chapterList && bookInfo.chapterList.map(chapter => (
            <span className={`${prefixCls}-chapter-item`} onClick={this.handleClick}>{chapter.chapterName}</span>
          ))}
        </div>
      </div>
    )
  }

}