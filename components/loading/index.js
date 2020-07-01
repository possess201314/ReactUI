
import "./index.scss";
import Tool from "@core/tool.js";
import $ from "jquery";

let _global_loading = {
    show(){
        let zIndex = Tool._idSeed.newId();
        let _parentDiv = $("<div style='z-index:"+zIndex+";' id = 'global_loading_mask'></div>");
        let _html = "<div class = 'le_loadingBox'>"
        _html += "<div class = 'mask_icon'></div>"
        _html += "<div class = 'loadingMsg'>" + "loading……" + "</div>"
        _html += "</div>"
        $(_parentDiv).append($(_html));
        if( $("#global_loading_mask").length > 0){
            $("#global_loading_mask").show();
        }else{
            $("body").append($(_parentDiv));
            $("#global_loading_mask").show();
        }
    },
    hide(){
        $("#global_loading_mask").hide();
    }
}   
export default _global_loading;