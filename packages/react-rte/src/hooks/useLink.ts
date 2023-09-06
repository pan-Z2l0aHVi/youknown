import { useState } from 'react'

export function useLink() {
	const [linkPopOpen, setLinkPopOpen] = useState(false)
	return {
		linkPopOpen,
		setLinkPopOpen
	}
}
