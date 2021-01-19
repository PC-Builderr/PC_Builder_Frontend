import React from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'

interface Props {
    maxWidth?: number
    minWidth?: number
    maxHeight?: number
    minHeight?: number
    children: React.ReactElement
}

export const WithMediaQuery: React.FC<Props> = props => {
    const { height, width } = useWindowSize()

    if (props.maxWidth && props.maxWidth >= width) return null
    if (props.minWidth && props.minWidth < width) return null
    if (props.maxHeight && props.maxHeight >= height) return null
    if (props.minHeight && props.minHeight < height) return null

    return props.children
}
