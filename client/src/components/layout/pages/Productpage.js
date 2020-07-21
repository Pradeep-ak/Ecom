import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchProduct } from '../../../action/productAction'
import { addToBag } from '../../../action/productAction'
import Utils from '../../../utils/utils'

// 1280352
const Price = (data) => {
    var returnHtml = ''
    if (data.price != null && data.price.amounts != null){
        var salePrice = data.price.amounts.find(element => element.type.toUpperCase() ==='SALE')
        var clearancePrice = data.price.amounts.find(element => element.type.toUpperCase() ==='CLEARANCE')
        var originalPrice = data.price.amounts.find(element => element.type.toUpperCase() ==='ORIGINAL')
        
        if(clearancePrice != null){
            returnHtml = <p><b>Clearance Price :</b><i> ${clearancePrice.max}</i><span style={{fontSize:'10px', fontWeight:'lighter'}}> ( {clearancePrice.maxPercentOff}% off )</span>
            <br/>
            <strike><b>Price :</b><i> ${originalPrice.max}</i></strike></p>
        }else if(salePrice != null){
            returnHtml = <p><b>Sale Price :</b><i> ${salePrice.max}</i><span style={{fontSize:'10px', fontWeight:'lighter'}}> ( {salePrice.maxPercentOff}% off )</span>
            <br/>
            <strike><b>Price :</b><i> ${originalPrice.max}</i></strike></p>
        }else{
            returnHtml = <p><b>Price :</b><i> ${originalPrice.max}</i><br/></p>
        }
    }
    return returnHtml;
  };

const Row = (data) => {
    var cell_one_1, cell_one_2, cell_two_1, cell_two_2 = ''
    if(data.cell_one !=null && data.cell_two !=null){
        cell_one_1 = <div className="col col-lg-2" style={{textTransform: "capitalize", background:'rgb(213, 228, 216)', textAlign:'left'}}><b>{data.cell_one.name}</b></div>
        cell_one_2 =<div className="col col-lg-4" style={{textAlign:'left'}}>{data.cell_one.value}</div>
 
        cell_two_1 =<div className="col col-lg-2" style={{ textTransform: "capitalize", background:'rgb(213, 228, 216)', textAlign:'left'}}><b>{data.cell_two.name}</b></div>
        cell_two_2 =<div className="col col-lg-4" style={{textAlign:'left'}}>{data.cell_two.value}</div>
    };
    return <div className="row justify-content-md-center" style={{border:"ridge black", borderWidth:"0.5px 0.5px 0px 0.5px"}}>
        {cell_one_1}{cell_one_2}{cell_two_1}{cell_two_2}
    </div>
}

const ProductDetails = (data) => {
    var returnHtml='';
    var table=[]
    if (data.details != null && data.details.length > 0){

        for (let index = 0; index < data.details.length; index++) {
            const element_1 = data.details[index];
            index++;
            const element_2 = data.details[index];
            table.push(<Row cell_one={element_1} cell_two={element_2} key={index}/>) 
        }

        returnHtml = <div className="row justify-content-md-center" style={{paddingBottom:'5px'}}>
                {/* <div className="col col-lg-1" style={{borderColor:"black", border:"1px"}}></div> */}
                <div className="col col-lg-10" style={{border:"1px ridge black"}}>
                    <div className="row" style={{border: '7px black', borderWidth: 'thin', background: '#46af72', paddingLeft: '10px'}}>
                        <div className="col col-lg-8" style={{borderColor:"black", border:"1px", fontWeight:"bold", textAlign:"left"}}>
                            Product Details
                        </div>
                    </div>
                    {table}
                </div>
                {/* <div className="col col-lg-1" style={{borderColor:"black", border:"1px"}}></div> */}
            </div>
    }
    
    return returnHtml;
}

const ProductDescription = (data) => {
    var returnHtml='';
    if (data.desc != null){
        returnHtml = 
        <div className="row justify-content-md-center" style={{paddingBottom:'5px'}}>
            <div className="col col-lg-10" style={{textAlign:"left"}}>
                <b>Product Description : </b><span dangerouslySetInnerHTML={{ __html: data.desc }} />
            </div>
        </div>
    }
    return returnHtml;
}

const ProductOptions = (data) => {
    var returnHtml='';
    if(data.prodData.showOptions){
        returnHtml = Object.keys(data.prodData.dimension).map((e,i)=>{
            var optionHtml = data.prodData.dimension[e].map((ele,k)=>{
                return <option key={k} value={ele}>{ele}</option>
            })
            return   <div className="form-group" key={i}>
                <label htmlFor="exampleFormControlSelect1" style={{margin:'0px 10px 0px 0px', textTransform: "capitalize"}}>{e} </label>
                <select className="form-control" id="exampleFormControlSelect1" style={{width:'50%', display:'inline'}} name={e} onChange={data.onselect}>
                    {optionHtml}
                </select>
          </div>
        });
    }
    return returnHtml;
}


