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