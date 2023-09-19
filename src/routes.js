import Dashboard from "pages/Dashboard";
import DefaultPage from "pages/DefaultPage";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes(){
  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={DefaultPage}>
            <Route index Component={Home}/>
            <Route path="dashboard" Component={Dashboard}/>
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default AppRoutes;