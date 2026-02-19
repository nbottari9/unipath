// "use server";

// import {
//   cookieBasedClient,
//   runWithAmplifyServerContext,
// } from "@/utils/amplifyServerUtils";
// import { Amplify } from "aws-amplify";
// import { autoSignIn, confirmSignUp, signUp } from "aws-amplify/auth";
// import { redirect } from "next/navigation";
// import config from "ROOT/amplify_outputs.json";
// import { handleSignUpStep } from "@/utils/auth/signUpUtils";

// Amplify.configure(config, { ssr: true });
// export async function signUpWithEmail(formData: FormData) {
//   const rawFormData = {
//     username: formData.get("email") as string,
//     password: formData.get("password") as string,
//     name: formData.get("name") as string,
//     institution: formData.get("institution") as string,
//   };

//   try {
//     const { isSignUpComplete, nextStep } = await signUp({
//       username: rawFormData.username,
//       password: rawFormData.password,
//       options: {
//         userAttributes: {
//           name: rawFormData.name,
//           "custom:institution": rawFormData.institution,
//         },
//         clientMetadata: {
//           institution: rawFormData.institution,
//         },
//       },
//     });

//     if (!isSignUpComplete) {
//       handleSignUpStep(nextStep, rawFormData);
//     }
//     redirect("/home");
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function submitSignUpConfirmationCode(
//   email: string,
//   formData: FormData
// ) {
//   const rawFormData = {
//     username: email,
//     confirmationCode: formData.get("confirmationCode") as string,
//   };

//   const { nextStep } = await confirmSignUp({
//     username: rawFormData.username,
//     confirmationCode: rawFormData.confirmationCode,
//   });

//   handleSignUpStep(nextStep, rawFormData);
// }
