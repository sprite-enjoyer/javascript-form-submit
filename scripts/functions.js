const validateField = (
    fieldNode,
    containerNode, 
    validateOnEvent, 
    releaseOnEvent, 
    validatorFunc,
    warningNodeClassName,
    warningText
    ) => {

    fieldNode.addEventListener(validateOnEvent, () => {
        if (document.querySelector(".".concat(warningNodeClassName))) return;
        if (validatorFunc(fieldNode.value)) return;
        const node = document.createElement("span");
        const textNode = document.createTextNode(warningText);
        node.append(textNode);
        node.className = warningNodeClassName;
        node.style.color = "red";
        containerNode.appendChild(node);
    });
    
    fieldNode.addEventListener(releaseOnEvent , () => {
        if (document.querySelector(".".concat(warningNodeClassName)) && validatorFunc(fieldNode.value)){ 
            document.querySelector(".".concat(warningNodeClassName)).remove();
        }
    });
}

const saveFields = (fieldNodes, saveOnEvent, keys) => {
    fieldNodes.forEach((node, i) => {
        node.addEventListener(saveOnEvent, () => localStorage.setItem(keys[i], node.value));
    });
}

const loadFields = (fieldNodes, keys) => {
    keys.forEach((key, i) => {
        fieldNodes[i].value = localStorage.getItem(key);
    })
}

const loadTableData = () => {
    const table = document.querySelector(".table");
    const dataList = [];
    let index = localStorage.getItem("index");
    for (let i = 0; i < parseInt(index); i++){
        let item = localStorage.getItem(i.toString().concat("-data"));
        if (item) dataList.push(JSON.parse(item));
    }

    dataList.forEach(obj => {
        const row = table.insertRow(-1);
        row.style.cursor = "pointer";

        row.addEventListener("click", () => {
            const popup = document.querySelector(".popup");
            const noteContainer = document.querySelector(".note-container");
            const textContainer = document.querySelector(".text-container");
            const textNode = document.createTextNode(obj.comment);
            if (noteContainer.childElementCount <= 2) textContainer.replaceChild(textNode, textContainer.firstChild);
    
            const btn = document.querySelector(".popup-btn");
            btn.addEventListener("click", () => {
                popup.style.visibility = "hidden";
                noteContainer.style.visibility = "hidden";
    
            });
    
            popup.style.visibility = "visible";
            noteContainer.style.visibility = "visible";
        });
    
        let cell = row.insertCell(0);
        let text = document.createTextNode(obj.index);
        cell.appendChild(text);
    
        [obj.name, obj.last, obj.adrss, obj.dateOB, obj.gender].forEach((element, i) => {
            cell = row.insertCell(i + 1);
            text = document.createTextNode(element);
            cell.appendChild(text);
        })
    })
}