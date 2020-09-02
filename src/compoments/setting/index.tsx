import React from 'react'
import {RouteChildrenProps } from 'react-router-dom'
import { connect } from 'react-redux'
import {IRootState, IDispatch} from 'src/store'
import _ from 'lodash'
import { Popover } from 'antd';
 
import './index.scss'

interface IDetailProps {
  onPlay: () => void;
  onPause: () => void;
}

type IProps =  IDetailProps &
RouteChildrenProps &
ReturnType<typeof mapState> &
ReturnType<typeof mapDispatch>  

interface IState {
  style: React.CSSProperties
}

const prefixCls = 'setting-bar'

const mapState = (state: IRootState) => ({
  bookDetail: state.base.bookDetail,
  chapter: state.base.chapter
})

const mapDispatch = (dispatch: IDispatch) => ({
  setBookDetail: dispatch.base.setBookDetail
})

class BookDetail extends React.Component<IProps, IState> {
  defaultStlye = {} as React.CSSProperties

  constructor (props) {
    super(props)
    // TODO,从 localStorage 中获取
    this.state = {
      style: {
        backgroundColor: '#ffc107',
        fontSize: 16,
        width: 800,
        fontFamily: "'Microsoft YaHei',PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light',sans-serif",
      }
    }
  }
  async componentDidMount () {
  
  }

  
  changeStyle (style: React.CSSProperties) {

  }
 
  content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
 
  render () {
    const {onPlay, onPause} = this.props
    const {style} = this.state

    return (
      <div className={`${prefixCls}`} style={style}>
        <div>
          目录
        </div>
        <Popover content={this.content} title="设置">
          <div>test</div>
        </Popover>
        <div>
          加入书架
        </div>
      </div>
    )
  }

}

const BookDetailWrap = connect(mapState, mapDispatch)(BookDetail)
export default BookDetailWrap;
