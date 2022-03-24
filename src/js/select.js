

const createSelect = function({el,select}=params){
    let box = document.createElement("div");
    box.setAttribute("contenteditable",false)
    box.style.cssText = `
        box-shadow:0 0 5px rgba(0,0,0,0.2),
                   0 0 3px rgba(0,0,0,0.2) inset;
        width:100px;
        position:absolute;
        top:110%;
        left:0;
        background:#fff;
        z-index:99;
        border-radius:0 7px 0 7px;
        overflow:hidden;
    `;
    select.forEach(item=>{
        let tempraryDom = document.createElement("div");
        tempraryDom.innerText = item;
        tempraryDom.style.padding = `3px 6px`;
        tempraryDom.style.cursor = "pointer";
        tempraryDom.addEventListener("mouseenter",(e)=>{
            e.target.style.backgroundColor = "rgba(0,0,0,0.08)"
        });
        tempraryDom.addEventListener("mouseleave",(e)=>{
            e.target.style.backgroundColor = "initial"
        });
        tempraryDom.addEventListener("click",()=>{
            el.firstChild.textContent = item;
            el.blur();
        },false)
        box.appendChild(tempraryDom)
    })
    el.appendChild(box)
}
