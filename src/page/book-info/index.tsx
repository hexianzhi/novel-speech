import React from 'react'
import './index.scss'
import utils from 'src/utils'
import Http from 'src/utils/axios'

interface IState {
  content: any
  bookDetail: Noval.IBookDetail
}
interface IProps {
  bookInfo: Noval.IBookInfo
}

const prefixCls = 'book-info-page'
export default class BookInfoPage extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      content: '',
      bookDetail: {} as Noval.IBookDetail
    }
  }

  handleClick = (chapter: Noval.IChapterInfo) => {
    const url = utils.TestURL + '/' + chapter.link
    // TODO
    Http.get('bookDetail', {
      params: {
        url
      },
    }).then((res) => {
      let detail = res as any as Noval.IBookDetail
      Object.keys(detail).map(key => {
        if (/Link/g.test(key) && !utils.isUrl(detail[key])) {
          detail[key] = utils.TestURL + detail[key]
        }
      })

      console.log('-----detail----> ', detail)
      this.setState({bookDetail: detail})
    }).catch((err) => {
      console.log('请求失败,失败: ', err)
    })
  }

  
 
  render () {
    const {content, bookDetail} = this.state
    const {bookInfo} = this.props

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

          <div className={'content'}>
            <div className={'content-header'}>
              <a href={bookDetail.preChapterLink} target="_blank">上一章</a>
              <a href={bookDetail.chapterListLink} target="_blank">章节目录</a>
              <a href={bookDetail.nextChapterLink} target="_blank">下一章</a>
            </div>
            <div className={'content-chapter-name'}>{bookDetail.charpterName}</div>
            {bookDetail.content}
          </div>
      </div>
    )
  }

}