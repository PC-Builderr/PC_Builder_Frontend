import { MutableRefObject, useCallback, useState } from 'react'
import { Click } from '../../types/Events'
import { useIsMounted } from '../useIsMounted'

interface ClickAwayState {
    isOpen: boolean
    open: (event?: Click<HTMLInputElement | HTMLButtonElement>) => void
    close: () => void
}

export const useClickAway = (initialState: boolean = false): ClickAwayState => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState)

    const isMounted: MutableRefObject<boolean> = useIsMounted()

    const close = useCallback(() => {
        if (!isMounted.current) return

        setIsOpen(false)
        window.removeEventListener('click', close)
    }, [setIsOpen, isMounted])

    const open = useCallback(
        (event?: Click<HTMLButtonElement | HTMLInputElement>) => {
            if (event) event.stopPropagation()

            if (!isMounted.current) return

            setIsOpen((state: boolean) => !state)
            window.addEventListener('click', close)
        },
        [close, isMounted]
    )

    return { isOpen, open, close }
}
