import React, { Component } from 'react';

export default (props) => {
  console.log("article", props);
  return (
  <div>
    <h1>{props.title.rendered}</h1>
    <p>{props.date}</p>
    <div dangerouslySetInnerHTML={{__html: props.content.rendered}} />
  </div>
)};
