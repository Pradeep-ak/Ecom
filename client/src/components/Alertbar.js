import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {removeAlert} from '../action/commonAction';

class AlertBar extends Component {
    constructor(){
        super()
        this.state = {
            display:false,
            type:'Info',
            alertMsg:''
        }
    }
    
    componentDidMount = ()=> {
        this.setState({
            display:false,
            type:'Info',
            alertMsg:''
        });
    }
    
    componentWillReceiveProps = nextProps => {
        // console.log(nextProps.alert.alertMsg)
        this.setState({
            display:nextProps.alert.display,
            type:nextProps.alert.type,
            alertMsg:nextProps.alert.alertMsg
        });
        if(nextProps.alert.display === true){
            setTimeout(function() {
                this.props.removeAlert()
                }.bind(this),3000
            );
        }
    }

    render(){
        
        return(
            this.state.display && <div>
                 {this.state.alertMsg}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        alert:state.alert
    };
}

export default withRouter(connect(mapStateToProps, {removeAlert})(AlertBar));
