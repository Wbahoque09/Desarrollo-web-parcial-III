import "reflect-metadata"
import ReactDOM from 'react-dom/client'
import App from './UI/App'
import "./Data/Config/MobxConfig"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </React.StrictMode>,
)
