import React, { Component } from 'react';

class GifContent extends Component {
  constructor(props) {
    super(props);
    this.state = { showPlay: false };
  }

  togglePlay = () => {
    this.setState({ showPlay: !this.state.showPlay });
  }

  render () {
    const { gifUrl, imgUrl, title, id } = this.props;
    const { showPlay } = this.state;
    return (
      <div className="image-item" key={id} >
        <img src={showPlay ? gifUrl : imgUrl} alt={title} />
        <button className="image-item-button" onClick={this.togglePlay}>{showPlay ? 'Pause' : 'Play'}</button>
    </div>
    );
  }
}

export default GifContent;
