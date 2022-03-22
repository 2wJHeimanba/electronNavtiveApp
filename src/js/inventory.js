const path = require("path")
const tool = require("child_process");

class Inventory{
    constructor({el,data,eachBox}=params){
        this.el = document.querySelector(el);
        this.eachBox = eachBox;
        this.data = data;
        this.initHandler();
    }
    // 初始化
    initHandler(){
        this.data.forEach((item,index)=>this.createParentDomHandler(item,index!==0));
        this.createBtnHandler();//创建新增按钮
        this.watch();//监听dom变化
    }

    // 创建dom节点
    createDomHandler(item,bool=true){
        let son = document.createElement("div");
        son.className = "single-item"
        bool&&son.setAttribute("contenteditable","true");
        son.setAttribute("column",item.column);
        son.setAttribute("row",item.row);
        son.setAttribute("note",item.note);
        "amount" in item && son.setAttribute("amount",item.amount);
        if(item.note=="单位"){
            son.style.cssText = `max-width:60px;`
        }else if(["入库","出库","库存","日期","收款金额"].includes(item.note)){
            son.style.cssText = `max-width:100px;`
        }
        son.innerText = item.data;
        return son
    }

    // 创建父节点
    createParentDomHandler(item,bool=true){
        let parentDom = document.createElement("div");
        parentDom.className = "single-row"
        item.forEach((val,index)=>parentDom.appendChild(this.createDomHandler(val,index===0?false:bool)))
        this.el.appendChild(parentDom)
    }

    // 创建新增按钮
    createBtnHandler(){
        let btnBox = document.createElement("div");
        btnBox.style.cssText = `
            margin-top:5px;
            text-align:right;
        `
        let btn = document.createElement("button");
        btn.innerText = "新增一行数据";
        btn.style.cssText = `
            cursor:pointer;
        `
        btn.addEventListener("click",()=>{
            let temporaryArr = JSON.parse(JSON.stringify(this.data[this.data.length-1]));
            temporaryArr = temporaryArr.map((item,index)=>{
                item.data = index===0? Number.parseInt(item.data) + 1:""
                item.row = item.row + 1;
                if(item.note=="单位"){
                    item.data = "瓶"
                }
                return item
            });
            this.data.push(temporaryArr);
            this.createParentDomHandler(temporaryArr)
        });
        btnBox.appendChild(btn);
        document.body.insertBefore(btnBox,document.body.children.item(2));
    }

    // 监听节点变化
    watch(){
        const observer = new MutationObserver(mutationsList=>{
            if(mutationsList[0].target.parentNode){
                let typeStr = Object.prototype.toString.call(mutationsList[0].target).slice(8,-1);
                if(typeStr=="HTMLDivElement"){
                    this.autoFillHandler(mutationsList[0].target)
                }else{
                    this.autoFillHandler(mutationsList[0].target.parentNode)
                }
            }else{
                let typeStr = Object.prototype.toString.call(mutationsList[1].target.parentNode).slice(8,-1);
                if(typeStr=="HTMLDivElement"){
                    console.log(3)
                    this.autoFillHandler(mutationsList[1].target)
                }else{
                    console.log(4)
                    this.autoFillHandler(mutationsList[1].target.parentNode)
                }
            }
        });
        observer.observe(this.el,{
            childList:true,
            subtree:true,
            characterData:true,
        });
        // observer.disconnect();
    }

    // 数据处理
    autoFillHandler(dom){
        let temporaryArr = ["单位","入库","出库"];
        let key = dom.getAttribute("note");
        if(!temporaryArr.includes(key)) return;
        let previousElementChild = Array.from(dom.parentNode.previousSibling.children);
        // 库存
        let previouAmount = previousElementChild.filter(item=>item.getAttribute("note")=="库存")[0].getAttribute("amount");
        this.changeInventoryHandler(dom.parentNode,Number.parseInt(previouAmount));//更新数据
    }

    // 查找子节点
    findDomHandler(parentDom,sonStr){
        return [...parentDom.children].filter(item=>item.getAttribute("note")==sonStr)[0]
    }

    // 当前修改元素的父节点，上一条数据的库存
    changeInventoryHandler(parentDom,previouInventory){
        let unit = this.findDomHandler(parentDom,"单位"),
            push = this.findDomHandler(parentDom,"入库"),
            pull = this.findDomHandler(parentDom,"出库"),
            inventory = this.findDomHandler(parentDom,"库存");
        let result = 0;
        let showRes = "";
        if(unit.textContent=="件"){
            result = previouInventory + (Number.parseInt(push.textContent||0)*this.eachBox) - (Number.parseInt(pull.textContent||0)*this.eachBox);
        }else if(unit.textContent=="瓶"){
            result = previouInventory + Number.parseInt(push.textContent||0) - Number.parseInt(pull.textContent||0);
        }else{
            result = previouInventory
        }
        if(Math.floor(result/this.eachBox)&&result%this.eachBox){
            showRes = `${Math.floor(result/this.eachBox)}+${result%this.eachBox}`
        }else if(Math.floor(result/this.eachBox)&&!(result%this.eachBox)){
            showRes = `${Math.floor(result/this.eachBox)}`
        }else if((result%this.eachBox)&&!(Math.floor(result/this.eachBox))){
            showRes = `${result%this.eachBox}`
        }else{
            showRes = "0"
        }
        inventory.setAttribute("amount",result);
        inventory.textContent = showRes
    }
}

;(function(){
    // tool.exec("cd src/tools && main.exe",function(err,res){
    tool.exec(path.join(__dirname,"../tools/main.exe"),function(err,res){
        if(err){
            console.log("获取数据失败",err)
            return
        }
        let temporaryArr = JSON.parse(res);
        let eachBox = 24;
        temporaryArr = temporaryArr.map(item=>{
            return item.map(val=>{
                if(val.note=="库存"){
                    if(val.data.includes("+")){
                        let temporary_arr = val.data.split("+").map(result=>Number.parseInt(result));
                        val.amount = temporary_arr[0]*eachBox + temporary_arr[1]
                    }else{
                        val.amount = Number.parseInt(val.data) * eachBox
                    }
                }
                return val
            })
        });
        new Inventory({
            el:"#inventory",
            data:temporaryArr,
            eachBox:eachBox,
        });

        document.getElementById("save").addEventListener("click",function(){
            console.log(document.getElementById("inventory"))
        });
    })
})()
