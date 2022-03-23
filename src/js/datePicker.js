
class DatePicker{
    constructor({el,weeks}=params){
        this.el = el;
        this.weeks = weeks||["一","二","三","四","五","六","七"];
        this.boxEl = document.createElement("div");
        this.boxEl.setAttribute("contenteditable",false);
        this.boxEl.style.cssText = `
            width:200px;
            background:#ccc;
            position:absolute;
            top:110%;
            left:0;
            z-index:98;
        `;
        
        this.initHandler();//初始化
    }

    initHandler(){
        this.el.appendChild(this.boxEl);//挂载到选择器上
        this.operatorHandler(this.boxEl);
        // this.datePickerHandler(this.boxEl);
    }

    // 月份操作框
    operatorHandler(el){
        let dateBtnBox = document.createElement("div");
        dateBtnBox.style.cssText = `
            border-bottom:1px solid blue;
            display:flex;
            justify-content: space-between;
            align-items:center;
            padding:5px;
        `;

        // 上一个月按钮
        let leftBtn = document.createElement("div");
        leftBtn.style.cssText = `
            display:inline-flex;
            justify-content:center;
            align-items:center;
            cursor:pointer;
        `;
        leftBtn.innerHTML = `<svg t="1648016809624" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2653" width="17" height="17"><path d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z" p-id="2654" fill="#8a8a8a"></path></svg>`;
        leftBtn.addEventListener("click",()=>{
            console.log("上一个月")
        },false);
        dateBtnBox.appendChild(leftBtn);

        // 当前月份
        let currentDateDom = document.createElement("div");
        currentDateDom.style.cssText = `
            user-select: none;        
        `;
        currentDateDom.innerText = "2022-03-23";
        dateBtnBox.appendChild(currentDateDom);

        // 下一个月按钮
        let rightBtn = document.createElement("div");
        rightBtn.style.cssText = `
            display:inline-flex;
            justify-content:center;
            align-items:center;
            cursor:pointer;
        `;
        rightBtn.innerHTML = `<svg t="1648016758276" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2205" width="17" height="17"><path d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z" p-id="2206" fill="#8a8a8a"></path></svg>`;
        rightBtn.addEventListener("click",()=>{
            console.log("下一个月")
        },false);
        dateBtnBox.appendChild(rightBtn);
        el.appendChild(dateBtnBox);
        this.dateWeeksHandler(el,this.weeks);
    }

    // 创建周几
    dateWeeksHandler(el,weeks){
        let weekDom = document.createElement("div");
        weekDom.style.cssText = `
            display:flex;
            margin:3px 0;
        `;
        weeks.forEach(item=>{
            let temporaryDom = document.createElement("span");
            temporaryDom.style.cssText = `
                flex:1 1;
                color:#005831;
                display:inline-flex;
                justify-content:center;
                align-items:center;
                font-weight:600;
            `;
            temporaryDom.textContent = item;
            weekDom.appendChild(temporaryDom)
        });
        el.appendChild(weekDom);
        this.datePickerHandler(el,new Date().getMonth()+1)
    }

    datePickerHandler(el,month){
        console.log(el,month)
        let datePickerBox = document.createElement("div");
        datePickerBox.style.cssText = `
            border:1px solid green;
            height:180px;
        `;
        el.appendChild(datePickerBox)
    }
}
