import { Change, Click } from './Events'

export type ChangeHandler<T> = (event: Change<T>) => void
export type ClickHandler<T> = (event: Click<T>) => void
