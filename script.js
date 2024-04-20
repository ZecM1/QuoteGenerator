const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
let errorCounter = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;

  // Check if Author field is Anonymous and replace it with Unknown
  quote.author === 'Anonymous'
    ? (authorText.textContent = 'Unknown')
    : (authorText.textContent = quote.author);

  // Dynamically reduce font size for long quotes
  quote.text.length > 130
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');

  hideLoadingSpinner();
}

function showErrorMessage() {
  showLoadingSpinner();
  quoteText.textContent =
    'Error reaching the database, please try refreshing the page. If the problem persists, try again later.';
  authorText.textContent = '';
  hideLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    errorCounter++;
    errorCounter === 3 ? showErrorMessage() : getQuotes();
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();
