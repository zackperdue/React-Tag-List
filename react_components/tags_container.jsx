/* @flow weak */

import React from 'react';
import Tag from './tag.jsx';

const TagsContainer = React.createClass({
  render: function() {
    const tags = this.props.tags.map((tag, i) => {
      return <Tag
        key={i}
        tagIndex={i}
        removeTag={this.props.removeTag}
        name={tag} />
    });

    return (
      <div className="tags_container">
        {tags}
      </div>
    );
  }
});

export default TagsContainer;
