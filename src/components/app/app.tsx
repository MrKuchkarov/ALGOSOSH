import React from "react";
import "./app.module.css";
import {MainPage} from "../../pages/main-page/main-page";
import {StringReversePage} from "../../pages/string-page/string-page";
import {FibonacciPage} from "../../pages/fibonacci-page/fibonacci-page";
import {SortingPage} from "../../pages/sorting-page/sorting-page";
import {StackPage} from "../../pages/stack-page/stack-page";
import {QueuePage} from "../../pages/queue-page/queue-page";
import {ListPage} from "../../pages/list-page/list-page";
import {Route, Routes,} from "react-router-dom";
import styles from "./app.module.css";

function App() {
  return (
      <div className={`${styles["app"]}`}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/iterative" element={<StringReversePage />} />
            <Route path="/fibonacci" element={<FibonacciPage />} />
            <Route path="/sorting" element={<SortingPage />} />
            <Route path="/stack" element={<StackPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/list" element={<ListPage />} />
          </Routes>
      </div>
  );
}

export default App;
