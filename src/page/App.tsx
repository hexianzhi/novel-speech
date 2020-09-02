import React from 'react';
import './App.scss';
import { Input, Table } from 'antd';
import Http from 'src/utils/axios'
import _ from 'lodash'
import BookInfo from './book-info'
import {
  RouteChildrenProps
} from "react-router-dom";
// import { dispatch } from '@rematch/core'
import { connect } from 'react-redux'
import {IRootState, IDispatch} from 'src/store'
import {storageLocal} from 'src/utils/base'
import {THEME, FONT_FAMILY, FONT_SIZE, PAGE_WIDTH } from 'src/utils/constant'


const { Search } = Input;

 

const mapState = (state: IRootState) => ({
  searchResultList: state.base.searchResultList,
  contentSetting: state.base.contentSetting
})

const mapDispatch = (dispatch: IDispatch) => ({
  setResultList: dispatch.base.setResultList,
  setBookInfo: dispatch.base.setBookInfo,
  setContentSetting: dispatch.base.setContentSetting
})

 
type IProps = ReturnType<typeof mapState> &
ReturnType<typeof mapDispatch> & 
RouteChildrenProps & {
  searchResultList: Noval.ISearchResp[]
}

const prefix = 'app-page'
class App extends React.Component<IProps, any> {
  columns = [
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
      render: (value, record, index) => this.renderLinK(record, index)
    },
    {
      title: '最新章节',
      dataIndex: 'newestChapter',
      key: 'newestChapter',
      render: (value, record, index) => this.renderLinK(record, index, false)
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '最后更新时间',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
    }
  ];

  bookCls = [`${prefix}-search`]
  value = '我在大唐有后台'
  url = 'http://www.xbiquge.la'
  urlReg= /(http:\/\/(\w+|\.)+)\//g

  
  componentDidMount () {
    // TODO 初始化 stoge
    const setting = storageLocal.get('THEME')
  }

  /** 搜素结果列表点击事件 */
  handleSearchResultClick = (result: Noval.ISearchResp, isName = false) => {
    const api = isName ? 'bookInfo' : 'bookDetail'
    const url = isName ? result.nameLink : result.newestChapterLink
    Http.get(api, {
      params: {
        url
      }
    }).then((res: any) => {
      if (isName) {
        const info = Object.assign(res, result)   
        this.props.setBookInfo(info)
        this.props.history.push('/bookInfo', info)
      } else {
        
      }
 
    }).catch(err => {
      console.log('err: ', err);
    })
  }

  handleOnSearch = (value) => {
    Http.get('search',{
      params: {searchkey: value},
    }).then((res) => {
      console.log('search res: ', res);
      let data = res as unknown as Noval.ISearchResp[]
     
      this.props.setResultList(data)
    }).catch((err) => {
      console.log('请求失败,失败: ', err)
    })
  }

  renderLinK = (item: Noval.ISearchResp, index: number, isName = true) => {
    const {nameLink} = item

    if (!this.url) {
      const result = this.urlReg.exec(nameLink)
      if (result) this.url = result[1]
    }
    const text = isName ? item.name : item.newestChapter
    return (
      <span 
        onClick={() => this.handleSearchResultClick(item, isName)}
        className={'link'} 
        key={item.name + item.nameLink + index}
      >
        {text}  
      </span>
    )
  }

  render () {
 
    const {searchResultList} = this.props
    if (searchResultList.length) this.bookCls.push(`${prefix}-search-top`)

    return (
      <div className="App">
        <div className={this.bookCls.join(' ')}>
          <div className={`${prefix}-search-name`}>Novel Speech</div>
          <Search
            className={`${prefix}-search-input`}
            placeholder="我在大唐有后台"
            onSearch={this.handleOnSearch}
            defaultValue={'我在大唐有后台'}
            style={{ width: 500 }}
          />
        </div>
        {searchResultList.length && 
          <div className={`${prefix}-table-wrapper`}>
            <Table 
              dataSource={searchResultList} 
              columns={this.columns} 
            />
          </div>
        }
 
      </div>
    )
  }
}
 
const AppWrap = connect(mapState, mapDispatch)(App)
export default AppWrap;
