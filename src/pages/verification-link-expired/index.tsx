import { Button, Modal } from "@robur_/ui-kit";
import src from "../../../public/TimeManagement.png";
import Image from "next/image";

import s from "./verification-link-expired.module.scss";
import { useRouter } from "next/router";
import { useRegistrationResendingMutation } from "@/services/auth/authApi";
import Spinner from "@/components/Spinner/Spinner";
import { useState } from "react";


export default function LinkExpired() {

  const router = useRouter();
  const { email } = router.query;
  const [registrationResending, { isLoading }] = useRegistrationResendingMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseEmail, setResponseEmail] = useState("");

  console.log('email: ', email)

  const [isSpinnerWorking, setisSpinnerWorking] = useState(false);


  const handleOnClick = () => {
    try {
      // if (email && typeof email === "string") {
      if (true) {
        // const res = registrationResending({ email }).unwrap();
        const res = registrationResending({ email: "liv_61@mail.ru" }).unwrap();
        console.log(res);

        setIsModalOpen(true);
        // setResponseEmail(res.email);
        setResponseEmail("demorest49de@gmail.com");
      }
    } catch (error: any) {
      console.log(error);

    }
  };

  if (isLoading || isSpinnerWorking) {
    return <Spinner />;
  }

  const args = {
    children: <p>We have sent a link to confirm your email to {responseEmail}</p>,
    open: true,
    title: "Email sent",
    onClose: () => {
      setIsModalOpen(false);
      setisSpinnerWorking(true);
      router.replace("/sign-in");
    }
  };

  const modalJSX = <Modal {...args}>
    {args.children}
  </Modal>;


  return isModalOpen ? modalJSX
    : (
      <div className={s.container}>
        <div className={s.outerWrapper}>
          <div className={s.innerWrapper}>
            <h1 className={s.title}>Email verification link expired</h1>
            <p className={s.text}>
              Looks like the verification link has expired. Not to worry, we can send the link again
            </p>
            <Button onClick={handleOnClick}>
              Resend verification link
            </Button>
          </div>
          <Image src={src} alt="email-confirmed" className={s.image} />
        </div>
      </div>
    );
}
