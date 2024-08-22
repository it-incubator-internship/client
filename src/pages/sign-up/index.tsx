import clsx from "clsx";
import {Card} from '@robur_/ui-kit'
import s from './Signup.module.scss'


export default function SignUp() {
    return (
        <div className={clsx(s.SignUpContainer)}>
            <Card className={clsx("flex", "justify-center", s.SignUpCard)}>
                <h1 className={s.SignUpCardTitle}>Sign Up</h1>
                <div className={s.SignUpCloudAuth}>
                    <GithubSvgrepoCom31/>
                    <GoogleSvgrepoCom1/>
                </div>
                <form>
                </form>
            </Card>
        </div>
    )
}
