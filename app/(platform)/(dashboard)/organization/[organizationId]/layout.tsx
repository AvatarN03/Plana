import { auth } from "@clerk/nextjs/server";
import OrgControl from "./_components/org-control";
import { startCase } from "lodash";


export async function generateMetadata() {
    const { orgSlug } = await auth();
    console.log(orgSlug);

    const cleanSlug = orgSlug?.split("-")[0] || "";

    return {
        title: startCase(cleanSlug) || "Organization"
    };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <OrgControl />

            {children}
        </>
    )
}

export default OrganizationIdLayout;