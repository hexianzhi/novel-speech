import React from 'react'
import {RouteChildrenProps } from 'react-router-dom'
import { connect } from 'react-redux'
import {IRootState, IDispatch} from 'src/store'
import _ from 'lodash'
 
import './index.scss'

interface IDetailProps {
  onPlay: () => void;
  onPause: () => void;
}

type IProps =  IDetailProps &
RouteChildrenProps &
ReturnType<typeof mapState> &
ReturnType<typeof mapDispatch>  

const prefixCls = 'setting-bar'

const mapState = (state: IRootState) => ({
  bookDetail: state.base.bookDetail,
  chapter: state.base.chapter
})

const mapDispatch = (dispatch: IDispatch) => ({
  setBookDetail: dispatch.base.setBookDetail
})

class BookDetail extends React.Component<IProps, any> {

  async componentDidMount () {
  
  }

 
  
 
  render () {
    const {onPlay, onPause} = this.props

    return (
      <div className={`${prefixCls}`}>
        <div>
          目录
        </div>
        <div>
          设置
        </div>
        <div>
          加入书架
        </div>
      </div>
    )
  }

}

const BookDetailWrap = connect(mapState, mapDispatch)(BookDetail)
export default BookDetailWrap;
