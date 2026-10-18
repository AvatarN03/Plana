import { auth } from "@clerk/nextjs/server";
import OrgControl from "./_components/org-control";
function toStartCase(str: string) {
    return str
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .trim();
}

export async function generateMetadata() {
    const { orgSlug } = await auth();

    const cleanSlug = orgSlug?.split("-")[0] || "";

    return {
        title: toStartCase(cleanSlug) || "Organization"
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