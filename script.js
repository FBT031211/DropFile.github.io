document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const clearAllBtn = document.getElementById("clearAllBtn");
    const sendEmailBtn = document.getElementById("sendEmailBtn");

    let selectedFiles = [];

    // Menampilkan daftar file yang dipilih
    fileInput.addEventListener("change", function () {
        selectedFiles = Array.from(fileInput.files);
        updateFileList();
    });

    function updateFileList() {
        fileList.innerHTML = "";
        if (selectedFiles.length === 0) {
            clearAllBtn.style.display = "none";
            return;
        }

        clearAllBtn.style.display = "block";

        selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement("div");
            fileItem.classList.add("file-item");

            const fileName = document.createElement("span");
            fileName.classList.add("file-name");
            fileName.textContent = file.name;

            const fileSize = document.createElement("span");
            fileSize.classList.add("file-size");
            fileSize.textContent = `(${(file.size / 1024).toFixed(2)} KB)`;

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-btn");
            removeBtn.textContent = "❌";
            removeBtn.addEventListener("click", () => removeFile(index));

            fileItem.appendChild(fileName);
            fileItem.appendChild(fileSize);
            fileItem.appendChild(removeBtn);

            fileList.appendChild(fileItem);
        });
    }

    function removeFile(index) {
        selectedFiles.splice(index, 1);
        updateFileList();
    }

    clearAllBtn.addEventListener("click", function () {
        selectedFiles = [];
        updateFileList();
    });

    // Kirim file melalui EmailJS
    sendEmailBtn.addEventListener("click", function () {
        if (selectedFiles.length === 0) {
            alert("Pilih setidaknya satu file untuk dikirim.");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });

        emailjs.send("service_dh4r62t", "template_g1yf9nm", {
            to_email: "fbt031211@gmail.com",
            message: "File yang telah diunggah",
        }).then(
            function (response) {
                alert("File berhasil dikirim!");
                console.log("SUCCESS!", response.status, response.text);
                selectedFiles = [];
                updateFileList();
            },
            function (error) {
                alert("Gagal mengirim file.");
                console.error("FAILED...", error);
            }
        );
    });
});
