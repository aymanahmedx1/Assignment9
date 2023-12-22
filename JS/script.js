var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var saveBtn = document.querySelector("#saveBtn");
var tableBody = document.querySelector("#tableBody");
var splash = document.querySelector("#splash");
var close = document.querySelector("#close");
var deleteButtons = document.querySelectorAll(".deleteBtn");
var bookmarkList = [];
/// * Get Data Initial 
getDataFromLocalStorage();
/// * Site Name Input Event Listener
siteName.addEventListener("input", function () {
    var regex = /^[a-zA-Z]{3,}$/
    if (regex.test(siteName.value)) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
    } else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
    }
});
/// * Site Url Input Event Listener

siteUrl.addEventListener("input", function () {
    var regex = /^w{3}\.[a-z]+\.[a-z]{2,}$/
    if (regex.test(siteUrl.value)) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
    } else {
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
    }
});
/// * Save Button Event Listener
saveBtn.addEventListener("click", function () {
    if (inputVlaid()) {
        var mark = { name: siteName.value, url: siteUrl.value }
        bookmarkList.push(mark);
        showDataInTable();
        saveInLocalStorage();
        clearUi();
    } else {
        showSplash();
    }
});
// ~ Validate Input Before Save
function inputVlaid() {
    if (siteName.classList.contains('is-valid') &&
        siteUrl.classList.contains('is-valid')) {
        return true;
    }
    else {
        return false;
    }
}
// ! Show Data In Table
function showDataInTable() {
    var cartoona = ``;
    for (var i = 0; i < bookmarkList.length; i++) {
        cartoona += `
        <tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].name}</td>
        <td><a class="btn btn-info text-white visitBtn" href="http://${bookmarkList[i].url}" target="_blank" > <i class="fa fa-eye text-white"></i> Visit</a></td>
        <td><button type="submit" class="btn btn-danger text-white deleteBtn" index="${i}"><i class="fa fa-trash-can text-white"></i> Delete</button></td>
        </tr>`;
    }
    tableBody.innerHTML = cartoona;
    deleteButtons = document.querySelectorAll(".deleteBtn");
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function (event) {
            bookmarkList.splice(event.target.getAttribute("index"), 1);
            showDataInTable();
            saveInLocalStorage();
        });
    }

}
// ! Save In LocalStorage
function saveInLocalStorage() {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
}
//! Get Data From LocalStorage
function getDataFromLocalStorage() {
    var listData = localStorage.getItem("bookmarkList");
    var data = JSON.parse(listData);
    if (data) {
        bookmarkList = data;
        showDataInTable();
    }
}
//^ Clear Input Field
function clearUi() {
    siteName.value = "";
    siteUrl.value = "";
    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid');
}

function closeSplash() {
    splash.classList.replace("d-flex", 'd-none')
}
// ^ Show Helper Box And Message
function showSplash() {
    splash.classList.replace("d-none", 'd-flex')

}
close.addEventListener("click", function () {
    closeSplash();
})