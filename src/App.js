import logo from './logo.svg';
import './App.css';
import PokemonList from "./Components/PokemonList"
import PokemonComponent from './Components/PokemonComponent';


function App() {
  return (
    <div className="App">
     <header className='App-header'>
      <article>
        The Article
        <PokemonList/>
        <PokemonComponent/>
      </article>
     </header>
     <div>
      
     </div>
    </div>
  );
}

export default App;
