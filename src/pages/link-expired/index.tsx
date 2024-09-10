import { Button } from "@robur_/ui-kit";
import src from "../../../public/TimeManagement.png";
import Image from "next/image";

import s from "./link-expired.module.scss";

export default function LinkExpired() {
  const handleOnClick = () => {
    alert("The link was sent again");
  };
  console.log(src);
  return (
    <div className={s.container}>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <h1 className={s.title}>Email verification link expired</h1>
          <p className={s.text}>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <Button fullWidth onClick={handleOnClick}>
            Resend verification link
          </Button>
        </div>
        <Image src={src} alt="email-confirmed" className={s.image} />
      </div>
    </div>
  );
}
