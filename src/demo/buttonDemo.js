import React from 'react'
import ReactDom from 'react-dom'
import { LeButton } from "../out"
import "@core/base.scss";
import { rejects } from 'assert';

class ParentBtn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"",
            type:"",
            iconName:""
        }
    }
    componentDidMount () {
   		this.render()
    }
    submit(){
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:url,
                method:"GET",
                success:function(res){
                    console.log(res.data);
                    resolve(res.data)
                },
                error:function(err){
                    console.log(err);
                    reject(err);
                }
            })
        })
    }
    render(){
        return (
            <div>
                <LeButton type="remove" value="删除" iconName="icon_delete"/>
                <LeButton type="create" value="创建" iconName="icon_create"/>
                <LeButton type="approve" value="审核" iconName="icon_approve"/>
            </div>
        )
    }
}
export default ParentBtn;