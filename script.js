const form = document.getElementById('product-form');
const outputContainer = document.getElementById('output-container');
const okBtn = document.getElementById('ok-btn');
const nextBtn = document.getElementById('next-btn');
const copyBtn = document.getElementById('copy-btn');

let productDataArray = getFromLocalStorage(); // Retrieve JSON data from local storage

// Function to save JSON data to local storage
function saveToLocalStorage(data) {
  localStorage.setItem('productData', JSON.stringify(data));
}

// Function to retrieve JSON data from local storage
function getFromLocalStorage() {
  const data = localStorage.getItem('productData');
  return data ? JSON.parse(data) : [];
}

// Display existing JSON data from local storage
productDataArray.forEach((productData) => {
  displayProductData(productData);
});

okBtn.addEventListener('click', () => {
  const imageUrl = document.getElementById('image-url').value.trim();
  const productName = document.getElementById('product-name').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value.trim());
  const phoneNumber = document.getElementById('phone-number').value.trim();
  const text = document.getElementById('text').value.trim();

  if (!imageUrl || !productName || !description || isNaN(price) || !phoneNumber || !text) {
    alert('Please fill in all fields.');
    return;
  }

  if (description.length > 120) {
    alert('Description cannot exceed 120 characters.');
    return;
  }

  const productData = {
    name: productName,
    imageUrl: imageUrl,
    description: description,
    price: price,
    phoneNumber: phoneNumber,
    text: text,
  };

  productDataArray.push(productData);
  displayProductData(productData);

  form.reset(); // Clear the form fields after submitting
  okBtn.style.display = 'show';

  saveToLocalStorage(productDataArray); // Save JSON data to local storage
});

nextBtn.addEventListener('click', () => {
  form.reset(); // Reset the form
  document.getElementById('image-url').focus(); // Focus on the first input field
});

function displayProductData(productData) {
  const jsonText = JSON.stringify(productData, null, 2); // Pretty print the JSON

  const jsonDisplay = document.createElement('pre');
  jsonDisplay.textContent = jsonText;

  if (outputContainer.children.length > 0) {
    outputContainer.lastElementChild.textContent += ',';
  }

  outputContainer.appendChild(jsonDisplay);
}
const clearLocalStorageBtn = document.getElementById('clear-local-storage-btn');

// Function to clear local storage

okBtn.addEventListener('click', () => {
  clearLocalStorageBtn.style.display = 'block';
});

function clearLocalStorage() {
  localStorage.clear();
  alert('Local storage cleared successfully!');
  clearLocalStorageBtn.style.display = 'none'; // Hide the button after clearing local storage
}

copyBtn.addEventListener('click', () => {
  const jsonText = outputContainer.textContent;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        alert('JSON copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy JSON to clipboard. Your browser might not support this feature.');
      });
  } else {
    alert('Your browser might not support copying to clipboard. Here\'s the JSON:\n' + jsonText);
  }
});
