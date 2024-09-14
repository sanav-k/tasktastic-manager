import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import CreateTask from './components/CreateTask';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
                <Route path="/task/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
                <Route path="/create" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
              </Routes>
            </div>
          </div>
          <Toaster />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
