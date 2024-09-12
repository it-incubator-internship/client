import { Button } from "@robur_/ui-kit";
import src from "../../../public/email-confirmed.png";
import Image from "next/image";

import s from "./email-confirmed.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EmailConfirmed() {

  const router = useRouter();
  const code = router.query.code;

  console.log('email-confirmed');
  console.log(`code`, code);

  useEffect(()=>{

  }, [code])

  const handleOnClick = () => {
    alert(`${code}`);
  };

  return (
    <div className={s.container}>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <h1 className={s.title}>Congratulations!</h1>
          <p className={s.text}>
            Your email has been confirmed
          </p>
          <Button onClick={handleOnClick}>
            Sign in
          </Button>
        </div>
        <Image src={src} alt="email-sent" className={s.image} />
      </div>
    </div>
  );
}
