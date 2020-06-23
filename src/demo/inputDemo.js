import React from 'react'
import ReactDom from 'react-dom'
import { LeInput } from "../out"
import "@core/base.scss";

class ParentInp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"",
        }
    }
    componentDidMount () {
   		this.render()
    }
    changeName(e){
        this.setState({
            value:e.target.value,
        })
    }
    render(){
        return (
            <LeInput label="fileName" placeholder="请输入" value={this.state.value} change={this.changeName.bind(this)}/>
        )
    }
}
export default ParentInp;