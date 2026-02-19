import { SignUpOutput, autoSignIn } from "aws-amplify/auth";
import { redirect } from "next/navigation";

export async function handleSignUpStep(
  step: SignUpOutput["nextStep"],
  rawFormData: any
) {
  switch (step.signUpStep) {
    case "CONFIRM_SIGN_UP":
      redirect(`/login/sign-up-confirmation?email=${rawFormData.username}`);

    case "DONE":
      redirect("/home");

    // case "COMPLETE_AUTO_SIGN_IN":
    //   const codeDeliveryDetails = step.codeDeliveryDetails;
    //   if (codeDeliveryDetails) {
    // Redirect user to confirm-sign-up with link screen.
    //   }
    //   const signInOutput = await autoSignIn();
    // handle sign-in steps
  }
}
