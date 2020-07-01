import React from "react";
import CommonUtil from "@core/tool.js";
import PropTypes from "prop-types";
import "./index.scss";

class LeRadio extends React.Component{
    constructor(props){
        super(props);
        this._id = CommonUtil._idSeed.newId();
        this._type = "radio";
        this._data = [];
        this.state = {
            data:[],
            disabled:false
        }
    }

    getRadioItem(){
        const listItem = [];
        this.state.data.map(x=>{
            console.log(x)
            listItem.push(
                <div className="Le_radio_ui" key={x._tmpId} id={x._tmpId}>
                    <label>{x[this.props.displayName]}</label>
                    <span><input name={this._id} type="radio" checked={x._ck} onChange={()=>{this.changeItem(x)}}></input>{x[this.props.displayValue]}</span>
                </div>
            )
        })
        return listItem;
    }
    /*************** 生命周期 begin *****************/
    componentWillReceiveProps(props){

    }
    componentDidMount(){
        
    }
    shouldComponentUpdate(props,next){
        if(next.data.length == 0){
            return false;
        }
        return true;
    }
    /*************** 生命周期 end *****************/


    /*************** Event begin *****************/
    changeItem=(item)=>{
        item._ck = !item._ck;
        let items = this.getCheckedItems();
        this.props.change && this.props.change(items);
        this.setState({
            data:this.state.data
        })
    }
    /*************** Event end *****************/


    /*************** Methods begin *****************/
    init(data){
        this._data = data;
        let cloneData = CommonUtil.comp.cloneObj(data);
        let tmp = CommonUtil.comp.addPrimaryAndCk(cloneData);
        this.setState({
            data:tmp
        })
    }

    setDisabled(flag){
        this.setState({
            disabled:flag
        })
    }

    getCheckedItems(){
        let res = CommonUtil.comp.getCheckedItems(this.state.data,this.props.displayValue);
        return res;
    }

    setCheckedItems(idx){
        this.state.data.forEach(x=>{
            let itemVal = x[this.props.displayValue];
            if(!x._ck){
                idx && idx.split && idx.split(',') && idx.split(',').forEach(id=>{
                    if(id == itemVal){
                        x._ck = true;
                    }
                })
            }
        })
        this.setState({
            data:this.state.data
        })
    }

    getItemByField(field,value){
        return CommonUtil.comp.getItemByField(this.state.data,field,value);
    }

    clear(){
        this.state.data.forEach(x=>{
            x._ck = false;
        })
        this.setState({
            data:this.state.data
        })
    }
    render(){
        return this.state.data.length == 0?null:this.getRadioItem();
    }
}
export default LeRadio;

LeRadio.defaultProps = {
    label:"",
    displayName:"",
    displayValue:""
};

LeRadio.propTypes={
    label:PropTypes.string,
    displayName:PropTypes.string,
    displayValue:PropTypes.string,
}