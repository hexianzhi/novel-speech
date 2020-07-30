import React from 'react';
import './App.scss';
import { Input, Table } from 'antd';
import Http from 'src/utils/axios'
const { Search } = Input;

interface IState {
  bookList: Noval.ISearchResp[]
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
  value = '轮回乐园'
  url = 'http://www.xbiquge.la'
  urlReg= /(http:\/\/(\w+|\.)+)\//g

  constructor (props) {
    super(props)
    this.state = {
      bookList: [] as Noval.ISearchResp []
    }
  }

  componentDidMount () {

  }

  handleBookClick = (bookLink: string, isName = false) => {
    const api = isName ? 'bookInfo' : 'bookDetail'
    Http.get(api, {
      params: {
        url: bookLink
      }
    }).then((res) => {
      console.log('res: ', res);
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
      this.setState({bookList: testData})
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
        onClick={() => this.handleBookClick(link, isName)}
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
    const {bookList} = this.state
    if (bookList.length) this.bookCls.push(`${prefix}-search-top`)

    return (
      <div className="App">
        <div className={this.bookCls.join(' ')}>
          <div className={`${prefix}-search-name`}>Novel Speech</div>
          <Search
            className={`${prefix}-search-input`}
            placeholder="轮回乐园"
            onSearch={this.handleOnSearch}
            defaultValue={'轮回乐园'}
            style={{ width: 500 }}
          />
        </div>
        {bookList.length && 
          <div className={`${prefix}-table-wrapper`}>
            <Table 
              dataSource={bookList} 
              columns={this.columns} 
            />
          </div>
        }
      </div>
    )
  }
}
 
export default App;
