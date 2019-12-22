import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AlertBar extends Component {
    constructor(){
        super()
        this.state = {
            display:true,
            type:'Info',
            alertMsg:''
        }
    }
    
    componentWillReceiveProps = nextProps => {
        console.log(nextProps.alert.alertMsg)
        this.setState({
            display:true,
            type:nextProps.alert.type,
            alertMsg:nextProps.alert.alertMsg
        });
        setTimeout(function() {
                this.setState({display:false});
            }.bind(this),3000
        );
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

export default withRouter(connect(mapStateToProps, {})(AlertBar));
