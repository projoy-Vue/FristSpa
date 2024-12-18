
const loadComponent = async (elementId, filePath) => {
    try {
      // Fetch the HTML content from the specified file path
      const response = await fetch(filePath);
      const content = await response.text();
      
      // Inject the fetched content into the DOM element with the given ID
      document.getElementById(elementId).innerHTML = content;
    } catch (error) {
      // Log an error message if the fetch operation fails
      console.error('Error loading component:', error);
    }
  
    // If the loaded component is the header, set up a search input event listener
    if (elementId === 'header') { };
  
    // If the loaded component is the footer, set up newsletter functionality
    if (elementId === 'footer') {};
  
  // Load header and footer dynamically on page load
  document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', './components/navbar.html');
    loadComponent('footer', './components/footer.html');
  });
  
  }  