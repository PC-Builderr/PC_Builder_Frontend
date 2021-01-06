import { useCallback, useState } from 'react'
import { ClickAwayState } from './ClickAwayState'

export const useClickAway = (initialState: boolean = false): ClickAwayState => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState)

    const close = useCallback(() => {
        setIsOpen(false)
        window.removeEventListener('click', close)
    }, [setIsOpen])

    const open = useCallback(
        (event?: React.MouseEvent<HTMLButtonElement | HTMLInputElement, MouseEvent>) => {
            if (event) {
                event.stopPropagation()
            }
            setIsOpen((state: boolean) => !state)
            window.addEventListener('click', close)
        },
        [close]
    )

    return { isOpen, open, close }
}
