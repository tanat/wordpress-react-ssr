import React, { Component } from 'react';
import moment from 'moment';

export default class ArticlePage extends Component {

  onClickLike() {
    console.log("like");
  }

  render() {
    return (
      <div id="article">
        <h1>{this.props.title.rendered}</h1>
        <button className="like_btton" onClick={() => this.onClickLike()}>お気に入り</button>
        <p className="article_date">{moment(this.props.date).format('YYYY/MM/DD')}</p>
        <div className="article_body" dangerouslySetInnerHTML={{ __html: this.props.content.rendered }} />
      </div>
    );
  }
}

