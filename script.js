const firstName = document.querySelector(".fn");
const lastName = document.querySelector(".ln");
const address = document.querySelector(".address");
const dob = document.querySelector(".calendar");
const sex = document.querySelector(".dropdown");
const notes = document.querySelector(".notes");
const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
    e.preventDefault();
});

dob.addEventListener("change", () => console.log(dob.value))
firstName.addEventListener("keyup", () => {console.log(localStorage.getItem("dob"))})

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

loadFields(
    [firstName, lastName, address, dob, sex, notes], 
    ["firstName", "lastName", "address", "dob", "sex", "notes"]
    );    