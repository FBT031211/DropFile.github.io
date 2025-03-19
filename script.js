const GITHUB_USERNAME = "FBT031211";  // Ganti dengan username GitHub kamu
const REPO_NAME = "dropfile.github.io"; // Nama repository GitHub
const TOKEN = "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"; // Ganti dengan token GitHub yang valid

document.getElementById("uploadBtn").addEventListener("click", async function () {
    const fileInput = document.getElementById("fileInput");
    const statusMessage = document.getElementById("statusMessage");

    if (fileInput.files.length === 0) {
        statusMessage.innerText = "Pilih file terlebih dahulu!";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function (event) {
        const fileContent = btoa(event.target.result); // Encode file ke base64
        const filePath = `uploads/${file.name}`; // Lokasi penyimpanan di repo

        const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${filePath}`;
        
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `Upload ${file.name}`,
                content: fileContent
            })
        });

        if (response.ok) {
            statusMessage.innerText = `✅ Berhasil diunggah: ${file.name}`;
        } else {
            statusMessage.innerText = `❌ Gagal mengunggah file`;
        }
    };

    reader.readAsBinaryString(file);
});
