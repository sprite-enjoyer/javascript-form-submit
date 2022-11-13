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
};

const saveFields = (fieldNodes, saveOnEvent, keys) => {
    fieldNodes.forEach((node, i) => {
        node.addEventListener(saveOnEvent, () => localStorage.setItem(keys[i], node.value));
    });
};

const loadFields = (fieldNodes, keys) => {
    keys.forEach((key, i) => {
        fieldNodes[i].value = localStorage.getItem(key);
    })
};

const addRow = (i, fn, ln, ad, date, sx, note, table, incrementIndex) => {

    if (incrementIndex && 
        (!firstAndLastNameValidator(fn) || !firstAndLastNameValidator(ln) || !addressValidator(ad))) return;
    
    const row = table.insertRow(-1);
    row.style.cursor = "pointer";

    if (incrementIndex){
        if (!localStorage.getItem("index")) localStorage.setItem("index", "-1");
        localStorage.setItem("index", (parseInt(localStorage.getItem("index")) + 1).toString());
        const objToSave = {
            index: parseInt(localStorage.getItem("index")),
            name: fn,
            last: ln,
            adrss: ad,
            dateOB: date,
            gender: sx,
            comment: note,
        }
    
        localStorage.setItem(localStorage.getItem("index").concat("-data"), JSON.stringify(objToSave));
    }

    row.addEventListener("click", (e) => {
        if (e.target === button) return;
        const popup = document.querySelector(".popup");
        const noteContainer = document.querySelector(".note-container");
        const textContainer = document.querySelector(".text-container");
        const textNode = document.createTextNode(note);
        
        if (noteContainer.childElementCount <= 2) textContainer.replaceChild(textNode, textContainer.firstChild);

        const btn = document.querySelector(".popup-btn");
        btn.addEventListener("click", () => {
            popup.style.visibility = "hidden";
            noteContainer.style.visibility = "hidden";

        });

        popup.style.visibility = "visible";
        noteContainer.style.visibility = "visible";
    });

    const index = incrementIndex ? parseInt(localStorage.getItem("index")) : i;
    let cell = row.insertCell(0);
    let text = document.createTextNode(index);
    cell.appendChild(text);

    [fn, ln, ad, date, sx].forEach((element, i) => {
        cell = row.insertCell(i + 1);
        text = document.createTextNode(element);
        cell.appendChild(text);
    });

    cell = row.insertCell(6);
    const button = document.createElement("button");
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    button.style.border = "1px solid black";
    button.style.width = "23px";
    button.style.height = "23px";

    text = document.createTextNode("X");
    button.appendChild(text);
    cell.appendChild(button);

    button.addEventListener("click", () => {
        localStorage.removeItem(index.toString().concat("-data"));
        row.remove();
    });

};

const loadTableData = () => {
    const dataList = []; 
    for (let i = 0; i < parseInt(localStorage.getItem("index")) + 1; i++){
        const item = localStorage.getItem(i.toString().concat("-data"));
        if (item) dataList.push(JSON.parse(item));
    }

    dataList.forEach(obj => 
        addRow(
            obj.index, 
            obj.name, 
            obj.last, 
            obj.adrss, 
            obj.dateOB, 
            obj.gender, 
            obj.comment, 
            document.querySelector(".table"), false
            ));
};



