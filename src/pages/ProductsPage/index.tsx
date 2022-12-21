import _ from "lodash";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../base-components/Button";
// import Pagination from "../../base-components/Pagination";
import { FormCheck, FormInline, FormInput, FormLabel, FormSelect, FormSwitch, FormTextarea } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Popover } from "../../base-components/Headless";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import ProductItem from "../../components/ProductItem";
import { userRoles } from "../../types/user";
import { deleteProduct, editProduct, fetchProducts } from "../../stores/action-creators/product";
import { selectUser } from "../../stores/userSlice";
import { selectProducts, selectProductsLoading } from "../../stores/productSlice";
import Tippy from "../../base-components/Tippy";
import LoadingIcon from "../../base-components/LoadingIcon";

function Main() {
  const { role } = useAppSelector(selectUser)
  const products = useAppSelector(selectProducts)
  const loading = useAppSelector(selectProductsLoading)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const accessSeller = (role === userRoles.Seller)
  const accessAdmin = (role === userRoles.Admin)
  const accessCustomer = (role === userRoles.Customer)

  const sellers = [...new Set(products.map(product => product.seller))]
  const categories = [...new Set(products.map(product => product.category))]

  const [selectProductId, setSelectProductId] = useState(0)

  const [deleteProductModal, setDeleteProductModal] = useState(false)
  function handleDeleteProductModal(value: boolean, id: number) {
    setDeleteProductModal(value)
    setSelectProductId(id)
  }

  const [editProductModal, setEditProductModal] = useState(false)
  function handleEditProductModal(value: boolean, id: number) {
    setEditProductModal(value)
    setSelectProductId(id)
  }

  const [previewProductModal, setPreviewProductModal] = useState(false)
  function handlePreviewProductModal(value: boolean, id: number) {
    setPreviewProductModal(value)
    setSelectProductId(id)
  }

  const productForModal = products.filter(el => el.id === selectProductId)[0]

  const { register, handleSubmit, reset, setValue } = useForm()

  const onSubmit = (data: any) => dispatch(editProduct(data))

  useEffect(() => {
    reset(productForModal)
  }, [productForModal])

  if (loading) {
    return (
      <h1 className="text-4xl flex items-center justify-center font-medium text-center intro-y">
        <LoadingIcon icon="hearts" className="w-20 h-20 mr-3" />Loading...
      </h1>
    )
  }

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Products</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* filters block */}
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          {(accessAdmin || accessSeller) &&
            <Link to="/add-product">
              <Button variant="primary" className="mr-2 shadow-md">
                Add New Product
              </Button>
            </Link>
          }
          {accessAdmin &&
            <Link to="/categories">
              <Button variant="primary" className="mr-2 shadow-md">
                Add\Edit Categories
              </Button>
            </Link>
          }
          <div className="hidden mx-auto md:block text-slate-500">
            Showing 1 to 10 of 150 entries
          </div>

          <Lucide
            icon="Sliders"
            className="w-6 h-6 mr-2"
          />

          {accessAdmin &&
            <div className="mr-2">
              <Popover className="inline-block">
                <Popover.Button as={Button} variant="primary">
                  Sellers
                  <Lucide
                    icon="ChevronDown"
                    className="w-4 h-4 ml-2"
                  />
                </Popover.Button>
                <Popover.Panel placement="bottom-start">
                  <div>
                    {sellers.map(seller =>
                      <div key={seller} className="mb-2">
                        <FormSwitch className="w-full mt-3 sm:w-auto sm:mt-0">
                          <FormSwitch.Input
                            id={seller}
                            className="ml-1"
                            type="checkbox"
                          />
                          <FormSwitch.Label htmlFor={seller}>
                            {seller}
                          </FormSwitch.Label>
                        </FormSwitch>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Button
                        variant="primary"
                        className="w-32 ml-2"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          }

          {/* BEGIN: Filter Categories */}
          <div className="mr-2">
            <Popover className="inline-block">
              <Popover.Button as={Button} variant="primary">
                Categories
                <Lucide
                  icon="ChevronDown"
                  className="w-4 h-4 ml-2"
                />
              </Popover.Button>
              <Popover.Panel placement="bottom-start">
                <div>
                  {categories.map(category =>
                    <div key={category} className="mb-2">
                      <FormSwitch className="w-full mt-3 sm:w-auto sm:mt-0">
                        <FormSwitch.Input
                          id={category}
                          className="ml-1"
                          type="checkbox"
                        />
                        <FormSwitch.Label htmlFor={category}>
                          {category}
                        </FormSwitch.Label>
                      </FormSwitch>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Button
                      variant="primary"
                      className="w-32 ml-2"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
          {/* END: Filter Categories */}

          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* filters block */}

        {products.map(product =>
          <ProductItem
            product={product}
            key={product.id}
            onPreview={handlePreviewProductModal}
            onEdit={(accessAdmin || accessSeller) ? handleEditProductModal : undefined}
            onDelete={(accessAdmin || accessSeller) ? handleDeleteProductModal : undefined}
            admin={accessAdmin}
            seller={accessSeller}
            customer={accessCustomer}
          />
        )}
      </div>

      {/* BEGIN: View additional info Modal */}
      <Dialog
        open={previewProductModal}
        onClose={() => {
          setPreviewProductModal(true)
        }}
      >
        <Dialog.Panel>
          <div className="p-5">
            <div className="mt-5 text-3xl">Information about this product</div>
            {productForModal &&
              <div className="mt-5">
                <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                  <img
                    alt="Midone - HTML Admin Template"
                    className="rounded-md"
                    src={productForModal.image}
                  />
                  {productForModal.featured && (
                    <span className="absolute top-0 z-10 px-2 py-1 m-5 text-xs text-white rounded bg-pending/80">
                      Featured
                    </span>
                  )}
                  <div className="absolute bottom-0 z-10 px-5 pb-6 text-white">
                    <a href="" className="block text-base font-medium">
                      {productForModal.name}
                    </a>
                    <span className="mt-3 text-xs text-white/90">
                      {productForModal.category}
                    </span>
                  </div>
                </div>
                <div className="mt-5 text-slate-600 dark:text-slate-500">
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Price: $
                    {productForModal.price}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" />
                    {productForModal.stock ? 'In Stock' : 'Out of stock'}
                  </div>
                  {(accessAdmin || accessSeller) &&
                    <div className="flex items-center mt-2">
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                      Status:
                      {" " + productForModal.status}
                    </div>
                  }
                  {accessAdmin &&
                    <div className="flex items-center mt-2">
                      <Lucide icon="Truck" className="w-4 h-4 mr-2" />{" "}
                      Seller:
                      {" " + productForModal.seller}
                    </div>
                  }
                  <div className="flex mt-2">
                    <Lucide icon="MessageSquare" className="w-4 h-4 mr-2 mt-1" />{" "}
                    {" " + productForModal.description}
                  </div>
                  {accessCustomer &&
                    <div
                      className="text-center mt-4">
                      <Button
                        type="button"
                        variant="primary"
                        className="w-full"
                      >
                        Buy
                      </Button>
                    </div>
                  }
                </div>
              </div>
            }

          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="danger"
              type="button"
              className="w-24"
              onClick={() => {
                setPreviewProductModal(false)
              }}
            >
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: View additional info Modal */}

      {/* BEGIN: Edit Product Modal */}
      <Dialog
        size="xl"
        open={editProductModal}
        onClose={() => {
          setEditProductModal(false)
        }}
      >
        <Dialog.Panel>
          <form onSubmit={handleSubmit(onSubmit)}>
            {productForModal &&
              <div className="p-5 pb-10 xl:pb-5 text-center overflow-y-auto xl:overflow-hidden h-[500px] xl:h-auto">
                <FormInline className="flex-col items-start xl:mt-8 xl:flex-row">
                  <FormLabel className="w-full xl:w-48 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Photos</div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <div>
                          The image format is .jpg .jpeg .png and a minimum size
                          of 300 x 300 pixels (For optimal images use a minimum
                          size of 700 x 700 pixels).
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400">
                    <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                      <div
                        className="relative col-span-5 cursor-pointer col-span-2 md:h-20 h-14 image-fit zoom-in"
                      >
                        <img
                          className="rounded-md"
                          alt="Midone - HTML Admin Template"
                          src={productForModal.image}
                        />
                        <Tippy
                          content="Remove this image?"
                          className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger"
                        >
                          <Lucide icon="X" className="w-4 h-4" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="mr-1 text-primary">
                        Upload a file
                      </span>{" "}
                      or drag and drop
                      <FormInput
                        id="horizontal-form-1"
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </div>
                  </div>
                </FormInline>

                <FormInline className="flex-col items-start pt-5 sm:pt-2 xl:mt-4 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-48 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Name</div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                      {...register("name")}
                      id="product-name"
                      type="text"
                      placeholder="Product name"
                    />
                  </div>
                </FormInline>

                <FormInline className="flex-col items-start pt-5 sm:pt-2 xl:mt-4 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-48 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Category</div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSelect id="category" {...register("category")}>
                      {categories.map(category => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </FormSelect>
                  </div>
                </FormInline>

                <FormInline className="flex-col items-start pt-5 sm:pt-2 xl:mt-4 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-48 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Publication status</div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="flex flex-col sm:flex-row">
                      <FormCheck className="mr-4">
                        <FormCheck.Input
                          name="status"
                          id="moderation"
                          type="radio"
                          value="moderation"
                          defaultChecked={productForModal.status === "moderation"}
                          onChange={(e) => (e.target.checked) ? setValue('status', e.target.value) : false}
                        />
                        <FormCheck.Label htmlFor="moderation">
                          Moderation
                        </FormCheck.Label>
                      </FormCheck>
                      <FormCheck className="mt-2 mr-4 sm:mt-0">
                        <FormCheck.Input
                          name="status"
                          id="rejected"
                          type="radio"
                          value="rejected"
                          defaultChecked={productForModal.status === "rejected"}
                          onChange={(e) => (e.target.checked) ? setValue('status', e.target.value) : false}
                        />
                        <FormCheck.Label htmlFor="rejected">
                          Rejected
                        </FormCheck.Label>
                      </FormCheck>
                      <FormCheck className="mt-2 mr-4 sm:mt-0">
                        <FormCheck.Input
                          name="status"
                          id="approved"
                          type="radio"
                          value="approved"
                          defaultChecked={productForModal.status === "approved"}
                          onChange={(e) => (e.target.checked) ? setValue('status', e.target.value) : false}
                        />
                        <FormCheck.Label htmlFor="approved">
                          Approved
                        </FormCheck.Label>
                      </FormCheck>
                    </div>
                  </div>
                </FormInline>

                <FormInline className="flex-col items-start pt-5 sm:pt-2 xl:mt-4 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-48 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Stock</div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="flex flex-col sm:flex-row">
                      <FormCheck className="mr-4">
                        <FormCheck.Input
                          id="in-stock"
                          type="radio"
                          value={true}
                          name="stock"
                          defaultChecked={productForModal.stock}
                          onChange={(e) => (e.target.checked) ? setValue('stock', true) : false}
                        />
                        <FormCheck.Label htmlFor="in-stock">
                          In stock
                        </FormCheck.Label>
                      </FormCheck>
                      <FormCheck className="mt-2 mr-4 sm:mt-0">
                        <FormCheck.Input
                          id="out-stock"
                          type="radio"
                          value={false}
                          name="stock"
                          defaultChecked={!productForModal.stock}
                          onChange={(e) => (e.target.checked) ? setValue('stock', false) : false}
                        />
                        <FormCheck.Label htmlFor="out-stock">
                          Out of stock
                        </FormCheck.Label>
                      </FormCheck>
                    </div>
                  </div>
                </FormInline>

                <FormInline className="flex-col items-start pt-5 sm:pt-2 xl:mt-4 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-48 xl:!mr-10">
                    <div className="text-left">
                      <div>
                        <div className="font-medium">
                          Price
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                      {...register("price")}
                      id="price"
                      type="number"
                      placeholder="Input price"
                    />
                  </div>
                </FormInline>

                <FormInline className="flex-col items-start pt-5 sm:pt-2 xl:mt-4 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-48 xl:!mr-10">
                    <div className="text-left">
                      <div>
                        <div className="font-medium">Product Description</div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormTextarea
                      {...register("description")}
                      id="product-description"
                      placeholder="Product description"
                    />
                  </div>
                </FormInline>
              </div>
            }

            <div className="px-5 pt-2 pb-8 text-center shadow-[0px_3px_5px_5px_#0000000b] xl:shadow-none">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => {
                  setEditProductModal(false)
                }}
                className="w-24 mr-1"
              >
                Cancel
              </Button>
              <Button
                variant="success"
                type="submit"
                className="w-24"
                onClick={() => {
                  setEditProductModal(false)
                }}
              >
                Edit
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
      {/* END: Edit Product Modal */}

      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteProductModal}
        onClose={() => {
          setDeleteProductModal(false)
        }}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteProductModal(false)
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              onClick={() => {
                setDeleteProductModal(false)
                dispatch(deleteProduct(selectProductId))
              }}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
