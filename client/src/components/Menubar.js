import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMenu } from '../action/commonAction'
import utils from '../utils/utils'

class Menubar extends Component {
    constructor(){
        super()
        this.state = {
            activeLabel: '',
            navLeaf:[
                {   
                    index:0,
                    label:'',
                    link:'/'
                }
            ]
        }
    }
    
    componentDidMount = ()=> {
        this._asyncRequest = fetchMenu().then(
            externalData => {
              this._asyncRequest = null;
              //console.log(externalData.data)
              this.setState(externalData.data);
            }
          );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
      }

    componentWillReceiveProps = nextProps => {
        this.setState(nextProps.common);
      }

    render(){
        const menuLen = 6
        const navLen = this.state.navLeaf.length
        var menu = new utils().isMenuBarEnabled(this.props.location);
        return(
            menu &&
            <div className="row" style={{ boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)' }}>
                <div className="col-md-auto " style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                {this.state.navLeaf.sort((a,b)=>a.index>b.index).map((e, i) => {
                                    return i < (menuLen) ? <li className={this.state.activeLabel === e.label ? 'nav-item active' : 'nav-item'} key={i} >
                                        <a className="nav-link" style={{textTransform: "capitalize"}} href={e.link}>{e.label} <span className="sr-only">(current)</span></a>
                                    </li> : ''
                                })}
                                {navLen > menuLen ?
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            More...
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            {this.state.navLeaf.sort((a,b)=>a.index>b.index).map((e, i) => {
                                                if (i > menuLen-1)
                                                    return <a className="dropdown-item navbar-light" href={e.link} key={i}>{e.label}</a>
                                                return ''
                                            })}
                                        </div>
                                    </li> : ''
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {common:state.common};
}

export default withRouter(connect(mapStateToProps, {})(Menubar));
