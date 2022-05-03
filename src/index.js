let apiQuotes = [...localQuotes]
const quotesContainer = document.querySelector('#quote-container')
const quoteContainer = document.querySelector('#quote-text-inner')
const authorContainer = document.querySelector('.quote-author-inner')
const loader = document.querySelector('.lds-spinner')

function writeQuote(quote, author) {
  quoteContainer.innerHTML = quote
  authorContainer.innerHTML = author || 'Unknown'

  if (quote.length > 120) {
    quoteContainer.classList.add('long-quote')
  } else {
    quoteContainer.classList.remove('long-quote')
  }
}

function newQuote() {
  const randomPosition = Math.floor(Math.random() * apiQuotes.length)
  const randomQuote = apiQuotes[randomPosition]

  const quote = randomQuote.text
  const author = randomQuote.author

  writeQuote(quote, author)
}

async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    loading()
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    newQuote()
    complete()
  }
}

function quoteButton() {
  const newQuoteButton = document.querySelector('#new-quote')
  newQuoteButton.addEventListener('click', newQuote)
}

function publishQuote() {
  const url = 'https://twitter.com/intent/tweet'
  const quote = document.querySelector('#quote-text-inner').innerText
  const author = document.querySelector('.quote-author-inner').innerText
  const text = `${quote} - ${author}`

  const urlComplete = `${url}?text=${text}`
  window.open(urlComplete, '_blank')
}

function tweetButton() {
  const button = document.querySelector('#twitter')
  button.addEventListener('click', publishQuote)
}

function loading() {
  loader.classList.remove('hidden')
  quotesContainer.classList.add('hidden')
}

function complete() {
  loader.classList.add('hidden')
  quotesContainer.classList.remove('hidden')
}

function init() {
  getQuotes()
  quoteButton()
  tweetButton()
  loading()
}

init()
