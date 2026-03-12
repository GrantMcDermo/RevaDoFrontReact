import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRouter from "./app/router/AppRouter";
import { AuthProvider } from './app/providers/AuthProvider';



export default function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter> 
  );
}

