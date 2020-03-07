
import React from 'react';
import BookCard from '../BookCard/BookCard';

class BookList extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        const content = [];
        var index = 0;
        for(let book of this.props.books){
            index ++;
            content.push(
                <BookCard key={index} book={book}/>
            );
        }
        return content;

    }

}

export default BookList;