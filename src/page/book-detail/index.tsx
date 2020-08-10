import React from 'react'
import './index.scss'
import utils from 'src/utils'
import Http from 'src/utils/axios'
import {RouteChildrenProps } from 'react-router-dom'

interface IState {
  bookDetail:  Noval.IBookDetail
  chapter: Noval.IChapterInfo
}

type IProps = {
  bookInfo: Noval.IBookInfo
} & RouteChildrenProps

const prefixCls = 'book-info-page'
export default class BookDetail extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      bookDetail: {} as  Noval.IBookDetail,
      chapter: props.location.state as Noval.IChapterInfo
    }
  }

  componentDidMount () {
    const {chapter} = this.state
    console.log('-----chapter----> ', chapter)
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
    const {bookDetail} = this.state
    // const {bookInfo} = this.props

    return (
      <div className={`${prefixCls}`}>
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