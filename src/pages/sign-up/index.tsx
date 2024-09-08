import {
  Button,
  Card,
  FormCheckbox,
  FormInput,
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
  Label, Modal
} from "@robur_/ui-kit";
import clsx from "clsx";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";

import s from "./Signup.module.scss";
import { useRegistrationMutation } from "@/services/auth/authApi";
import { RegistrationArgs, RegistrationResponse } from "@/services/auth/authTypes";
import Spinner from "@/components/Spinner/Spinner";
import { useState } from "react";

// todo  проверить валидацию по тз
const signUpSchema = z.object({
  email: z.string().email("The email must match the format\nexample@example.com"),
  password: z.string().min(8).max(20),
  passwordConfirmation: z.string().min(8).max(20),
  isAgreement: z.literal(true, {
    errorMap: () => ({ message: "Please, mark the checkbox, if you agree to our terms" })
  }),
  userName: z
    .string()
    .min(6, `Minimum number of characters 6`)
    .max(30, `Minimum number of characters 30`)
});

type FormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [registration, { isLoading }] = useRegistrationMutation();
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormValues>(
    {
      defaultValues: {
        userName: "demorest49de",
        email: "demorest49de@gmail.com",
        password: "StRo0NgP@SSWoRD",
        passwordConfirmation: "StRo0NgP@SSWoRD",
        isAgreement: true
      },
      resolver: zodResolver(signUpSchema)
    });

  const [modalIsOpen, setModalIsOpen] = useState(true);
  const handleSignUp = async (data: RegistrationArgs) => {
    const trimmedData = {
      ...data,
      userName: data.userName.trim(),
      email: data.email.trim()
    };

    try {
      console.log("это сабмит!");
      // const res = await registration(trimmedData).unwrap();
      // console.log(res);
      // if(res){
      //   return (
      //     <Modal  open={true} buttonTitle={'OK'} title={'Email sent'} >
      //       children={`We have sent a link to confirm your email to ${res.email}`}
      //   </Modal>)
      // }

      return (
        <Modal open={modalIsOpen} buttonTitle={"OK"} title={"Email sent"} onClose={() => {
          setModalIsOpen(false);
        }}>
          children={<p>We have sent a link to confirm your email to email@email.com</p>}
        </Modal>);

    } catch (error: any) {

      if (error.status === 400) {
        console.log(error.data.message);
      }
    }

    if (isLoading) {
      return <Spinner />;
    }

    return;
  };

  return (
    <div className={clsx(s.SignUpContainer)}>
      <Card className={clsx(s.SignUpCard, s.BorderBack)}>
        <h1 className={s.SignUpCardTitle}>Sign Up</h1>
        <div className={s.SignUpCloudAuth}>
          <Link className={s.SignUpCloudAuthLink} href={"https://www.google.com"} target={"_blank"}>
            <GoogleSvgrepoCom1 />
          </Link>
          <Link className={s.SignUpCloudAuthLink} href={"https://www.github.com"} target={"_blank"}>
            <GithubSvgrepoCom31 />
          </Link>
        </div>
        <form className={s.SignUpForm} onSubmit={handleSubmit(handleSignUp)}>
          <Label className={s.SignUpFormLabel} label={"userName"}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.userName?.message}
              name={"userName"}
              rules={{ required: true }}
              type={"text"}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={"Email"}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.email?.message}
              name={"email"}
              rules={{ required: true }}
              type={"email"}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={"Password"}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.password?.message}
              name={"password"}
              rules={{ required: true }}
              type={"password"}
            />
          </Label>

          <Label className={s.SignUpFormLabel} label={"Password confirmation"}>
            <FormInput
              className={s.SignUpFormInput}
              containerClassName={s.inputContainer}
              control={control}
              errorMsg={errors.passwordConfirmation?.message}
              name={"passwordConfirmation"}
              rules={{ required: true }}
              shouldUnregister
              type={"password"}
            />
          </Label>

          <div className={s.CheckboxAgreementBlock}>
            <FormCheckbox
              className={s.SignUpAgreementCheckbox}
              control={control}
              errorMsg={errors.isAgreement?.message}
              id={"SignUpAgreementCheckbox"}
              name={"isAgreement"}
            >
              <span>I agree to the&nbsp;</span>
              <Link
                className={s.SignUpAgreementLink}
                href={"/terms-and-conditions"}
                target={"_blank"}
              >
                Terms of Service
              </Link>
              <span className={s.SignUpAgreementSpan}>&nbsp;and&nbsp;</span>
              <Link className={s.SignUpAgreementLink} href={"/privacy-policy"} target={"_blank"}>
                Privacy Policy
              </Link>
            </FormCheckbox>
          </div>

          <Button className={s.SignUpButton} fullWidth type={"submit"}>
            Sign Up
          </Button>
        </form>
        <Link className={s.SignUpHaveAccountLink} href={"/have-account"}>
          Do you have an account?
        </Link>
        <Link className={s.SignInLink} href={"/sign-in"}>
          Sign In
        </Link>
      </Card>
    </div>
  );
}
