import { useSelector } from 'react-redux';
import Auth from './components/Auth.jsx';
import Header from './components/Header.jsx';
import Chat from './components/Chat.jsx';
import './App.css';

function App() {
  const username = useSelector((state) => state.user.value.username);

  return (
    <div className="App">
      <Header />
      {!username && <Auth />}
      {username && <Chat />}
    </div>
  );
}

export default App;
