import React, {Component} from 'react'

class Departmentpage extends Component {
    constructor(){
        super()
        this.state= {
            Department:'Men',
            DepartmentName: "Department Name",
            Categories:[
                { name:'SHOP CLOTHING',
                  link: false,
                },
                { name:'Shirts',
                  link: true,
                  href: '/c/men/shirts'
                },
                { name:'Jeans',
                  link: true,
                  href: '/c/men/jeans'
                },
                { name:'Dress Clothes',
                  link: true,
                  href: '/c/men/dressclothes'
                },
                { name:'Coats & Jackets',
                  link: true,
                  href: '/c/men/coatsjckets'
                },
                { name:'Dress Shirts',
                  link: true,
                  href: '/c/men/dressshirts'
                },
                { name:'Sport Coats & Blazers',
                  link: true,
                  href: '/c/men/sportcoatsblazers'
                },
                { name:'Sweaters',
                  link: true,
                  href: '/c/men/sweaters'
                },
                { name:'Underwear',
                  link: true,
                  href: '/c/men/underwear'
                },
                { name:'Socks',
                  link: true,
                  href: '/c/men/socks'
                },
                { name:'Activewear',
                  link: true,
                  href: '/c/men/activewear'
                },
                { name:'Shorts',
                  link: true,
                  href: '/c/men/shorts'
                },
                { name:'Swimwear',
                  link: true,
                  href: '/c/men/simwear'
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
    
    render(){
        return(
            <div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-12">
                        <br />
                        <h1>{this.state.Department}</h1>
                        <br />
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-2" style={{ textAlign: 'left' }}>
                        <section >
                            <br />
                            <ul className="list-group list-group-flush">
                                {this.state.Categories.map(function (e, i) {
                                    return e.link ?
                                        <li className="list-group-item" style={{ border: '0', paddingTop: '.05rem', paddingBottom: '.05rem' }} key={i} ><a href={e.href}>{e.name}</a></li>
                                        :
                                        <li className="list-group-item" style={{ border: '0' }} key={i} ><b>{e.name}</b></li>
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

export default Departmentpage
