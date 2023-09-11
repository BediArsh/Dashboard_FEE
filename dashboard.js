// Function to add data to localStorage
        function addData() {
            const dataInput = document.getElementById('dataInput');
            const data = dataInput.value;
            
            if (data) {
                // Retrieve existing data from localStorage
                const existingData = localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : [];
                
                // Add the new data
                existingData.push(data);
                
                // Store the updated data in localStorage
                localStorage.setItem('dashboardData', JSON.stringify(existingData));
                
                // Clear the input field
                dataInput.value = '';
                
                // Update the displayed data
                displayData();
            }

            // Upload and display image
            const imageInput = document.getElementById('imageInput');
            const imageFile = imageInput.files[0];
            
            if (imageFile) {
                const reader = new FileReader();
                
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;

                    // Store the image as a Base64-encoded string in localStorage
                    localStorage.setItem('dashboardImage', e.target.result);

                    // Display the uploaded image
                    const dataList = document.getElementById('dataList');
                    const listItem = document.createElement('li');
                    listItem.appendChild(img);
                    dataList.appendChild(listItem);

                    // Show the "Delete Image" button
                    const deleteImageButton = document.getElementById('deleteImageButton');
                    deleteImageButton.style.display = 'block';
                };
                
                reader.readAsDataURL(imageFile);
            }
        }

        // Function to delete data item
        function deleteData(index) {
            const existingData = localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : [];
            
            // Remove the item at the specified index
            existingData.splice(index, 1);
            
            // Update the stored data in localStorage
            localStorage.setItem('dashboardData', JSON.stringify(existingData));
            
            // Update the displayed data
            displayData();
        }

        // Function to delete the stored image
        function deleteImage() {
            localStorage.removeItem('dashboardImage');
            
            // Hide the "Delete Image" button
            const deleteImageButton = document.getElementById('deleteImageButton');
            deleteImageButton.style.display = 'none';

            // Update the displayed data
            displayData();
        }

       // Function to display stored data and image
function displayData() {
    const dataList = document.getElementById('dataList');

    // Retrieve data from localStorage
    const storedData = localStorage.getItem('dashboardData');

    if (storedData) {
        const dataArr = JSON.parse(storedData);
        dataList.innerHTML = '';

        // Populate the list with stored data
        dataArr.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${item}`;

            // Create a delete button for each item
            const deleteButton = document.createElement('span');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => deleteData(index);

            listItem.appendChild(deleteButton);
            dataList.appendChild(listItem);
        });
    }

    // Retrieve and display the stored image
    const storedImage = localStorage.getItem('dashboardImage');
    if (storedImage) {
        const img = document.createElement('img');
        img.src = storedImage;
        dataList.appendChild(img);

        // Show the "Delete Image" button
        const deleteImageButton = document.getElementById('deleteImageButton');
        deleteImageButton.style.display = 'block';
    } else {
        // Hide the "Delete Image" button if there is no stored image
        const deleteImageButton = document.getElementById('deleteImageButton');
        deleteImageButton.style.display = 'none';
    }
}

// Initial display of stored data and image
displayData();
