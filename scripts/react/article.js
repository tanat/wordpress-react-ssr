import React, { Component } from 'react';
import moment from 'moment';
import request from 'superagent';

export default class ArticlePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      favorited: props.favorited,
    };
  }

  onClickLike() {
    const method = this.state.favorited ? 'del' : 'post';

    request[method](`/api/${this.props.id}/favorite`).end((error) => {
      if (error) {
        console.error(error);
      }

      this.setState({
        favorited: !this.state.favorited,
      });
    });
  }

  render() {
    const { favorited } = this.state;

    return (
      <div id="article">
        <h1>{this.props.title.rendered}</h1>
        <button
          className={`like_btton${favorited ? ' on' : ''}`}
          onClick={() => this.onClickLike()}
        >{ favorited ? 'お気に入り' : 'お気に入りを解除'}</button>

        <p className="article_date">{moment(this.props.date).format('YYYY/MM/DD')}</p>
        <div className="article_body" dangerouslySetInnerHTML={{ __html: this.props.content.rendered }} />
      </div>
    );
  }
}

