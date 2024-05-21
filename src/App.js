import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>,
      errorElement: <Error/>
    },
    {
      path: "login",
      element: <Login/>
    }
  ])
  return <RouterProvider router={router} />
}

export default App;
