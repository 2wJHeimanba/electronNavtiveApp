const path = require("path")
const tool = require("child_process");

class Inventory{
    constructor({el,data}=params){
        this.el = document.querySelector(el);
        this.data = data;
        this.initHandler();
    }
    // 初始化
    initHandler(){
        this.createParentDomHandler(this.data)
    }

    // 创建dom节点
    createDomHandler(item){
        let son = document.createElement("div");
        son.className = "single-item"
        let sonIpt = document.createElement("input");
        sonIpt.className = "item-input"
        sonIpt.type = "text";
        sonIpt.value = item.data;
        son.appendChild(sonIpt);
        return son
    }

    // 创建父节点
    createParentDomHandler(box){
        box.forEach(item=>{
            let parentDom = document.createElement("div");
            parentDom.className = "single-row"
            item.forEach(val=>parentDom.appendChild(this.createDomHandler(val)))
            this.el.appendChild(parentDom)
        });
        this.watch();
    }

    // 监听节点变化
    watch(){
        console.log("监听开始")
        const callback = function(mutationsList,oberver){
            console.log(mutationsList,oberver);
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                }
                else if (mutation.type === 'attributes') {
                    console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
            }
        }
        console.log(this.el)
        const observer = new MutationObserver(callback);
        observer.observe(document.body,{
            attributes:true,
            childList:true,
            subtree:true,
            // characterData:true,
            // attributeOldValue:true,
            // attributeFilter:["value"],
        });
        observer.disconnect();
        
    }
}

;(function(){
    // tool.exec("cd src/tools && main.exe",function(err,res){
    tool.exec(path.join(__dirname,"../tools/main.exe"),function(err,res){
        if(err){
            console.log("获取数据失败",err)
            return
        }

        new Inventory({
            el:"#inventory",
            data:JSON.parse(res)
        })
    })
})()
