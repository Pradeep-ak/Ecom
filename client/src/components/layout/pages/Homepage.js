import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initalLoad } from '../../../action/homeAction'


class Homepage extends Component {

    constructor(props){
        super(props)
        this.state = {
            slots:[
            ]
        }
    }

    componentWillMount(){
        this.props.initalLoad();
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.home);
    }

     render() {
       return(
           <div>
               {this.state.slots.sort((a,b)=>a.id>b.id).map((slot,i) => {
                    return <span key={i}>
                        <br/>
                        <div className="card" >
                        <div className="card-body">
                        <span dangerouslySetInnerHTML={{ __html: slot.htmlContent }} />
                        </div>
                    </div>
                    </span>
                    
               })}
           </div>
       )
     }
}

function mapStateToProps(state){
    console.log(state)
    return {home:state.home};
  }


export default connect(mapStateToProps,{initalLoad})(withRouter(Homepage));