class Productpage extends Component {

    constructor(props){
        super(props)
        this.changePrimary = this.changePrimary.bind(this);
        this.selectDimension = this.selectDimension.bind(this);
        this.resetPrimary = this.resetPrimary.bind(this);
        this.addToBag = this.addToBag.bind(this);
        this.state = {
            id: "",
            description: "",
            keyword: "",
            name: "",
            attributes: [
            {
            name: "",
            value: ""
            }
            ],
            skus: [
            {
            id: "",
            option: [
            {
            name: "size",
            value: "newborn-3 months"
            },
            {
            name: "color",
            value: "Red Bear",
            family: "Red",
            image: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0527201907022529S",
            altText: "Red Bear"
            },
            productImage: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015231M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            },
            altImages: [
            {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015228M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            }
            ]
            }
            ],
            price: {
            amounts: []
            }
            },
            {
            id: "32037900075",
            option: [
            {
            name: "size",
            value: "6-9 months"
            },
            {
            name: "color",
            value: "Red Bear",
            family: "Red",
            image: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0527201907022529S",
            altText: "Red Bear"
            },
            productImage: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015231M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            },
            altImages: [
            {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015228M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            }
            ]
            }
            ],
            price: {
            amounts: [
            {
            max: 32,
            min: 32,
            type: "ORIGINAL",
            minPercentOff: 0,
            maxPercentOff: 0
            },
            {
            max: 12.8,
            min: 12.8,
            type: "SALE",
            minPercentOff: 60,
            maxPercentOff: 60
            }
            ],
            id: "32037900075_Price"
            }
            },
            {
            id: "32037900117",
            option: [
            {
            name: "size",
            value: "12 months"
            },
            {
            name: "color",
            value: "Red Bear",
            family: "Red",
            image: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0527201907022529S",
            altText: "Red Bear"
            },
            productImage: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015231M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            },
            altImages: [
            {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015228M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            }
            ]
            }
            ],
            price: {
            amounts: [
            {
            max: 32,
            min: 32,
            type: "ORIGINAL",
            minPercentOff: 0,
            maxPercentOff: 0
            },
            {
            max: 12.8,
            min: 12.8,
            type: "SALE",
            minPercentOff: 60,
            maxPercentOff: 60
            }
            ],
            id: "32037900117_Price"
            }
            },
            {
            id: "32037900133",
            option: [
            {
            name: "size",
            value: "18 months"
            },
            {
            name: "color",
            value: "Red Bear",
            family: "Red",
            image: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0527201907022529S",
            altText: "Red Bear"
            },
            productImage: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015231M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            },
            altImages: [
            {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015228M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            }
            ]
            }
            ],
            price: {
            amounts: [
            {
            max: 32,
            min: 32,
            type: "ORIGINAL",
            minPercentOff: 0,
            maxPercentOff: 0
            },
            {
            max: 12.8,
            min: 12.8,
            type: "SALE",
            minPercentOff: 60,
            maxPercentOff: 60
            }
            ],
            id: "32037900133_Price"
            }
            },
            {
            id: "32037900158",
            option: [
            {
            name: "size",
            value: "24 months"
            },
            {
            name: "color",
            value: "Red Bear",
            family: "Red",
            image: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0527201907022529S",
            altText: "Red Bear"
            },
            productImage: {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015231M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            },
            altImages: [
            {
            url: "http://s7d9.scene7.com/is/image/JCPenney/DP0812201909015228M?hei=380&amp;wid=380&op_usm=.4,.8,0,0&resmode=sharp2"
            }
            ]
            }
            ],
            price: {
            amounts: [
            {
            max: 32,
            min: 32,
            type: "ORIGINAL",
            minPercentOff: 0,
            maxPercentOff: 0
            },
            {
            max: 12.8,
            min: 12.8,
            type: "SALE",
            minPercentOff: 60,
            maxPercentOff: 60
            }
            ],
            id: "32037900158_Price"
            }
            }
            ],
            images: [
           
            ],
            primaryImage:[

            ],
            parentPP: "ppr5007864288",
            parentCategoryId: [ ],
            price: {
            amounts: [
            {
            max: 32,
            min: 32,
            type: "ORIGINAL",
            minPercentOff: 0,
            maxPercentOff: 0
            },
            {
            max: 12.8,
            min: 12.8,
            type: "SALE",
            minPercentOff: 60,
            maxPercentOff: 60
            }
            ],
            id: "3203790_Price",
            couponInfo: [
            {
            alphaId: "4HOLIDAY",
            amount: {
            max: 10.88,
            min: 10.88
            },
            adjustments: [
            {
            max: 15,
            min: 15,
            type: "PERCENTAGEOFF"
            },
            {
            max: 1.92,
            min: 1.92,
            type: "DOLLAROFF"
            }
            ]
            }
            ]
            }
            }
    }

    componentDidMount = ()=> {
        this._asyncRequest = fetchProduct(this.props.location).then(
            externalData => {
              this._asyncRequest = null;
              //console.log(externalData.data)
              externalData.data['primaryImage'] = externalData.data.images.filter(e=>e.type==='PRIMARY')
              //extarct dim from product.
              var dim = new Utils().getDimension(externalData.data)
              externalData.data['dimension'] = dim;
              var count = 0 
              Object.keys(dim).forEach(element => {count = count + dim[element].length});
              externalData.data['showOptions'] = count > 1?true:false;
              externalData.data['selectedDimension'] = {};
              this.setState(externalData.data);
            }
        );        
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.prod);
    }

    changePrimary(e) {
        var selectedUrl = e.target.src
        this.setState({['primaryImage']:this.state.images.filter(e=>e.url===selectedUrl)})
    }

    resetPrimary(e){
        this.setState({['primaryImage']:this.state.images.filter(e=>e.type==='PRIMARY')})
    }

    selectDimension(e){
        console.log(e.target.name)
        console.log(e.target.value)

    }
    addToBag(e){
        e.preventDefault();
        // const form = event.target;
        // const data = new FormData(form);
        var sku_id = this.state['skus'][0]['id']
        this.props.addToBag(sku_id)
    }

     render() {
       return(
           <div>
               <div className="row justify-content-md-center">
                    <div className="col col-lg-12">
                        <br />
                        
                        <br />
                    </div>
                </div>
                <div className="row justify-content-md-center" style={{paddingBottom:'5px'}}>
                    <div className="col col-lg-6" style={{borderColor:"black", border:"1px"}}>
                        <div className="row justify-content-md-center" style={{paddingBottom:'5px'}}>
                        {this.state.images.filter(e=>e.type==='ALTERNATE').length > 0 &&
                            <div className="col col-lg-2" style={{boxShadow: '0px 0px 1px 0px rgba(28,32,36,.2)', overflowX: 'auto', height: '400px'}}>
                                <div>
                                    <ul className="list-unstyled">
                                        {/* {this.state.images.filter(e=>e.type==='PRIMARY').map((e, i)=>{
                                            return <li className="media" style={{margin:'5px'}} key={i}>
                                                <img src={e.url} className="mr-3" alt={e.altText} style={{width:'auto', height:'auto', maxWidth:'100%', cursor:'pointer'}} onMouseOver={this.changePrimary} onMouseOut={this.resetPrimary}/>
                                            </li>
                                        })} */}
                                        {this.state.images.filter(e=>e.type==='ALTERNATE').map((e, i)=>{
                                            return <li className="media" style={{margin:'5px'}} key={i}>
                                                <img src={e.url} className="mr-3" alt={e.altText} style={{width:'auto', height:'auto', maxWidth:'100%', cursor:'pointer'}} onMouseOver={this.changePrimary} onMouseOut={this.resetPrimary}/>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        }
                            <div className="col col-lg-7" style={{boxShadow: '2px 4px 8px 2px rgba(28,32,36,.2)', marginLeft:"7px"}}>
                                {this.state.primaryImage.map((e, i)=>{
                                    return <img src={e.url} alt={e.altText} key={i}/>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-6" style={{textAlign:"left"}}>
                        <h4>{this.state.name}</h4>
                        <p>Product:<span style={{fontSize:"14px"}}> {this.state.id}</span></p>
                        <Price price={this.state.price}/>
                        <form onSubmit={this.addToBag}>
                            <ProductOptions prodData={this.state} onselect={this.selectDimension}/>
                            <input type='submit' name='Add_to_Bag' value="Add to Bag"/>
                        </form>
                        
                        
                    </div>
                </div>
                <br/>
                <ProductDescription desc={this.state.description}/>
                <br/>
                <ProductDetails details={this.state.attributes}/>
                <br/><br/>
           </div>
       )
     }
}

function mapStateToProps(state){
    return {prod:state.prod};
  }


export default connect(mapStateToProps,{addToBag})(withRouter(Productpage));
