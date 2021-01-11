import React, { useCallback, useRef, useState } from 'react'
import { Image } from '../../../types/Image'
import styles from './ImageSlider.module.scss'

interface Props {
    images: Image[]
}

export const ImageSlider: React.FC<Props> = props => {
    const { length } = props.images
    const sliderRef = useRef<HTMLUListElement>(null)

    const [index, setIndex] = useState<number>(0)

    const nextImageHandler = useCallback(() => {
        setIndex((currentIndex: number) => {
            if (currentIndex === length - 1) {
                return currentIndex
            }
            return currentIndex + 1
        })
    }, [length])

    const prevImageHandler = useCallback(() => {
        setIndex((currentIndex: number) => {
            if (currentIndex === 0) {
                return currentIndex
            }
            return currentIndex - 1
        })
    }, [])

    return (
        <>
            <ul className={styles.root} ref={sliderRef}>
                {props.images.map((image: Image) => {
                    return (
                        <li
                            key={image.id}
                            style={{
                                transform: `translate(${
                                    index * -(sliderRef.current?.clientWidth || 0)
                                }px)`
                            }}
                        >
                            <img
                                src={`${process.env.REACT_APP_API_URL}${image.url}`}
                                alt='product'
                            />
                        </li>
                    )
                })}
            </ul>
            <button onClick={nextImageHandler}>next</button>
            <button onClick={prevImageHandler}>prev</button>
        </>
    )
}
