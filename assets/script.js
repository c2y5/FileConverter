document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("file-input");
  const uploadArea = document.getElementById("upload-area");
  const filePreview = document.getElementById("file-preview");

  fileInput.addEventListener("change", function () {
    const files = fileInput.files;
    updateFilePreview(files);
  });

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
    updateFilePreview(files);
  });

  function updateFilePreview(files) {
    filePreview.innerHTML = "";

    Array.from(files).forEach((file) => {
      const fileDetails = document.createElement("p");
      fileDetails.textContent = `File: ${file.name}`;
      filePreview.appendChild(fileDetails);

      const reader = new FileReader();

      reader.onload = function (e) {
        if (file.type.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.style.maxWidth = "200px";
          img.style.marginTop = "10px";
          filePreview.appendChild(img);
        } else if (file.type.startsWith("video/")) {
          const video = document.createElement("video");
          video.src = e.target.result;
          video.controls = true;
          video.style.maxWidth = "200px";
          video.style.marginTop = "10px";
          filePreview.appendChild(video);
        } else if (file.type.startsWith("audio/")) {
          const audio = document.createElement("audio");
          audio.src = e.target.result;
          audio.controls = true;
          filePreview.appendChild(audio);
        }
      };

      reader.readAsDataURL(file);
    });
  }
});
