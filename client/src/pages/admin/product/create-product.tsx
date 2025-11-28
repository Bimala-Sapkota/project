import PageTitle from "../../../components/admin/page-title"
import ProductForm from "../../../components/admin/product/product.form"

const CreteProduct = () => {
    return (
        <main className="h-full w-full min-h-screen pb-10">
            <PageTitle
                title="Add New Product"
                link="/admin/products"
                button_label='Back'
            />
            {/* product form */}
            <div className="bg-[#f8f8f8] h-full py-10 mt-10" >
                    <ProductForm/>
            </div>


        </main>
    )
}

export default CreteProduct