import React from 'react';
import CommonUtil from "@core/tool";
import propTypes from 'prop-types';
import './index.scss';
import $ from "jquery";

class Input extends React.Component{
    constructor(props){
        super(props);
        this._idSeed = CommonUtil._idSeed.newId();
        this._validataType = "input";
        this._label = this.props.label?this.props.label:"";
        this.state={
            focus:this.props.value?true:false
        };
    }
    init(){
        
    }
    componentDidMount(){
        this.init();
    }
    changeValue(event){
        this.setState({
            value:event.target.value
        });
        if(this.props.value != "" && this.props.value != undefined){
            this.setState({
                focus:true,
            })
            this.props.change(event);
        }else{
            this.setState({
                focus:false,
            })
            this.props.change(event);
        }
        return event;
    }
    focusHandler(event){
        this.setState({
            focus:true,
        });
    }
    blurHandler(event){
        if(this.props.value){
            this.setState({
                focus:true
            })
        }else{
            this.setState({
                focus:false
            })
        }
    }
    //清除
    doClear(e){
        e.target.value = "";
        document.getElementById("input_"+this._idSeed).focus();
        this.changeValue(e);
    }
    //设置
    setValue(e,focus){
        this.setState({
            value:e.target.value,
            focus:focus
        })
        return e;
    }
    //获取
    getValue(){
        return this.props.value;
    }

    setFocus(){
        document.getElementById("input_"+this._idSeed).focus();
    }

    render(){
        // const {disabled,label,value,placeholder} = this.props;
        // return (
        //     <div className="le_input_ui">
        //         <label htmlFor={"input_"+this._idSeed} className="le_input_label">{label}</label>
        //         <input onFocus={()=>{console.log(111)}} onBlur={()=>{console.log(222)}} onChange={this.change.bind(this)} id={"input_"+this._idSeed} type="text" value={value}></input>
        //     </div>
        // )
        console.log(this.state.focus)
        return (<div className={`input_group ${this.state.focus?"focus":""}`}>
            <div className="input_control">
                <div className="input_slot">
                    <div className="text_field">
                        <label>{this._label}</label>
                        <input 
                            id={"input_"+this._idSeed}
                            onChange={this.changeValue.bind(this)} 
                            placeholder={this.state.focus==true?this.props.placeholder:""} 
                            value={this.props.value} type="text" 
                            onFocus={()=>this.focusHandler()} 
                            onBlur={()=>this.blurHandler()}/>
                        {
                            (!this.state.focus || !this.props.value) ? '' :
                            <i onClick={(e) => this.doClear(e)} className='input_icon_close'></i>
                        }
                    </div>
                </div>
                <div className="input_detail"></div>
            </div>
        </div>)
    }
}

export default Input;

Input.defaultProps = {
    disabled: false,
    tips:"",
    errorMessage:"",
    placeholder:"",
    label:"",
    value:"",
    reg:"",
}
Input.propTypes = {
    disabled: propTypes.bool,
    tips: propTypes.string,
    errorMessage: propTypes.string,
    placeholder: propTypes.string,
    label: propTypes.string,
    value: propTypes.string,
    reg: propTypes.string
}