"use client";
// React
import * as React from "react";

// Next.js
import { useRouter, useSearchParams } from "next/navigation";

// AWS
import { Authenticator, Image, Autocomplete, ComboBoxOption, Flex, Heading, HighlightMatch, Text, TextField, useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "@/components/Layouts/Copyright";
import { signUp, SignUpInput } from "aws-amplify/auth";
import { useCallback, useEffect, useState } from "react";
import { Schema } from "ROOT/amplify/data/resource";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { convertoOrgTypeToComboBoxOption } from "@/utils/json/jsonUtils";

// Page: SignInPage;
function SignInPage() {
    const router = useRouter();
    const nextQuery = useSearchParams()
    const redirectPage = nextQuery.get("next")

    const { route } = useAuthenticator((context) => [context.route]);
    useEffect(() => {
        if (route === "authenticated") {
            router.replace(redirectPage || "/");
        }
    }, [route, router, redirectPage]);


    const [orgs, setOrgs] = useState<ComboBoxOption[]>()
    const [selectedOrgId, setSelectedOrgId] = useState<Schema["Organization"]["type"]["id"]>()
    const getOrgs = useCallback(async () => {
        const data = await fetch("http://localhost:3000/api/orgs")
        const orgs = await data.json()
        const orgsWithLabelField = convertoOrgTypeToComboBoxOption(orgs.orgs) //needed for the autocomplete component
        setOrgs(orgsWithLabelField)
    }, [setOrgs])

    useEffect(() => {
        getOrgs()
    }, [getOrgs])


    const renderOption = (option: ComboBoxOption, value: string) => {
        const { label, id } = option
        return (
            <Flex>
                <Text variation="primary">{label}</Text>
                <Text variation="secondary">{id}</Text>
            </Flex>
        )
    }


    //Custom Authenticator Styling
    const components = {
        Header() {
            const theme = useTheme();
            return (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: theme.spacing(2),
                    }}
                >
                    <Image
                        src={"/logo.png"}
                        width={200}
                        height={50}
                        alt={"logo"}
                    />
                </Box>
            )
        },
        Footer() {
            return (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,

                    }}
                >
                    {/* <Copyright /> */}
                </Box>
            )
        },
        SignUp: {
            FormFields() {
                return (
                    <>
                        <Authenticator.SignUp.FormFields />
                        <Box>
                            <Autocomplete label="School" placeholder="Start typing to find your school" options={orgs!} renderOption={renderOption} onSelect={handleOnSelect} />
                            <textarea readOnly name="custom:institution" value={selectedOrgId!} hidden></textarea>
                        </Box>
                    </>
                )
            },
            Header() {
                return (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Heading level={3} >Create a new account</Heading>
                    </Box>
                )
            }
        }
    }

    const formFields = {
        signUp: {
            name: {
                order: 1
            },
            email: {
                order: 2
            },
            password: {
                order: 3
            },
            confirm_password: {
                order: 4
            }
        }
    }

    const handleOnSelect = (option: ComboBoxOption) => {
        setSelectedOrgId(option.id)
    }
    return (
        <Authenticator
            services={{
                async handleSignUp(input: SignUpInput) {
                    const { password, username, options } = input
                    console.log(options)
                    return signUp({
                        username,
                        password,
                        options: {
                            userAttributes: {
                                name: options?.userAttributes["name"],
                                "custom:institution": options?.userAttributes["custom:institution"],
                            },
                            clientMetadata: {
                                institution: options!.userAttributes["custom:institution"]! //bad
                            }
                        },

                    })
                },
            }}
            socialProviders={["google"]}
            initialState={"signIn"}
            components={{ SignUp: components.SignUp, Footer: components.Footer, Header: components.Header }}
            formFields={formFields}
            loginMechanisms={["email"]}

        />
    )
}

export default SignInPage
