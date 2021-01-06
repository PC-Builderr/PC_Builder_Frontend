export interface ClickAwayState {
    isOpen: boolean
    open: (event?: React.MouseEvent<HTMLButtonElement | HTMLInputElement, MouseEvent>) => void
    close: () => void
}
