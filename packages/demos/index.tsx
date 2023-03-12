import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

createRoot(document.getElementById('app') as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
