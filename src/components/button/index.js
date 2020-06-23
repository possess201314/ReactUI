import React from 'react';
import "./index.scss";

export default class extends React.Component{
    constructor(props){
        super(props);
        this.state={
            disabled:false
        }
    }
    componentDidMount(){
        this.refs.button.addEventListener('click',function(e){
            let x = e.offsetX;
            let y = e.offsetY;
            let ripples = document.createElement("span");
            ripples.classList.add("_ripples")
            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            e.target.appendChild(ripples);
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        })
    }
    handClick(){
        console.log("click事件执行了")
    }
    handSubmit(fn,e){
        this.state.disabled = true;
        fn && fn(url).then(res=>{
            this.state.disabled = true;
        }).catch(err=>{
            this.state.disabled = false;
        });
    }
    resetDisabled(){
        this.setState({
            disabled:this.props.disabled?this.props.disabled:false,
        })
    }
    render(){
        return (<button type={this.props.type} ref="button" onClick={this.handClick} onSubmit={(e)=>{this.handSubmit(this,e)}} className={`btn ${this.props.type?this.props.type:""}`}>{this.props.value}</button>)
    }
}