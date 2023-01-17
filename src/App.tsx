import Habit from './components/Habit';
import './styles/global.css';

function App() {
  return (
    <>
      <Habit completed={1} />
      <Habit completed={2} />
      <Habit completed={10} />
      <Habit completed={8} />
      <Habit completed={13} />
      <Habit completed={1} />
    </>
  );
}

export default App;
