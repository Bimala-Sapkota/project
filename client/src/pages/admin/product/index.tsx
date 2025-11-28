import PageTitle from '../../../components/admin/page-title'

function Products() {
  return (
    <div>
      <PageTitle 
        title="Products"
        link="/admin/add/product"
        button_label='Add Product'
      />

      {/* list / table */}
    </div>
  )
}

export default Products