import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initalLoad } from '../../../action/homeAction'


class Checkoutpage extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentWillMount(){
        //this.props.initalLoad();
    }

    componentWillReceiveProps(nextProps){
        //this.setState(nextProps.home);
    }

     render() {
       return(
           <div>
               <br/><br/><br/>
               <div className="row justify-content-md-center">
                    <div className="col col-lg-9">
                        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
                            <div className="col col-lg-10" style={{textAlign:'left'}}>
                                <h5>Personal Details </h5>
                            </div>
                            <div className="col col-lg-2" style={{textAlign:'right'}}>
                                <input type="button" value="Edit" name="personal_details"/>
                            </div>                                                                
                        </div>
                    </div>
                    <div className="col col-lg-3">
                        .
                    </div>
                </div>
           </div>
       )
     }
}

function mapStateToProps(state){
    return {home:state.home};
  }


export default connect(mapStateToProps,{})(withRouter(Checkoutpage));
