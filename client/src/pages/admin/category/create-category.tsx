import CategoryForm from "../../../components/admin/category/category.form"
import PageTitle from "../../../components/admin/page-title"

const CreteCategory = () => {
    return (
        <main className="h-full w-full">
            <PageTitle
                title="Add New Category"
                link="/admin/category"
                button_label='Back'
            />
            {/* category form */}
            <div className="bg-[#f8f8f8] h-full py-10 mt-10" >
                    <CategoryForm/>
            </div>


        </main>
    )
}

export default CreteCategory