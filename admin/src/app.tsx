import { RouterProvider } from '@tanstack/solid-router';
import type { Component } from 'solid-js';
import { router } from './router';
import './app.css';

const App: Component = () => <RouterProvider router={router} />;

export default App;
