const firstName = document.querySelector(".fn");
const lastName = document.querySelector(".ln");
const address = document.querySelector(".address");
const dob = document.querySelector(".calendar");
const sex = document.querySelector(".dropdown");
const notes = document.querySelector(".notes");
const btn = document.querySelector(".btn");
const table = document.querySelector(".table");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const fn = firstName.value;
    const ln = lastName.value;
    const ad = address.value;
    const date = dob.value;
    const sx = sex.value;
    const note = notes.value;

    if (!firstAndLastNameValidator(fn) || !firstAndLastNameValidator(ln) || !addressValidator(ad)) return;
    
    const row = table.insertRow(-1);
    row.style.cursor = "pointer";

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

    row.addEventListener("click", () => {
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

    let cell = row.insertCell(0);
    let text = document.createTextNode(localStorage.getItem("index"));
    cell.appendChild(text);

    [fn, ln, ad, date, sx].forEach((element, i) => {
        cell = row.insertCell(i + 1);
        text = document.createTextNode(element);
        cell.appendChild(text);
    });

});

validateField(
    firstName, 
    document.querySelector(".fn-container"),
    "keyup",
    "keyup",
    firstAndLastNameValidator,
    "warning-text1",
    "digits/special characters are not allowed"
);

validateField(
    lastName,
    document.querySelector(".ln-container"),
    "keyup",
    "keyup",
    firstAndLastNameValidator,
    "warning-text2",
    "digits/special characters are not allowed"
);

validateField(
    address,
    document.querySelector(".address-container"),
    "keyup",
    "keyup",
    addressValidator,
    "warning-text3",
    "Maximum of 35 characters allowed"
);

loadFields(
    [firstName, lastName, address, dob, sex, notes], 
    ["firstName", "lastName", "address", "dob", "sex", "notes"]
    );    

saveFields(
    [firstName, lastName, address, notes], 
    "keyup", 
    ["firstName", "lastName", "address", "notes"]
    );

saveFields(
    [dob, sex],
    "change",
    ["dob", "sex"]
);    

loadTableData();
