import clsx from "clsx";
import {
    Card,
    GithubSvgrepoCom31,
    GoogleSvgrepoCom1,
    ControlledInput,
} from '@robur_/ui-kit'
import s from './Signup.module.scss'
import Link from "next/link";


export default function SignUp() {
    return (
        <div className={clsx(s.SignUpContainer)}>
            <Card className={clsx(s.SignUpCard)}>
                <h1 className={s.SignUpCardTitle}>Sign Up</h1>
                <div className={s.SignUpCloudAuth}>
                    <Link className={s.SignUpCloudAuthLink} href={'https://www.google.com'}>
                        <GoogleSvgrepoCom1/>
                    </Link>
                    <Link className={s.SignUpCloudAuthLink} href={'https://www.github.com'}>
                        <GithubSvgrepoCom31 />
                    </Link>
                </div>
                <form className={s.SignUpForm}>
                    {/*<ControlledInput control={}/>*/}
                </form>
            </Card>
        </div>
    )
}
