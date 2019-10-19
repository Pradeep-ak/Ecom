import React, {Component} from 'react'

import Phoneicon from '../../svg/phoneicon.svg'
import Sendmailicon from '../../svg/send-mail.svg'
import CustomerServiceicon from '../../svg/customer-service.svg'
import twittericon from '../../svg/twitter.svg'

class Sitefooter extends Component{
    render(){
        return(
            <div style={{paddingTop:'30px'}}>
               <div className="row justify-content-md-center" style={{background: 'black'}}>
               <ul className="list-group list-group-horizontal-sm" style={{font:'normal 12px/16px Open Sans,arial,sans-serifcc', paddingTop: '30px', paddingBottom: '30px'}}>
                    <li className="list-group-item">
                        <a href="tel:+919900112233" style={{color:'black', textDecoration: 'none'}}>
                            <img src={Phoneicon} style={{width:'20px', height:'20px'}} alt=""/>
                            <span data-automation-id="help-sectiontext-block">
                                <span style={{display:'block'}}>Give us a call </span>
                                <strong data-automation-id="help-text-0" className="_3qnsk">1-800-322-1189</strong>
                            </span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="mailto:pradeep4jobs@gmail.com" style={{color:'black', textDecoration: 'none'}}>
                            <img src={Sendmailicon} style={{width:'20px', height:'20px'}} alt=""/>
                            <span data-automation-id="help-sectiontext-block">
                                <span style={{display:'block'}}>Send us an email</span>
                                <strong data-automation-id="help-text-0" className="_3qnsk">pradeep4jobs@gmail.com</strong>
                            </span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <img src={CustomerServiceicon} style={{width:'20px', height:'20px'}} alt=""/>
                        <span data-automation-id="help-sectiontext-block">
                            <span style={{display:'block'}}>Need help?</span>
                            <strong data-automation-id="help-text-0" className="_3qnsk">Customer Service</strong>
                        </span>
                    </li>
                    <li className="list-group-item">
                        <a href="#" style={{color:'black', textDecoration: 'none'}}>
                            <img src={twittericon} style={{width:'20px', height:'20px'}} alt=""/>
                            <span data-automation-id="help-sectiontext-block">
                                <span style={{display:'block'}}>Ask us on Twitter</span>
                                <strong data-automation-id="help-text-0" className="_3qnsk">@askPKEcom</strong>
                            </span>
                        </a>
                    </li>
                </ul>
               </div>
          </div>
        )
    }
}

export default Sitefooter
