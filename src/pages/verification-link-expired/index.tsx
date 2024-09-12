import { Button } from "@robur_/ui-kit";
import src from "../../../public/TimeManagement.png";
import Image from "next/image";

import s from "./verification-link-expired.module.scss";
import { useRouter } from "next/router";
import { useRegistrationResendingMutation } from "@/services/auth/authApi";
import Spinner from "@/components/Spinner/Spinner";


export default function LinkExpired() {

const router = useRouter();
const { email } = router.query;
const [registrationResending, { isLoading }] = useRegistrationResendingMutation();

  const handleOnClick = () => {
    try {
      if (email && typeof email === "string") {
        const res = registrationResending({ email }).unwrap();
        console.log(res);

        // if(res.status === 403){
        //   router.replace(`/verification-link-expired?email=${res.data.email}`);
        router.replace(`/verification-link-expired?email=demorest49de@gmail.com`);
        //return
        // }


      }
    } catch (error: any) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={s.container}>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <h1 className={s.title}>Email verification link expired</h1>
          <p className={s.text}>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <Button onClick={handleOnClick} asChild>
            {<a href={"#"}>Resend verification link</a>}
          </Button>
        </div>
        <Image src={src} alt="email-confirmed" className={s.image} />
      </div>
    </div>
  );
}
