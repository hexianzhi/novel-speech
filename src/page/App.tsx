import React from 'react';
import './App.scss';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Http from 'src/utils/axios'

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      bookList: [] as Noval.ISearchResp []
    }
  }

  componentDidMount () {

  }

  handleOnSearch = (value) => {
    Http.get('search',{
      params: {searchkey: value},
    }).then((res) => {
      console.log('-----res----> ', res)
      this.setState({bookList: res})

    }).catch((err) => {
      console.log('请求失败,失败: ', err)

    })
  }

  render () {
    return (
      <div className="App">
        <div className={'search-container'}>
          <div className={'app-name'}>Novel Speech</div>
          <Search
            className={'novel-search'}
            placeholder="input search text"
            onSearch={this.handleOnSearch}
            style={{ width: 500 }}
          />
        </div>
      </div>
    )
  }
}
 
export default App;
