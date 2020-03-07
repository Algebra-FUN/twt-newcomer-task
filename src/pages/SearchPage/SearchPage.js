import './SearchPage.css';
import React from 'react';
import TopHeader from '../../components/TopHeader/TopHeader'
import BottomFooter from '../../components/BottomFooter/BottomFooter'
import SearchView from '../../components/SearchView/SearchView'
import BookList from '../../components/BookList/BookList'
import Loading from '../../components/Loading/Loading'

const setting = {
    'method': 'GET'
}

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onSearch: false,
            searchTarget: "",
            searchLength: 0,
            books: [],
            page: 1,
            loading: false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.request = this.request.bind(this);
        this.turnPage = this.turnPage.bind(this);
    }
    request(that, onBack) {
        var url = "http://open.twtstudio.com/api/v1/library/book/?title=";
        url += that.state.searchTarget;
        url += "&page=";
        url += that.state.page;

        fetch(url, setting)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (!res.data || res.data.length == 0) {
                    alert("没有更多了");
                    that.setState({
                        loading: false
                    })
                    return;
                }
                onBack(res);
            });
    }
    turnPage(direction) {
        var that = this;
        var preTop;//used to check user scroll
        function backTopAni() {
            if (document.documentElement.scrollTop < 1) {
                document.documentElement.scrollTop = 0;
                return;
            }
            if (preTop < document.documentElement.scrollTop) {
                //stop ani when user scroll
                return;
            }
            document.documentElement.scrollTop -= document.documentElement.scrollTop / 35;
            preTop = document.documentElement.scrollTop;
            requestAnimationFrame(backTopAni);
        }
        var toPage = that.state.page + direction;
        that.setState({
            onSearch: true,
            loading: true,
            page: toPage
        }, () => {
            that.request(that, (res) => {
                preTop = document.documentElement.scrollTop;
                requestAnimationFrame(backTopAni);
                that.setState({
                    books: res.data,
                    loading: false
                });
            });
        });
    }
    onPrev() {
        this.turnPage(-1);
    }
    onNext() {
        this.turnPage(1);
    }
    handleSearch(value) {
        var that = this;

        that.setState({
            onSearch: true,
            searchTarget: value,
            loading: true,
            page: 1,
        }, () => {
            that.request(that, (res) => {
                that.setState({
                    searchLength: res.data.length,
                    books: res.data,
                    loading: false
                });
            })
        });
    }
    render() {
        return (
            <div className="backer">
                <div className="v-load" style={{ display: this.state.loading ? 'block' : 'none' }}><Loading /></div>
                <div className="header"><TopHeader /></div>
                <div className="main-view">
                    <div className="search-view" style={{ top: this.state.onSearch ? "-20px" : "50%" }}>
                        <SearchView handleSearch={this.handleSearch} />
                    </div>
                    <img className="back-img" style={{ opacity: this.state.onSearch ? "0" : "1" }} src={require("../../assets/background.png")} />
                </div>
                <div className="book-list" style={{ opacity: this.state.loading ? "0" : "1", minHeight: this.state.onSearch ? "77vh" : "91vh"}}>
                    <BookList books={this.state.books} />
                </div>
                <div className="bn-holder" style={{ opacity: this.state.loading ? "0" : "1" }}>
                    <div className="pre-holder" style={{ display: this.state.page == 1 ? 'none' : 'block' }}>
                        <button className="pg" style={{ display: this.state.onSearch ? 'block' : 'none' }} onClick={this.onPrev}>PREV</button>
                    </div>
                    <button className="pg" style={{ display: this.state.onSearch ? 'block' : 'none' }} onClick={this.onNext}>NEXT</button>
                </div>
                <div className="footer"><BottomFooter /></div>
            </div>
        );
    }
}

export default SearchPage;