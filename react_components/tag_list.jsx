/* @flow weak */

import React from 'react';
import TagsContainer from './tags_container.jsx';

const TagList = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    tags: React.PropTypes.any
  },

  separators: [9, 13, 32, 188],

  deleters: [8],

  cancelers: [27],

  forbidden: new RegExp(/\W+/),

  getDefaultProps: function() {
    return {
      name: "",
      tags: []
    };
  },

  getInitialState: function() {
    return {
      tags: [],
      inputSize: 1,
      deleteCount: 0
    };
  },

  componentWillMount: function() {
    this.initWithTags();
  },

  componentDidMount: function() {
    // Stops separators from appearing briefly
    this.refs.tag_input.addEventListener('keydown', (e) => {
      if (this.separators.indexOf(e.which) !== -1) {
        e.preventDefault();
      }

      this.setState({
        inputSize: e.target.value.length + 2 || 1
      });
    });

    this.refs.tag_input.addEventListener('keyup', (e) => {
      const matches = e.target.value.match(this.forbidden);
      if (matches) {
        this.refs.tag_input.value = e.target.value.replace(matches[0], '');
        e.preventDefault();
      }

      // DELETERS
      if (this.deleters.indexOf(e.which) !== -1 && e.target.value.length === 0) {
        e.preventDefault();
        this.setState({
          deleteCount: this.state.deleteCount += 1
        }, () => {
          if (this.state.deleteCount === 2) {
            this.removeLastTag();
          }
        });
      }

      // SEPARATORS
      if (this.separators.indexOf(e.which) !== -1) {
        e.preventDefault();
        this.addStringToTagList(this.refs.tag_input.value);
        this.clearTagInput();
      }

      // CANCELERS
      if (this.cancelers.indexOf(e.which) !== -1) {
        e.preventDefault();
        this.clearTagInput();
      }

    });
  },

  initWithTags: function() {
    this.setState({
      tags: this.removeDuplicates(this.props.tags.split(',').map(tag => { return this.cleanTag(tag) }))
    }, () => {
      this.refs.hidden_input.value = this.state.tags.join(', ')
    });
  },

  removeLastTag: function() {
    if (this.state.tags.length > 0) {
      const newTags = this.state.tags.slice(0, -1);

      this.setState({
        tags: newTags,
        deleteCount: 0
      });
    }
  },

  cleanTag: function(string) {
    return string
      .trim()
      .replace(',', '')
      .replace(' ', '');
  },

  removeDuplicates: function(tags) {
    var seen = new Set();

    return tags.filter((tag) => {
      return !seen.has(tag) && seen.add(tag);
    });
  },

  removeTagAtIndex: function(index) {
    let newTags = this.state.tags;
    delete newTags[index];

    this.setState({
      tags: newTags
    });
  },

  addStringToTagList: function(string) {
    if (string !== "") {
      this.setState({
        tags: this.removeDuplicates(this.state.tags.concat([this.cleanTag(string)]))
      }, () => {
        this.refs.hidden_input.value = this.state.tags.join(', ');
      });
    }
  },

  clearTagInput: function() {
    this.refs.tag_input.value = "";
    this.setState({
      inputSize: 1
    });
  },

  focusTagInput: function() {
    this.refs.tag_input.focus();
  },

  value: function() {
    return this.state.tags;
  },

  render: function() {
    return (
      <div className="tag_list" onClick={this.focusTagInput}>
        <TagsContainer
          removeTag={this.removeTagAtIndex}
          tags={this.state.tags} />
        <input type="text" ref="tag_input" size={this.state.inputSize} />
        <input type="hidden" ref="hidden_input" name={this.props.name} />
      </div>
    );
  }
});

export default TagList;
