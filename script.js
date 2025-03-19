document.getElementById("fileInput").addEventListener("change", function () {
    let files = Array.from(this.files);
    let fileListContainer = document.getElementById("fileList");

    files.forEach(file => {
        let fileItem = document.createElement("div");
        fileItem.classList.add("file-item");

        let fileName = document.createElement("span");
        fileName.classList.add("file-name");
        fileName.textContent = file.name;

        let fileSize = document.createElement("span");
        fileSize.classList.add("file-size");
        fileSize.textContent = ` (${(file.size / 1024).toFixed(2)} KB)`;

        let removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = "❌";
        removeBtn.onclick = function () {
            fileItem.classList.add("fade-out");
            setTimeout(() => fileItem.remove(), 300);
            checkFileList();
        };

        fileItem.appendChild(fileName);
        fileItem.appendChild(fileSize);
        fileItem.appendChild(removeBtn);
        fileListContainer.appendChild(fileItem);
    });

    checkFileList();
});

function checkFileList() {
    let fileListContainer = document.getElementById("fileList");
    let clearAllBtn = document.getElementById("clearAllBtn");
    clearAllBtn.style.display = fileListContainer.children.length > 0 ? "block" : "none";
}

function clearAllFiles() {
    let fileListContainer = document.getElementById("fileList");
    Array.from(fileListContainer.children).forEach(fileItem => {
        fileItem.classList.add("fade-out");
        setTimeout(() => fileItem.remove(), 300);
    });

    setTimeout(() => checkFileList(), 300);
}
