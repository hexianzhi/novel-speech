import React from 'react'
import './index.scss'
import utils from 'src/utils'
import Http from 'src/utils/axios'
import {RouteChildrenProps } from 'react-router-dom'
import { connect } from 'react-redux'
import {IRootState, IDispatch} from 'src/store'
import _ from 'lodash'
import Speech from 'src/utils/speechSyn'
import { Button } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import './index.scss'

interface IDetailProps {
  bookDetail: Noval.IBookDetail
}

type IProps =  IDetailProps &
RouteChildrenProps &
ReturnType<typeof mapState> &
ReturnType<typeof mapDispatch>  

const prefixCls = 'book-info-page'

const mapState = (state: IRootState) => ({
  bookDetail: state.base.bookDetail,
  chapter: state.base.chapter
})

const mapDispatch = (dispatch: IDispatch) => ({
  setBookDetail: dispatch.base.setBookDetail
})

class BookDetail extends React.Component<IProps, any> {
 
  hasPlayed = false

  async componentDidMount () {
    console.log('BookDetail componentDidMount');
    await this.getBookDetail()
  }


  getBookDetail (Link?: string) {
    let url = Link 
    if (!Link) {
      url = utils.TestURL + this.props.chapter.link
    }
    // TODO
    Http.get('bookDetail', {
      params: {
        url
      },
    }).then((res) => {
      console.log('bookDetail res: ', res);
      const detail = res as any as Noval.IBookDetail
      Object.keys(detail).map(key => {
        if (/Link/g.test(key) && !utils.isUrl(detail[key])) {
          detail[key] = utils.TestURL + detail[key]
        }
      })
      this.props.setBookDetail(detail)
    }).catch((err) => {
      console.log('请求失败,失败: ', err)
    })
  }
 
  play = () => {
    const {bookDetail} = this.props
    if (this.hasPlayed) {
      Speech.start()
      return
    }
    Speech.start(bookDetail.content)
    this.hasPlayed = true
  }

  stop = () => {
    Speech.stop()
  }
  
 
  render () {
    const {bookDetail} = this.props

    return (
      <div className={`${prefixCls}`}>
          <div className={'content'}>
            <div className={'content-header'}>
              <a onClick={() => this.getBookDetail(bookDetail.preChapterLink)}>上一章</a>
              <a onClick={() => this.props.history.push('/bookInfo')}>章节目录</a>
              <a  onClick={() => this.getBookDetail(bookDetail.nextChapterLink)}>下一章</a>
            </div>
            <div className={'content-chapter-name'}>{bookDetail.charpterName}</div>
            {bookDetail.content}
          </div>
          <div className={'play-btn'}>
            <PlayCircleOutlined  style={{ fontSize: '40px', color: '#08c' }} onClick={this.play} />
            <PauseCircleOutlined style={{ fontSize: '40px', color: '#08c' }} onClick={this.stop}/>
          </div>
      </div>
    )
  }

}

const BookDetailWrap = connect(mapState, mapDispatch)(BookDetail)
export default BookDetailWrap;
