import React from 'react';
import './App.scss';
import { Input, Table } from 'antd';
import Http from 'src/utils/axios'
import BookInfo from './book-info'
const { Search } = Input;

interface IState {
  searchResultList: Noval.ISearchResp[]
  bookInfo: Noval.IBookInfo
}


const prefix = 'app-page'
class App extends React.Component<any, IState> {
  columns = [
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
      render: (value, record) => this.renderLinK(record)
    },
    {
      title: '最新章节',
      dataIndex: 'newestChapter',
      key: 'newestChapter',
      render: (value, record) => this.renderLinK(record, false)
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

  constructor (props) {
    super(props)
    this.state = {
      searchResultList: [] as Noval.ISearchResp [],
      bookInfo: {} as Noval.IBookInfo
    }
  }

  componentDidMount () {

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
        this.setState({bookInfo: info})
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
      let data = res as unknown as any[]
      data = data.map((item,index) => {
        item.key = index
        return item
      })
      const testData = [{ 
        key:'1',
        name: '测试',
        nameLink: 'http://www.xbiquge.la/35/35011/',
        newestChapter: '第二季',
        newestChapterLink: '/35/35011/17732931.html',
        author: '小蚊子',
        lastUpdate: '6-12'
      }]
      if (!data) data = testData
      this.setState({searchResultList: data})
    }).catch((err) => {
      console.log('请求失败,失败: ', err)
    })
  }

  renderLinK = (item: Noval.ISearchResp, isName = true) => {
    const {nameLink, newestChapterLink} = item

    if (!this.url) {
      const result = this.urlReg.exec(nameLink)
      if (result) this.url = result[1]
    }

    const text = isName ? item.name : item.newestChapter
    const link = isName ? nameLink : this.url + newestChapterLink
    return (
      <span 
        onClick={() => this.handleSearchResultClick(item, isName)}
        className={'link'} 
        // href={link}
        // rel="noopener noreferrer"
        // target="_blank"
      >
        {text}  
      </span>
    )
  }

  render () {
    const {searchResultList, bookInfo} = this.state
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
        {bookInfo && <BookInfo bookInfo={bookInfo}></BookInfo>}
      </div>
    )
  }
}
 
export default App;
