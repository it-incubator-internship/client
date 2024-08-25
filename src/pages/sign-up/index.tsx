import clsx from "clsx";


import {
  Button,
  Card,
  FormCheckbox,
  FormInput,
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
  Label
} from "@robur_/ui-kit";

// todo куда передать тру что бы чекбокс показывал ошибку
// todo куда передать текст ошибки в инпутах

import s from "./Signup.module.scss";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  passwordConfirmation: z.string().min(8).max(20),
  SignUpAgreement: z.boolean()
});

type FormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  }
    = useForm<FormValues>({ resolver: zodResolver(signUpSchema)});

  const submitForm = handleSubmit(data => {
    console.log(data);
  });

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
        <form className={s.SignUpForm} onSubmit={submitForm}>
          <Label label={"Username"} className={s.SignUpFormLabel}>
            <FormInput
              type="text"
              control={control}
              rules={{ required: true }}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
              name={"username"}
              errorMsg={errors.username?.message}
            />
          </Label>

          <Label label={"Email"} className={s.SignUpFormLabel}>
            <FormInput
              type="email"
              control={control}
              rules={{ required: true }}
              name={"email"}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
              errorMsg={errors.email?.message}
            />
          </Label>

          <Label label={"Password"} className={s.SignUpFormLabel}>
            <FormInput
              type={"password"}
              control={control}
              rules={{ required: true }}
              name={"password"}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
              errorMsg={errors.password?.message}
            />
          </Label>

          <Label label={"Password confirmation"} className={s.SignUpFormLabel}>
            <FormInput
              type={"password"}
              shouldUnregister={true}
              control={control}
              rules={{ required: true }}
              name={"passwordConfirmation"}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
              errorMsg={errors.passwordConfirmation?.message}
            />
          </Label>

          <div className={s.CheckboxAgreementBlock}>
            <FormCheckbox
              control={control}
              name={"SignUpAgreement"}
              id={"SignUpAgreementCheckbox"}
              labelText={"I agree to the "}
              className={s.SignUpAgreementCheckbox}
              errorMsg={errors.SignUpAgreement?.message}
            />
            <Link className={s.SignUpAgreementLink} href={"/terms-and-conditions"}>Terms of Service</Link>
            <span className={s.SignUpAgreementSpan}>and</span> <Link className={s.SignUpAgreementLink}
                                                                     href={"/privacy-policy"}>Privacy Policy</Link>
          </div>

          <Button type={"submit"} className={s.SignUpButton} fullWidth>Sign Up</Button>
        </form>
        <Link className={s.SignUpHaveAccountLink} href={"/have-account"}>Do you have an account?</Link>
        <Link className={s.SignInLink} href={"/sign-in"}>Sign In</Link>
      </Card>
    </div>
  );
}
