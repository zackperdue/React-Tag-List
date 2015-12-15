import React from 'react';
import ReactDOM from 'react-dom';
import TagList from './react_components/tag_list.jsx';

export default React;

ReactDOM.render(React.createElement(TagList, { tags: 'hello, goodbye, hello', name: 'tags' }), document.getElementById('tag_list'));
