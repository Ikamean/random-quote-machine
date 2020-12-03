import {useState, useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from './colors.array';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';


let quoteDb = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState('Hello World');
  const [author, setAuthor] = useState ('charles');
  const [quotesArr, setQuotesArr] = useState(null);
  const [color, setColor] = useState('#CCFF1A');

  const fetchDb = async (url) =>{
    const response = await fetch(url)
    const parsedJson = await response.json()
    setQuotesArr(parsedJson.quotes)
  }
  useEffect(()=>{
    fetchDb(quoteDb);
  }, [quoteDb]);

  const getRandomQuote = () =>{
    let randomInt = Math.floor(quotesArr.length*Math.random());
    setQuote(quotesArr[randomInt].quote);
    setAuthor(quotesArr[randomInt].author);
    setColor(COLORS_ARRAY[randomInt]);
  }


  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:color}}>

        <div id="quote-box">

        <h2 id="text">
          <span id="quote-icon"><FontAwesomeIcon icon={faQuoteLeft}/></span>

          {quote}
        </h2>

        <p id="author">
          - {author}
        </p>

        <div class="buttons">

        <a id="tweet-quote" 
        href={encodeURI('https://www.twitter.com/intent/tweet?text=${quote} - ${author}')} 
        target="blank_" ><FontAwesomeIcon icon={faTwitter}/></a>

        <button id="new-quote" onClick = {()=>getRandomQuote()}  >Random Quote</button>
        </div>

        </div>
      </header>
    </div>
  );
}

export default App;
