document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("file-input");
  const uploadArea = document.getElementById("upload-area");
  const filePreview = document.getElementById("file-preview");

  fileInput.addEventListener("change", handleFileChange);

  uploadArea.addEventListener("dragover", function (event) {
    event.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", function () {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", function (event) {
    event.preventDefault();
    uploadArea.classList.remove("dragover");
    const files = event.dataTransfer.files;
    fileInput.files = files;
    handleFileChange();
  });

  function handleFileChange() {
    const files = fileInput.files;
    updateFilePreview(files);

    if (files.length > 0) {
      uploadArea.style.display = "none";
    } else {
      uploadArea.style.display = "flex";
    }
  }

  function updateFilePreview(files) {
    filePreview.innerHTML = "";

    Array.from(files).forEach((file, index) => {
      const fileItem = document.createElement("div");
      fileItem.classList.add("file-item");

      const fileName = document.createElement("span");
      fileName.textContent = `${file.name} (${(file.size / 1024).toFixed(
        2
      )} KB)`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", function () {
        removeFile(index);
      });

      fileItem.appendChild(fileName);
      fileItem.appendChild(deleteButton);
      filePreview.appendChild(fileItem);
    });
  }

  function removeFile(index) {
    const dataTransfer = new DataTransfer();
    const files = Array.from(fileInput.files);

    files.splice(index, 1);

    files.forEach((file) => dataTransfer.items.add(file));

    fileInput.files = dataTransfer.files;

    handleFileChange();

    if (fileInput.files.length === 0) {
      uploadArea.style.display = "flex";
    }
  }
});
