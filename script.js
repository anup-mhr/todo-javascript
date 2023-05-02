let add = document.getElementById("add");
let i = localStorage.length


for (let i = 0; i < localStorage.length; i++) {
    let row = document.createElement("div");
    row.id = i;
    row.className = "row d-flex align-center"
    row.innerHTML = `<input class="note overflow-hidden" value="${localStorage.getItem(i)}">
                        <button id="edit" class="ml-10">Edit</button>
                        <button id="delete" class="ml-10">Delete</button>`
    document.getElementById("main").appendChild(row);
}


add.addEventListener("click", (e) => {
    e.preventDefault()
    let newNote = document.getElementById("newNote");
    if (newNote.value === "") {
        alert("Please enter a note");
        return;
    }
    localStorage.setItem(i, newNote.value);

    let row = document.createElement("div");
    row.id = i;
    row.className = "row d-flex align-center"
    row.innerHTML = `<input class="note overflow-hidden" value="${newNote.value}">
                        <button id="edit" class="ml-10">Edit</button>
                        <button id="delete" class="ml-10">Delete</button>`
    document.getElementById("main").appendChild(row);

    i++
    newNote.value = ""
})
let edits = document.querySelectorAll("#edit")
let deletes = document.querySelectorAll("#delete")


edits.forEach((edit) => {
    edit.addEventListener("click", (e) => {
        let row = e.target.parentElement
        let id = row.getAttribute("id")
        let note = e.target.previousElementSibling.value

        localStorage.setItem(id, note)
    })
})



deletes.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault()
        let row = e.target.parentElement
        let id = row.getAttribute("id")
        localStorage.removeItem(id)
        row.remove()
    })
})
