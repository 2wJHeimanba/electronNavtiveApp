
class DatePicker{
    constructor({el,weeks}=params){
        this.el = el;
        this.currentDate = new Date();
        this.weeks = weeks||["日","一","二","三","四","五","六"];
        this.boxEl = document.createElement("div");
        this.boxEl.setAttribute("contenteditable",false);
        this.boxEl.style.cssText = `
            width:200px;
            position:absolute;
            top:110%;
            left:0;
            z-index:98;
            box-shadow:0 0 12px rgba(0,0,0,0.3);
            border-radius:5px;
            overflow:hidden;
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
            border-bottom:1px solid #08a8a8;
            display:flex;
            justify-content: space-between;
            background-color:#fff;
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
            let temporaryDurrentdate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()-1,this.currentDate.getDate())
            this.currentDate = temporaryDurrentdate;
            const { year,month } = transformDateHandler(temporaryDurrentdate);
            currentDateDom.textContent = `${year}-${String(month+1).padStart(2,"0")}`;
            this.datePickerHandler(el,temporaryDurrentdate)
        },false);
        dateBtnBox.appendChild(leftBtn);

        // 当前月份
        let currentDateDom = document.createElement("div");
        currentDateDom.style.cssText = `
            user-select: none;        
        `;
        const { year,month } = transformDateHandler(this.currentDate);
        currentDateDom.textContent = `${year}-${String(month+1).padStart(2,"0")}`;
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
            let temporaryDurrentdate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()+1,this.currentDate.getDate())
            this.currentDate = temporaryDurrentdate;
            const { year,month } = transformDateHandler(temporaryDurrentdate);
            currentDateDom.textContent = `${year}-${String(month+1).padStart(2,"0")}`;
            this.datePickerHandler(el,temporaryDurrentdate)
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
            background-color:#fff;
        `;
        weeks.forEach(item=>{
            let temporaryDom = document.createElement("span");
            temporaryDom.style.cssText = `
                flex:1 1;
                color:#005831;
                display:inline-flex;
                justify-content:center;
                align-items:center;
                padding:3px 0;
                background-color: rgba(0,0,0,0.08);
                user-select: none;
                font-size: 12px;
            `;
            temporaryDom.textContent = item;
            weekDom.appendChild(temporaryDom)
        });
        el.appendChild(weekDom);
        this.datePickerHandler(el,this.currentDate)
    }

    datePickerHandler(el,date){
        //如果已经存在则删除
        if(el.lastChild.getAttribute("date-picker")){
            el.removeChild(el.lastChild);
        }
        let datePickerBox = document.createElement("div");
        datePickerBox.setAttribute("date-picker",1);
        datePickerBox.style.cssText = `
            height:180px;
            background:#fff;
            box-shadow:0 0 8px rgba(0,0,0,0.15);
            border-radius:5px;
            display: grid;
            grid-template-columns: repeat(7,1fr);
            grid-template-rows:repeat(6,1fr);
            box-shadow:0 0 8px rgba(0,0,0,0.37);
        `;
        const { year,month } = transformDateHandler(date)
        let firstDay=new Date(year,month,1);
        let weeks=firstDay.getDay();//获取每个月的第一天
        if(weeks===0) weeks=7;
        let firstDate=firstDay-weeks*24*60*60*1000;
        let arr=Array(42).fill("").map((item,index)=>new Date(firstDate + index*24*60*60*1000));
        arr.forEach(item=>{
            let temporarySpan = document.createElement("span");
            temporarySpan.style.cssText = `
                display:inline-flex;
                justify-content:center;
                align-items:center;
                
            `;
            const { month:temporaryMonth } = transformDateHandler(item);//当前月份
            // 鼠标进入
            temporarySpan.addEventListener("mouseenter",(e)=>{
                if(month==temporaryMonth){//当月的
                    e.target.style.cssText = e.target.style.cssText + "background-color:#08a8a8;border-radius:5px;color:#fff;cursor:pointer;"
                }else{
                    e.target.style.cssText = e.target.style.cssText + "cursor:not-allowed;"
                }
            },false);
            // 鼠标离开
            temporarySpan.addEventListener("mouseleave",(e)=>{
                if(month==temporaryMonth){
                    e.target.style.cssText = e.target.style.cssText + "background-color: initial;color:initial;"
                }
            },false);
            // 点击
            temporarySpan.addEventListener("click",(e)=>{
                if(month==temporaryMonth){
                    this.el.firstChild.textContent = e.target.getAttribute("date");
                    this.el.blur();//失去焦点 
                }
            },false);

            temporarySpan.textContent = item.getDate();//展示的日期
            temporarySpan.setAttribute("date",transformDate(item));//存储日期
            if(this.el.firstChild.textContent==transformDate(item)){
                temporarySpan.style.cssText = temporarySpan.style.cssText+`border:1px solid #08a8a8;border-radius:5px;`
            }
            // 不是当前月份的日期样式
            if(month!=temporaryMonth){
                temporarySpan.style.cssText = temporarySpan.style.cssText+`color:#77787b;`
            }
            datePickerBox.appendChild(temporarySpan)
        })
        el.appendChild(datePickerBox)
    }
}

function transformDate(date){
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
}

function transformDateHandler(date){
    return {
        year:date.getFullYear(),
        month:date.getMonth(),
        day:date.getDate(),
    }
}