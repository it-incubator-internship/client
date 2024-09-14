import s from "./privacy-policy.module.scss";
import { Button } from "@robur_/ui-kit";

export default function PrivacyPolicy() {



  return  (
    <div className={s.container}>

      <Button
        // onClick={HandleClick}
        asChild
      >
        {<a href={`/sign-up`}>Back to Sign Up</a>}
      </Button>

      <h1 className={s.title}>Email verification link expired</h1>
      <p className={s.text}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </p>
    </div>
  );
}
