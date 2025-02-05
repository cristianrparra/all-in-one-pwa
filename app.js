document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTask = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    addTask.addEventListener('click', () => {
        if (taskInput.value.trim() === '') return;

        let task = document.createElement('li');
        task.textContent = taskInput.value;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => task.remove());

        task.appendChild(deleteBtn);
        taskList.appendChild(task);

        taskInput.value = '';
    });
});

document.getElementById('convertBtn').addEventListener('click', function() {
    const input = document.getElementById('imageInput');
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // Convert the canvas image to PNG format
                const convertedDataUrl = canvas.toDataURL('image/png');
                downloadImage(convertedDataUrl);
            };
        };

        reader.readAsDataURL(file);
    }
});

// Function to trigger the download of the converted image
function downloadImage(dataUrl) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'converted-image.png';
    link.click();
}