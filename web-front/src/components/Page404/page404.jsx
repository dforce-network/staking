import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import './404.scss'
class page404 extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className={"warp"}>
            <h1>404</h1>
            <div>您访问的页面不存在！请返回首页！</div>
            <button onClick={()=>this.props.history.push('/')}>返回首页</button>
        </div>
        )
    }
}

export default withRouter(page404)