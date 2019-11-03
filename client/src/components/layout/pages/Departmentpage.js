import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDepartment } from '../../../action/departmentAction'


class Departmentpage extends Component {
    constructor(){
        super()
        this.state= {
            Department:'Men',
            h1tag: "Department Name",
            Categories:[
                { 
                  index:0,
                  name:'SHOP CLOTHING',
                  link: false,
                },
                { 
                  index:1,
                  name:'Shirts',
                  link: true,
                  href: '/c/men/shirts'
                },
                { 
                  index:2,
                  name:'Jeans',
                  link: true,
                  href: '/c/men/jeans'
                },
                { 
                  index:3,  
                  name:'Dress Clothes',
                  link: true,
                  href: '/c/men/dressclothes'
                }   
            ],
            Content:[
                {
                    slot:1,
                    htmlContent:"Test Slot <b>1</b>"
                },{
                    slot:2,
                    htmlContent:"Test Slot <b>2</b>"
                },{
                    slot:3,
                    htmlContent:"Test Slot <b>3</b>"
                },{
                    slot:4,
                    htmlContent:"Test Slot <b>4</b>"
                },{
                    slot:5,
                    htmlContent:"Test Slot <b>5</b>"
                },{
                    slot:6,
                    htmlContent:"Test Slot <b>6</b>"
                },{
                    slot:7,
                    htmlContent:"Test Slot <b>7</b>"
                },{
                    slot:8,
                    htmlContent:"Test Slot <b>8</b>"
                }
            ],
            seoData:[
                {
                    header:'1.Seo Header ',
                    content:'1.Seo Data'
                },
                {
                    header:'2.Seo Header ',
                    content:'2.Seo Data'
                },
                {
                    header:'3.Seo Header ',
                    content:'3.Seo Data'
                }
            ],
            errors : {}
        }
    }

    componentDidMount = ()=> {
        this._asyncRequest = fetchDepartment(this.props.location).then(
            externalData => {
              this._asyncRequest = null;
              console.log(externalData.data)
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
        this.setState(nextProps.dept);
    }

    
    render(){
        return(
            <div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-12">
                        <br />
                        <h1 style={{textTransform: "capitalize"}}>{this.state.h1tag}</h1>
                        <br />
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-2" style={{ textAlign: 'left' }}>
                        <section >
                            <br />
                            <ul className="list-group list-group-flush">
                                {this.state.Categories.sort((a,b)=> a.index>b.index).map(function (e, i) {
                                    return e.link ?
                                        <li className="list-group-item" style={{ border: '0', paddingTop: '.05rem', paddingBottom: '.05rem', textTransform: "capitalize"}} key={i} ><a href={e.href}>{e.name}</a></li>
                                        :
                                        <li className="list-group-item" style={{ border: '0', textTransform: "capitalize" }} key={i} ><b>{e.name}</b></li>
                                }
                                )}

                            </ul>
                        </section>
                    </div>
                    <div className="col-md-auto col-lg-10">
                        <br />
                        <div className="card" >
                            {this.state.Content.sort((a, b) => a.slot > b.slot).map((e, i) => {
                                return <section key={i}>
                                    <span dangerouslySetInnerHTML={{ __html: e.htmlContent }} />
                                </section>
                            })}
                        </div>
                        <br />

                        {this.state.seoData.map((e, i) => {
                            return <div className="row" key={i}>
                                <section>
                                    <h3>{e.header}</h3>
                                    <span dangerouslySetInnerHTML={{ __html: e.content }} />
                                </section>
                            </div>
                        })}
                    </div>
                </div>
            </div>  
        )
    }
}

function mapStateToProps(state){
    return {dept:state.dept};
}

export default withRouter(connect(mapStateToProps, {})(Departmentpage));
