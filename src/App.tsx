import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Link, Outlet, Route, Routes } from "react-router-dom";
import MyCalendar from "./calrender";
import { ReactDatePickerTest } from "./calrender/DatePicker";

function AppDefault() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Menu />
    </>
  );
}

const Menu = () => {
  return (
    <div>
      <p className="read-the-docs">
        <Link to="/">[index]</Link>
        <Link to="/calrender" >
          [calrender]
        </Link>
        <Link to="/picker">[picker]</Link>
      </p>
      <Outlet />
    </div>
  );
};
const App = () => {
  return (
    <Routes>
      <Route index element={<AppDefault />} />
      <Route path="/" element={<Menu />}>
        <Route path="/calrender" element={<MyCalendar />} />
        <Route path="/picker" element={<ReactDatePickerTest />} />
      </Route>
      {/*         
      <Route path='/' element={<Layout />} >
      </Route> */}
    </Routes>
  );
};
export default App;
