import './BookCard.css';
import React from 'react';

class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.skip = this.skip.bind(this);
    }
    skip() {
        window.open('about:blank').location.href = 'http://localhost:3000/book/'+this.props.book.index;
    }
    render() {
        var bookName = this.props.book.title.length > 14 ? this.props.book.title.substr(0, 14) + "......" : this.props.book.title;
        var bookAuthor = this.props.book.author.length > 18 ? this.props.book.author.substr(0, 18) + "..." : this.props.book.author;
        var bookPublisher = this.props.book.publisher.length > 18 ? this.props.book.publisher.substr(0, 18) + "..." : this.props.book.publisher;
        return (
            <div>
                <div className="card" onClick={this.skip}>
                    <div className="img-rect">
                        <img className="img" src={require("../../assets/image-error.png")}></img>
                    </div>
                    <div className="detail-box">
                        <div className="book-name">
                            <div className="title">{bookName}</div>
                        </div>
                        <div className="book-more">
                            <div className="detail">author : {bookAuthor}</div>
                            <div className="detail">publisher : {bookPublisher}</div>
                            <div className="detail-more">
                                <div className="detail" id="date">year : {this.props.book.year}</div>
                                <div className="detail" id="isbn">isbn : {this.props.book.isbn}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default BookCard;