import { useCallback, useState } from 'react'
import { Click } from '../../types/Events'

interface ClickAwayState {
    isOpen: boolean
    open: (event?: Click<HTMLInputElement | HTMLButtonElement>) => void
    close: () => void
}

export const useClickAway = (initialState: boolean = false): ClickAwayState => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState)

    const close = useCallback(() => {
        setIsOpen(false)
        window.removeEventListener('click', close)
    }, [setIsOpen])

    const open = useCallback(
        (event?: Click<HTMLButtonElement | HTMLInputElement>) => {
            if (event) event.stopPropagation()

            setIsOpen((state: boolean) => !state)
            window.addEventListener('click', close)
        },
        [close]
    )

    return { isOpen, open, close }
}
