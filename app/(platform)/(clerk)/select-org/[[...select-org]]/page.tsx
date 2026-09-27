import { OrganizationList } from "@clerk/nextjs"

const CreateOrganization = ()=>{
    return <OrganizationList 
        hidePersonal
        afterCreateOrganizationUrl={"/organization/:id"}
        afterSelectOrganizationUrl={"/organization/:id"}
    />
}

export default CreateOrganization;