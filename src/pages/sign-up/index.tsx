import clsx from "clsx";
import {
  Card,
  FormCheckbox,
  Checkbox,
  FormInput,
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
  Label
} from "@robur_/ui-kit";
import s from "./Signup.module.scss";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register
    , handleSubmit,
    control
  }
    = useForm();

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
        <form className={s.SignUpForm}>
          <Label label={"Username"} className={s.SignUpFormLabel}>
            <FormInput
              type="text"
              control={control}
              rules={{ required: true }}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
              name={"username"}
            />
          </Label>

          <Label label={"Email"} className={s.SignUpFormLabel}>
            <FormInput
              type="email"
              control={control}
              rules={{ required: true }}
              name={"email"}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
            />
          </Label>

          <Label label={"Password"} className={s.SignUpFormLabel}>
            <FormInput
              type={"password"}
              control={control}
              rules={{ required: true }}
              name={"password"}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
            />
          </Label>

          <Label label={"Password confirmation"} className={s.SignUpFormLabel}>
            <FormInput
              type={"password"}
              shouldUnregister={true}
              control={control}
              rules={{ required: true }}
              name={"password"}
              className={clsx(s.SignUpFormInput, s.BorderBack)}
            />
          </Label>
        </form>

        <Checkbox
          // control={control}
          name={"SignUpAgreement"}
          id={"SignUpAgreementCheckbox"}
          labelText={"I agree to the "}
          className={s.SignUpAgreementCheckbox}
        />

      </Card>
    </div>
  );
}
