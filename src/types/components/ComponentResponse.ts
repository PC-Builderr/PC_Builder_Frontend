import { Component } from './Component'

export interface ComponentResponse<T extends Component> {
    component: T
}
