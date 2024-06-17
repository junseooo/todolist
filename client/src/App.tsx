import styled from "styled-components";
import TodoList from "./components/TodoList";
import Calendar from "./components/Calendar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/todo/:date" element={<TodoList />} />
          </Routes>
        </AppContainer>
      </Router>
    </Provider>
  );
};

export default App;

const AppContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
