import { Change, Click, Submit } from './Events'

export type ChangeHandler<T> = (event: Change<T>) => void
export type ClickHandler<T> = (event: Click<T>) => void
export type SubmitHandler = (event: Submit) => void
