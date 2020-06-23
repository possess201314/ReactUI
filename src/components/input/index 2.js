import React from 'react';
import "./index.scss";
export default class extends React.Component{
    constructor(){
        super();
        this.state = {
            focus:false
        }
    }
    focusHandler(){
        this.setState({
            focus:this.state.focus?false:true
        })
    }
    render(){
        return (<div className={`input_group ${this.state.focus?"focus":""}`}>
            <div className="input_control">
                <div className="input_slot">
                    <div className="text_field">
                        <label>Main input</label>
                        <input type="text" onFocus={()=>this.focusHandler()} onBlur={()=>this.focusHandler()}/>
                    </div>
                </div>
                <div className="input_detail"></div>
            </div>
        </div>)
    }
}