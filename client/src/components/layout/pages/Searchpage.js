import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSearchResults } from '../../../action/searchAction'
import { updateSearch } from '../../../action/searchAction'

const SortOption = (data) => {
    return <div className="btn-group">
        <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
        Sort : {data.defaultValue}
        </button>
        <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
            {data.sortValues.map((e,i)=>{
                return <button className="dropdown-item" type="button" value={e} onClick={data.selectOption} key={i}>{e}</button>
            })}
        </div>
    </div>
}

const FilterPanel = (data) => {

    return <div className="card"  style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
    {data.dimValue.sort((a,b)=>a.index>b.index).map((e,i)=>{
        return <section key={i} style={{padding:'3px'}}>
            <div style={{margin:'0', borderBottom:'1px solid'}}>
                <a data-toggle="collapse" href={"#collapseExample"+i} role="button" aria-expanded="false" aria-controls={"collapseExample"+i} style={{textDecoration:'none'}}>
                    <div style={{width: '100%', textAlign: 'start', fontWeight: 'bolder', color: 'black', marginLeft: '0.5rem', textTransform: "capitalize"}}>{e.dimName}</div>
                </a>
            </div>
            <div className="collapse" id= {"collapseExample"+i}>
                <div className='dim-div'>
                    {e.dimVal.map((dval,j)=>{
                        return <div className="card" key={j}>
                                    <ul className="list-group">
                                        <li className="list-group-item " style={{padding:'0'}}>
                                            {dval.selected?
                                                <input id={"inputcheckbox_"+i+"_"+j} type="checkbox" aria-label="Checkbox for following text input" className="inputDim" style={{display: 'none'}} value={dval.url} defaultChecked={dval.selected} onClick={data.updatedSearchFilter}/>
                                                :
                                                <input id={"inputcheckbox_"+i+"_"+j} type="checkbox" aria-label="Checkbox for following text input" className="inputDim" style={{display: 'none'}} value={dval.url} onClick={data.updatedSearchFilter}/>
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
}

const SearchResults = (data) => {

    return <ul className="list-group" style={{display:'flex', flexWrap:'wrap', flexDirection:'inherit'}}>
    {data.products.sort((a,b)=>a.index>b.index).map((e,i)=>{
        return <li style={{listStyle:'none', margin:'5px', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} key={i}>
            <a href={e.productLink} alttxt={e.Name} style={{color:'black', textDecoration: 'none'}}>
                <div className="card" style={{width: '18rem', textAlign:'justify'}}>
                    <img src={e.PrimImg.link} className="card-img-top" alt={e.PrimImg.alttxt}/>
                    <div className="card-body">
                        <div>
                        {e.skuImg.length > 0 &&
                            <ul style={{display:'flex', flexWrap:'wrap', flexDirection:'inherit'}}>
                                {e.skuImg.map((f,j)=>{
                                    return <li style={{listStyle:'none', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)', padding:'5px'}} key={j}>
                                        <img src={f.img} alt={f.alttxt}/>
                                    </li>
                                })}
                            </ul>
                        }
                        </div>
                        {e.IsPirce === true && <span>
                            <h5 style={{textAlign:'center', fontWeight:'bolder'}}>{e.Maxprice===e.Minprice?"$"+e.Minprice:"$"+e.Maxprice+" - $"+e.Minprice}</h5>
                            <h6 style={{textAlign:'center', color:'red', fontWeight:'bolder'}}>{e.Marketinglabel}</h6>
                        </span>
                        }
                        {e.IsPirce === false && <span>
                            <h5 style={{textAlign:'center', fontWeight:'bolder'}}>{e.Minprice}</h5>
                        </span>
                        }
                        <p className="card-text prod-name" style={{fontWeight:'lighter'}}>{e.Name}</p>
                    </div>
                </div>
            </a>
    </li>
    })}
</ul>
}

const PaginationPanel = (data) => {
    var currentPg = '', nextPg='', prevPg='';
    if(data.pgInfo && (data.pgInfo.previousPage || data.pgInfo.nextPage)){
        currentPg = <div style={{float:"right"}}><b>{data.pgInfo.currentPage}</b>,</div>
    }
    if(data.pgInfo && data.pgInfo.nextPage){
        nextPg = <div style={{float:"right"}}><a href={data.pgInfo.nextPageUrl} onClick={data.updatePage}><b>{data.pgInfo.nextPage}</b></a></div>
    }
    if(data.pgInfo && data.pgInfo.previousPage){
        prevPg = <div style={{float:"right"}}><a href={data.pgInfo.previousPageUrl} onClick={data.updatePage}><b>{data.pgInfo.previousPage}</b></a>,</div>
    }
return <span>{nextPg}{currentPg}{prevPg}</span>
}

const SelectPanel = (data) => {
    var removePanal = data.selectedDim.map((e,i)=>{
            return <button key={i} type="button" className="btn btn-success"  style={{marginLeft:"2px", marginRight:"2px", textTransform:"capitalize"}} value={e.removeURL} onClick={data.removeDim} title={e.dimName}>{e.dimVal} X</button>
        })
    return <span>{removePanal}</span>
}

class Searchpage extends Component {
    constructor(){
        super()
        this.state = {}
        this.onClick = this.onClick.bind(this);
        this.selectLabel=this.selectLabel.bind(this);
        this.onUpdatePage = this.onUpdatePage.bind(this);
        this.removeDim = this.removeDim.bind(this);
    }

    onClick(e){
        // this.setState({'sort':e.target.value})
        console.log('==> '+ e.target.value)
    }

    removeDim(e){
        e.preventDefault();
        this.props.updateSearch(e.target.value, this.props.history);
    }

    onUpdatePage(e){
        e.preventDefault();
        let path = e.target.parentElement.getAttribute('href');
        this.props.updateSearch(path, this.props.history);
    }

    selectLabel(e){
        // console.log('==> '+ e.target.checked)
        this.props.updateSearch(e.target.value, this.props.history);
    }

    componentDidMount = ()=> {
        this._asyncRequest = fetchSearchResults(this.props.location).then(
            externalData => {
              this._asyncRequest = null;
            //   console.log(externalData)
              if(externalData.data.REDIRECT_URL != null){
                this.props.history.push(externalData.data.REDIRECT_URL)
              } else {
                this.setState(externalData.data);
              }
            }
          );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
    }

    componentWillReceiveProps = nextProps => {
        // console.log('search page : ' + nextProps.search)
        this.setState(nextProps.search);
    }


    render() {
        var isSearchEmpty = Object.keys(this.state).length > 0;
        return ( isSearchEmpty &&
            <div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-12">
                        <br/>
                        <h1 style={{textTransform: "capitalize"}}>{this.state.SearchTerm}</h1>
                        <br/>
                    </div>
                </div>
                {this.state.ProductCount===0 && <div className="row justify-content-md-center" style={{paddingBottom:'5px'}}>
                    <div className="col col-lg-9" style={{textAlign:"justify"}}>
                        No Products found for <b style={{textTransform: "capitalize"}}>{this.state.SearchTerm}</b>.
                    </div>
                </div>}


                {this.state.ProductCount > 0 && <span>
                <div className="row justify-content-md-center" style={{paddingBottom:'5px'}}>
                    <div className="col col-lg-2" style={{textAlign:"left"}}>
                        {this.state.ProductCount} products found.
                    </div>
                    <div className="col col-lg-7" style={{textAlign:"left"}}>
                        <SelectPanel selectedDim={this.state.selectedDim} removeDim={this.removeDim}/>
                    </div>
                    <div className="col col-lg-3" style={{textAlign:"right"}}>
                        <SortOption defaultValue={this.state.sort} sortValues={this.state.sortOption} selectOption={this.onClick}/>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-2" style={{textAlign:"left"}}>
                        <FilterPanel dimValue={this.state.Dim} updatedSearchFilter={this.selectLabel}/>
                    </div>
                    <div className="col col-lg-10" style={{textAlign:"right", padding:'0'}}>
                        <SearchResults products={this.state.Products}/>
                    </div>
                </div>         
                <div className="row justify-content-md-center">
                    <div className="col col-lg-12" style={{textAlign:'end'}}>
                        <PaginationPanel pgInfo={this.state.paginationInfo} updatePage={this.onUpdatePage}/>
                    </div>
                </div></span>}
            </div>
        )
        
    }
}

function mapStateToProps(state){
     return {search:state.search};
}

export default withRouter(connect(mapStateToProps, {updateSearch})(Searchpage));
