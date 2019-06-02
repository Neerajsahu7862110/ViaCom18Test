import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchGif} from '../actions/AppAction';
import SearchBar from './SearchBar';
import GifContent from './GifContent';
import Loader from './Loader';

class App extends Component {

  static propsTypes = {
    fetchGif: PropTypes.func.isRequired,
    appData: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      term: '',
      hasMore: false,
      showLoader: false
    };
  }

  searchGif = (term) => {
    if (term !== this.state.term) {
      this.setState({ offset: 0, showLoader: true, hasMore: true, term }, () => {
        this.props.fetchGif(term, this.state.offset, true);
        this.setState({ offset: this.state.offset + 10, term })
      })
    } else {
      if(this.props.appData.totalCount > this.state.offset) {
          this.props.fetchGif(term, this.state.offset);
          this.setState({ offset: this.state.offset + 10, showLoader: false })
      } else {
        this.setState({
          hasMore: false
        });
      }
    }
    };
  
  render() {
    const { appData } = this.props;
    const dataLength = (appData.result && appData.result.length) || '';
    return (
      <div>
      <SearchBar searchGif={this.searchGif} />
        {appData.isLoading && this.state.showLoader && <Loader />}
         { dataLength && <InfiniteScroll
            dataLength={dataLength}
            next={() => this.searchGif(this.state.term)}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}
          >
            <div className="image-grid">
              {appData.result && appData.result.map((item) => (
                <GifContent
                  gifUrl={item.images.original.url}
                  imgUrl={item.images.original_still.url}
                  title={item.title}
                  id={item.id}
                  key={item.id}
                />
              ))}
            </div>
          </InfiniteScroll>
         }
      </div>
    );
  }
}

const mapStateToProps = ({ appData }) => ({
  appData
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGif: (searchKey, offset, status) => { dispatch(fetchGif(searchKey, offset, status)); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
