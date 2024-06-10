<script>
    let file;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const handleFileChange = (event) => {
        file = event.target.files[0];
    };

    const uploadFile = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            alert("File size exceeds the limit of 5MB!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:3000/api/upload", {
                method: "POST",
                body: formData,
                credentials: "include", // To include cookies in the request
            });

            if (response.ok) {
                const data = await response.json();
                alert(
                    "File uploaded successfully: " + JSON.stringify(data.file),
                );
            } else {
                const error = await response.json();
                alert(`File upload failed: ${error.message}`);
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };
</script>

<div class="upload-container">
    <h1>Upload File</h1>
    <input type="file" on:change={handleFileChange} />
    <button on:click={uploadFile}>Upload File</button>
</div>

<style>
    /* Add any styles you need here */
    .upload-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        text-align: center;
    }

    input[type="file"] {
        margin-bottom: 20px;
    }
</style>
