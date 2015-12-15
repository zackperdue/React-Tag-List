/* @flow weak */

import React from 'react';

const Tag = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      name: ""
    };
  },

  removeTag: function(e) {
    e.preventDefault();
    this.props.removeTag(this.props.tagIndex);
  },

  render: function() {
    return (
      <span className="tag">
        {this.props.name}
        <button
          className="delete-tag"
          onClick={this.removeTag}>&#10006;</button>
      </span>
    );
  }
});

export default Tag;
