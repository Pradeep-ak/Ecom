import React, { Component } from 'react'

class Categorypage extends Component {
    constructor(){
        super()
        this.state={
            sort:'Featured',
            Department:'Men',
            CategoryName:'Jeans',
            ProductCount:12,
            Dim:[
                {
                    index:1,
                    dimName:'Shirt Type',
                    dimVal:[
                        {
                            label:'Button-front shirts',
                            selected:true,
                            count:637,
                            url:'/'
                        },
                        {
                            label:'Dress shirts',
                            selected:true,
                            count:635,
                            url:'/'
                        },
                        {
                            label:'Polo shirts',
                            selected:false,
                            count:284,
                            url:'/'
                        },
                        {
                            label:'T-shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Graphic t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Hoodies',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Sweatshirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Western shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Quarter-zip pullover',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tank tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Henley shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Thermal tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shirt + tie sets',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Flannel shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tanks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Rugby shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Mock neck tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Muscle t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Vests',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Jerseys',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Layered tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Turtlenecks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tuxedo shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Camp shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Cardigans',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Boxer briefs',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Safety shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shells',
                            selected:false,
                            count:1081,
                            url:''
                        }
                    ]
                },
                {
                    index:2,
                    dimName:'Brand',
                    searchVal:true,
                    dimVal:[
                        {
                            label:'Button-front shirts',
                            selected:false,
                            count:637,
                            url:''
                        },
                        {
                            label:'Dress shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Polo shirts',
                            selected:false,
                            count:284,
                            url:''
                        },
                        {
                            label:'T-shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Graphic t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Hoodies',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Sweatshirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Western shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Quarter-zip pullover',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tank tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Henley shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Thermal tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shirt + tie sets',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Flannel shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tanks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Rugby shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Mock neck tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Muscle t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Vests',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Jerseys',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Layered tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Turtlenecks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tuxedo shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Camp shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Cardigans',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Boxer briefs',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Safety shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shells',
                            selected:false,
                            count:1081,
                            url:''
                        }
                    ]
                },
                {
                    index:3,
                    dimName:'Mens Size Range',
                    searchVal:true,
                    dimVal:[
                        {
                            label:'Button-front shirts',
                            selected:false,
                            count:637,
                            url:''
                        },
                        {
                            label:'Dress shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Polo shirts',
                            selected:false,
                            count:284,
                            url:''
                        },
                        {
                            label:'T-shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Graphic t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Hoodies',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Sweatshirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Western shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Quarter-zip pullover',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tank tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Henley shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Thermal tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shirt + tie sets',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Flannel shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tanks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Rugby shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Mock neck tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Muscle t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Vests',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Jerseys',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Layered tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Turtlenecks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tuxedo shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Camp shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Cardigans',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Boxer briefs',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Safety shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shells',
                            selected:false,
                            count:1081,
                            url:''
                        }
                    ]
                },
                {
                    index:5,
                    dimName:'Color',
                    searchVal:true,
                    dimVal:[
                        {
                            label:'Button-front shirts',
                            selected:false,
                            count:637,
                            url:''
                        },
                        {
                            label:'Dress shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Polo shirts',
                            selected:false,
                            count:284,
                            url:''
                        },
                        {
                            label:'T-shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Graphic t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Hoodies',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Sweatshirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Western shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Quarter-zip pullover',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tank tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Henley shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Thermal tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shirt + tie sets',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Flannel shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tanks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Rugby shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Mock neck tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Muscle t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Vests',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Jerseys',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Layered tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Turtlenecks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tuxedo shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Camp shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Cardigans',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Boxer briefs',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Safety shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shells',
                            selected:false,
                            count:1081,
                            url:''
                        }
                    ]
                },
                {
                    index:4,
                    dimName:'Size',
                    searchVal:true,
                    dimVal:[
                        {
                            label:'Button-front shirts',
                            selected:false,
                            count:637,
                            url:''
                        },
                        {
                            label:'Dress shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Polo shirts',
                            selected:false,
                            count:284,
                            url:''
                        },
                        {
                            label:'T-shirts',
                            selected:false,
                            count:635,
                            url:''
                        },
                        {
                            label:'Graphic t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Hoodies',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Sweatshirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Western shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Quarter-zip pullover',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tank tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Henley shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Thermal tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shirt + tie sets',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Flannel shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tanks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Rugby shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Mock neck tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Muscle t-shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Vests',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Jerseys',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Layered tops',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Turtlenecks',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Tuxedo shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Camp shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Cardigans',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Boxer briefs',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Safety shirts',
                            selected:false,
                            count:1081,
                            url:''
                        },
                        {
                            label:'Shells',
                            selected:false,
                            count:1081,
                            url:''
                        }
                    ]
                },
            ],
            Products:[
                {
                    index:1,
                    Name:'The Foundry Big & Tall Supply Co. Mens Long Sleeve Button-Front Shirt Big and Tall',
                    PrimImg:{
                        link:'https://s7d4.scene7.com/is/image/JCPenney/DP0712201911013905M.tif?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2',
                        alttxt:'Primary Image'
                    },
                    skuImg:[
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        }
                    ],
                    Maxprice:10,
                    Minprice:2,
                    Marketinglabel:'Buy One & Get One.',
                    productLink:'https://www.jcpenney.com/p/the-foundry-big-tall-supply-co-mens-long-sleeve-button-front-shirt-big-and-tall/ppr5007856448?pTmplType=regular&deptId=dept20000014&catId=cat100240025&urlState=%2Fg%2Fmen%2Fmens-shirts%3Fitem_type%3Dbutton-front%2Bshirts%26view%3Dgrid%26id%3Dcat100240025&sort=BS&productGridView=medium&badge=onlyatjcp'
                },
                {
                    index:2,
                    Name:'The Foundry Big & Tall Supply Co. Mens Long Sleeve Button-Front Shirt Big and Tall',
                    PrimImg:{
                        link:'https://s7d4.scene7.com/is/image/JCPenney/DP0712201911013905M.tif?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2',
                        alttxt:'Primary Image'
                    },
                    skuImg:[
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        }
                    ],
                    Maxprice:10,
                    Minprice:2,
                    Marketinglabel:'Buy One & Get One.',
                    productLink:'https://www.jcpenney.com/p/the-foundry-big-tall-supply-co-mens-long-sleeve-button-front-shirt-big-and-tall/ppr5007856448?pTmplType=regular&deptId=dept20000014&catId=cat100240025&urlState=%2Fg%2Fmen%2Fmens-shirts%3Fitem_type%3Dbutton-front%2Bshirts%26view%3Dgrid%26id%3Dcat100240025&sort=BS&productGridView=medium&badge=onlyatjcp'
                },
                {
                    index:3,
                    Name:'The Foundry Big & Tall Supply Co. Mens Long Sleeve Button-Front Shirt Big and Tall',
                    PrimImg:{
                        link:'https://s7d4.scene7.com/is/image/JCPenney/DP0712201911013905M.tif?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2',
                        alttxt:'Primary Image'
                    },
                    skuImg:[
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        }
                    ],
                    Maxprice:10,
                    Minprice:2,
                    Marketinglabel:'Buy One & Get One.',
                    productLink:'https://www.jcpenney.com/p/the-foundry-big-tall-supply-co-mens-long-sleeve-button-front-shirt-big-and-tall/ppr5007856448?pTmplType=regular&deptId=dept20000014&catId=cat100240025&urlState=%2Fg%2Fmen%2Fmens-shirts%3Fitem_type%3Dbutton-front%2Bshirts%26view%3Dgrid%26id%3Dcat100240025&sort=BS&productGridView=medium&badge=onlyatjcp'
                },
                {
                    index:4,
                    Name:'The Foundry Big & Tall Supply Co. Mens Long Sleeve Button-Front Shirt Big and Tall',
                    PrimImg:{
                        link:'https://s7d4.scene7.com/is/image/JCPenney/DP0712201911013905M.tif?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2',
                        alttxt:'Primary Image'
                    },
                    skuImg:[
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        },
                        {
                            alttxt:'Red',
                            img:'https://s7d1.scene7.com/is/image/JCPenney/DP0712201911013928S.jpg?wid=20&hei=20&op_usm=.4,.8,0,0&resmode=sharp2'
                        }
                    ],
                    Maxprice:2,
                    Minprice:2,
                    Marketinglabel:'Buy One & Get One.',
                    productLink:'https://www.jcpenney.com/p/the-foundry-big-tall-supply-co-mens-long-sleeve-button-front-shirt-big-and-tall/ppr5007856448?pTmplType=regular&deptId=dept20000014&catId=cat100240025&urlState=%2Fg%2Fmen%2Fmens-shirts%3Fitem_type%3Dbutton-front%2Bshirts%26view%3Dgrid%26id%3Dcat100240025&sort=BS&productGridView=medium&badge=onlyatjcp'
                }
            ],
            sortOption:[
                'Featured',
                'Arrivals',
                'Best Sellers',
                'Price L-H',
                'Price H-L',
                'Rating H-L'
            ]
        }
        this.onClick = this.onClick.bind(this);
        this.selectLabel=this.selectLabel.bind(this);
    }

    onClick(e){
        this.setState({'sort':e.target.value})
        console.log('==> '+ e.target.value)
    }
    selectLabel(e){
        console.log('==> '+ e.target.checked)
    }

    render() {
        return (
            <div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-12">
                        <br />
                        <h1>{this.state.CategoryName}</h1>
                        <br />
                    </div>
                </div>
                <div className="row justify-content-md-center" style={{paddingBottom:'5px'}}>
                    <div className="col col-lg-9" style={{textAlign:"left"}}>
                        {this.state.ProductCount} products found.
                    </div>
                    <div className="col col-lg-3" style={{textAlign:"right"}}>
                        <div className="btn-group">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                               Sort : {this.state.sort}
                            </button>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                                {this.state.sortOption.map((e,i)=>{
                                    return <button className="dropdown-item" type="button" value={e} onClick={this.onClick} key={i}>{e}</button>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-2" style={{textAlign:"left"}}>
                        <div className="card"  style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                                {this.state.Dim.sort((a,b)=>a.index>b.index).map((e,i)=>{
                                    return <section key={i}>
                                        <div style={{margin:'0', borderBottom:'1px solid'}}>
                                            <a data-toggle="collapse" href={"#collapseExample"+i} role="button" aria-expanded="false" aria-controls={"collapseExample"+i} style={{textDecoration:'none'}}>
                                                <div style={{width: '100%', textAlign: 'start', fontWeight: 'bolder', color: 'black', marginLeft: '0.5rem'}}>{e.dimName}</div>
                                            </a>
                                        </div>
                                        <div className="collapse" id= {"collapseExample"+i}>
                                            <div className='dim-div'>
                                        {e.dimVal.map((dval,j)=>{
                                            return <div className="card" key={j}>
                                                    <ul className="list-group">
                                                        <li className="list-group-item " style={{padding:'0'}}>
                                                            {dval.selected?
                                                                <input id={"inputcheckbox_"+i+"_"+j} type="checkbox" aria-label="Checkbox for following text input" className="inputDim" style={{display: 'none'}} value={dval.url} checked onClick={this.selectLabel}/>
                                                                :
                                                                <input id={"inputcheckbox_"+i+"_"+j} type="checkbox" aria-label="Checkbox for following text input" className="inputDim" style={{display: 'none'}} value={dval.url} onClick={this.selectLabel}/>
                                                            }
                                                            <label htmlFor={"inputcheckbox_"+i+"_"+j} data-automation-id="checkboxLabel-label" className="labelDim" style={{paddingLeft:'40px', color: '#333', cursor: 'pointer', display: 'block', position: 'relative', width: '100%'}} >
                                                                <div className="vKbSM">
                                                                    <div className="S4r8p">
                                                                        <span className="_2Nonk">{dval.label}</span>
                                                                        <span className="r4hap">({dval.count})</span>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </div> 
                                            })}
                                            </div>
                                        </div>
                                    </section>
                                })}
                        </div>
                    </div>
                    <div className="col col-lg-10" style={{textAlign:"right", padding:'0'}}>
                        <ul className="list-group" style={{display:'flex', flexWrap:'wrap', flexDirection:'inherit'}}>
                            {this.state.Products.sort((a,b)=>a.index>b.index).map((e,i)=>{
                                return <li style={{listStyle:'none', margin:'5px', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} key={i}>
                                <div className="card" style={{width: '18rem', textAlign:'justify'}}>
                                    <img src={e.PrimImg.link} className="card-img-top" alt={e.PrimImg.alttxt}/>
                                    <div className="card-body">
                                        <div>
                                            <ul style={{display:'flex', flexWrap:'wrap', flexDirection:'inherit'}}>
                                                {e.skuImg.map((f,j)=>{
                                                    return <li style={{listStyle:'none', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)', padding:'5px'}} key={j}>
                                                        <img src={f.img} alt={f.alttxt}/>
                                                    </li>
                                                })}
                                                
                                            </ul>
                                        </div>
                                        <h5 style={{textAlign:'center'}}>{e.Maxprice===e.Minprice?"$"+e.Minprice:"$"+e.Maxprice+" - $"+e.Minprice}</h5>
                                        <h6 style={{textAlign:'center'}}>{e.Marketinglabel}</h6>
                                        <p className="card-text prod-name">{e.Name}</p>
                                    </div>
                                </div>
                            </li>
                            })}
                        </ul>
                    </div>
                </div>         
                <div className="row justify-content-md-center">
                    <div className="col col-lg-12" style={{textAlign:'end'}}>
                        1,2,3...
                    </div>
                </div>
            </div>
        )
    }
}

export default Categorypage
