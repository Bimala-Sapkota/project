import CategoryForm from "../../../components/admin/category/category.form"
import PageTitle from "../../../components/admin/page-title"

const CreteBrand = () => {
    return (
        <main className="h-full w-full">
            <PageTitle
                title="Add New Brand"
                link="/admin/brand"
                button_label='Back'
            />
            {/* category form */}
            <div className="bg-[#f8f8f8] h-full py-10 mt-10" >
                    <CategoryForm/>
            </div>


        </main>
    )
}

export default CreteBrand