import React, {Component} from 'react'

class Menubar extends Component {
    constructor(){
        super()
        this.state = {
            activeLabel: 'Home',
            navLeaf:[
                {
                    label:'Home',
                    link:'/'
                },{
                    label:'Women',
                    link:'/d/women'
                },{
                    label:'Men',
                    link:'/d/men'
                },{
                    label:'Kids',
                    link:'/d/kids'
                },{
                    label:'Eletronics',
                    link:'/d/eletronics'
                },{
                    label:'Books',
                    link:'/d/books'
                },{
                    label:'Fashion',
                    link:'/d/fashion'
                },{
                    label:'Grocery',
                    link:'/d/grocery'
                },{
                    label:'NonGrocery',
                    link:'/d/nonGrocery'
                }
            ]
        }
    }
    
    render(){
        const navLen = this.state.navLeaf.length
        return(
            <div className="row" style={{ boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)' }}>
                <div className="col-md-auto " style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                {this.state.navLeaf.map((e, i) => {
                                    return i < 6 ? <li className={this.state.activeLabel === e.label ? 'nav-item active' : 'nav-item'} key={i} >
                                        <a className="nav-link" href={e.link}>{e.label} <span className="sr-only">(current)</span></a>
                                    </li> : ''
                                })}
                                {navLen > 5 ?
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            More...
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            {this.state.navLeaf.map((e, i) => {
                                                if (i > 5)
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

export default Menubar;
