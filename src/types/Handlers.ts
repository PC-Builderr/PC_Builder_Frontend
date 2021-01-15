import { Change, Click, Focus, Submit } from './Events'

export type ChangeHandler<T> = (event: Change<T>) => void
export type ClickHandler<T> = (event: Click<T>) => void
export type SubmitHandler = (event: Submit) => void
export type FocusHandler = (event: Focus) => void
