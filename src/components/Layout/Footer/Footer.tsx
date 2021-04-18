import { Box, Container, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import styles from './Footer.module.scss'

export const Footer: FunctionComponent = () => {
    return (
        <Box className={styles.root}>
            <Container maxWidth='lg'>
                <div>
                    <div>
                        <a
                            href='https://www.facebook.com/profile.php?id=100012203474172'
                            className={styles.Facebook}
                        >
                            <FaFacebookF />
                        </a>
                    </div>
                    <div>
                        <a href='https://github.com/valentin30' className={styles.Github}>
                            <FaGithub />
                        </a>
                    </div>
                    <div>
                        <a
                            href='https://www.linkedin.com/in/valentin-spasov-a932871a9/'
                            className={styles.Linkedin}
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>
                    <div>
                        <a
                            href='https://www.instagram.com/valentinspasov4597/'
                            className={styles.Instagram}
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
                <Typography variant='body2'>
                    <AiOutlineCopyrightCircle />
                    2020 - {new Date().getFullYear()} PC-Builder. All Rights Reserved.
                </Typography>
            </Container>
        </Box>
    )
}
