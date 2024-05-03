import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Root from './pages/Root'
import CreateLobby from './pages/CreateLobby'
import ViewLobbies from './pages/ViewLobbies'
import DirectMessages from './pages/DirectMessages'
import ViewMessages from './pages/ViewMessages'
import NewDM from './pages/NewDM'
import Lobby from './pages/LobbyPage'
import Index from './pages/Index'
import AddUser from './pages/AddUser'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/main",
    element: <Root />,
    children:[
      { index: true, element: <Index /> },
      {
        path:"create_lobby",
        element: <CreateLobby />
      },
      {
        path:"view_lobbies",
        element: <ViewLobbies />
      },
      {
        path:"view_lobbies/:lobbyid",
        element: <Lobby />
      },
      {
        path:"view_lobbies/:lobbyid/add_user",
        element: <AddUser />
      },
      {
        path:"direct_messages/:userId",
        element: <DirectMessages />
      },
      {
        path:"direct_messages/:userId/view_messages",
        element: <ViewMessages />
      },
      {
        path:"direct_messages/:userId/new_message",
        element: <NewDM />
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
