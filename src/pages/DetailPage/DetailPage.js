import './DetailPage.css';
import React from 'react';

import TopHeader from '../../components/TopHeader/TopHeader'
import BottomFooter from '../../components/BottomFooter/BottomFooter'
import Loading from '../../components/Loading/Loading'

const setting = {
    'method': 'GET'
}

class LoactionList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var content = [];
        var i = 0;
        content.push(
            <tr key={i}>
                <th>索书位置的编码</th>
                <th>所在的馆区</th>
                <th>在馆状态</th>
            </tr>
        );
        for (let item of this.props.holding) {
            i++;
            content.push(
                <tr>
                    <td>{item.callno}</td>
                    <td>{item.local.substr(0, 5)}</td>
                    <td>{item.state}</td>
                </tr>
            );
        }
        return content;
    }
}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.location.pathname.substr(6, this.props.location.pathname.length - 1),
            bookData: null,
            onInit: true
        }
    }
    render() {
        if (this.state.onInit) {
            var that = this;
            var url = 'http://open.twtstudio.com/api/v1/library/book/';
            url += that.state.index;
            fetch(url, setting)
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                    console.log(res.data);
                    that.setState({
                        bookData: res.data,
                        onInit: false
                    }, that.render);
                })
                ;
            return (
                <div>
                    <div className="header"><TopHeader /></div>
                    <div className="v-load"><Loading /></div>
                    <div className="footer"><BottomFooter /></div>
                </div>
            );
        }
        var bookData = this.state.bookData;
        return !bookData
            ?
            <div>
                <div className="header"><TopHeader /></div>
                <div className="v-load" style={{ top: "50%" }}>404 not found</div>
                <div className="footer"><BottomFooter /></div>
            </div>
            :
            <div>
                <div className="header"><TopHeader /></div>
                <div className="container">
                    <div className="g-card basic-card">
                        <div className="top-bar">
                            <img className="icon-svg" src={require("../../assets/icon-basicinfo.svg")} />
                            <div className="bar-title">基本信息</div>
                        </div>
                        <div className="card-content">
                            <img className='image' src={require("../../assets/image-error.png")} />
                            <div className="detail-content">
                                <div className="book-title">{bookData.title ? bookData.title : 'unknown'}</div>
                                <div className='book-detail'>作者：{bookData.authorPrimary ? bookData.authorPrimary[0] : 'unknown'}</div>
                                <div className='book-detail'>出版社：{bookData.publisher}</div>
                                <div className='book-detail'>年份：{bookData.year}</div>
                                <div className='book-detail'>isbn：{bookData.isbn}</div>
                                <div className='book-detail'>价格：{bookData.price}</div>
                                <div className='book-detail'>入馆时间：{bookData.holding[0] ? bookData.holding[0].indate : 'unknown'}</div>
                                <div className='book-detail'>图书类型：{bookData.holding[0] ? bookData.holding[0].type : 'unknown'}</div>
                                <div className='book-detail'>地区：{bookData.place}</div>
                            </div>
                        </div>
                    </div>
                    <div className="g-card location-card">
                        <div className="top-bar">
                            <img className="icon-svg" src={require("../../assets/icon-location.svg")} />
                            <div className="bar-title">在馆位置</div>
                        </div>
                        <table className="location-table">
                            <LoactionList holding={bookData.holding} />
                        </table>
                    </div>
                </div>
                <div className="footer"><BottomFooter /></div>
            </div>
    }
}

export default DetailPage;