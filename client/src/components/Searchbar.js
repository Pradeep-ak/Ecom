import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SearchSubmitRequest } from '../action/searchAction'

class SearchBar extends Component {
    constructor(props){
      super(props)
      this.state = {searchTerm : "",errors : {}}
      this.onChange = this.onChange.bind(this);
    }

    componentWillMount = ()=> {
      const search = this.props.location.search; // could be '?foo=bar'
      const params = new URLSearchParams(search);
      const searchTerm = params.get('searchTerm'); // bar
      if (searchTerm != null){
        this.setState({['searchTerm']:searchTerm})
      } 
    }

    onChange(e) {
        this.setState({ [e.target.name] : e.target.value});
    }

    render(){
      return (
        <div className="row justify-content-md-center " style={{padding:'10px', background:'#28B463', boxShadow:'0 4px 8px 0 rgba(28,32,36,.2)'}}>
          <div className="col col-lg-2">
              Site Logo
          </div>
          <div className="col-md-auto col-lg-8">
            <form method='get' action='/s/seoname'>
              <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search for..."  name="searchTerm"
                  value={this.state.searchTerm} onChange={this.onChange} />
                  <span className="input-group-btn" style={{paddingLeft:'10px'}}>
                    <button className="btn btn-default" type="submit" style={{borderColor:'black'}} >Go!</button>
                  </span>
              </div>
            </form>  
          </div>
          <div className="col col-lg-2"></div>  
        </div>
      )
    }
  }

  function mapStateToProps(state){
    //console.log(state)
    return {search:state.search};
  }

  export default withRouter(connect(mapStateToProps, {SearchSubmitRequest})(SearchBar));