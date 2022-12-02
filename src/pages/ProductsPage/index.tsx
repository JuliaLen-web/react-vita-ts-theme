import _ from "lodash";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
// import Pagination from "../../base-components/Pagination";
import { FormInput, FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Popover } from "../../base-components/Headless";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../stores/hooks";
import { selectUser, userRoles } from "../../stores/userSlice";
import ProductItem from "../../components/ProductItem";
import { Product, selectProducts } from "../../stores/productSlice";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);

  const [editProductModal, setEditProductModal] = useState(false);
  const editButtonRef = useRef(null);

  const [previewInfoModal, setPreviewInfoModal] = useState(false);

  const user = useAppSelector(selectUser)
  const productsSlice: Product[] = useAppSelector(selectProducts)

  const [products, setProducts] = useState([...productsSlice]);

  function productsByRole() {
    switch (user.role) {
      case userRoles.Manager:
        return setProducts(products => products.filter(product => product.status === "approved"))
      case userRoles.Seller:
        return setProducts(products => products.filter(product => product.seller === user.name))
      case userRoles.Customer:
        return setProducts(products => products.filter(product => product.status === "approved" && product.stock))
      default:
        return setProducts(products => products)
    }
  }

  useEffect(() => {
    productsByRole()
  }, [user.role])

  const sellers = [...new Set(productsSlice.map(product => product.seller))]
  const categories = [...new Set(products.map(product => product.category))]

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Products</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* filters block */}
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          {(user.role === userRoles.Admin || user.role === userRoles.Seller) &&
            <Link to="/add-product">
              <Button variant="primary" className="mr-2 shadow-md">
                Add New Product
              </Button>
            </Link>
          }
          {user.role === userRoles.Admin &&
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

          {user.role === userRoles.Admin &&
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
            user={user}
            userRoles={userRoles}
            setPreviewInfoModal={setPreviewInfoModal}
            setEditProductModal={setEditProductModal}
            setDeleteConfirmationModal={setDeleteConfirmationModal}
          />
        )}

        {/* BEGIN: Pagination */}
        {/* <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div> */}
        {/* END: Pagination */}
      </div>

      {/* BEGIN: View additional info Modal */}
      <Dialog
        open={previewInfoModal}
        onClose={() => {
          setPreviewInfoModal(false);
        }}
      >
        <Dialog.Panel>
          <div className="p-5">
            <div className="mt-5 text-3xl">Information about this product</div>
            <div className="mt-5">
              <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                <img
                  alt="Midone - HTML Admin Template"
                  className="rounded-md"
                  src={fakerData[0].images[0]}
                />
                {fakerData[0].trueFalse[0] && (
                  <span className="absolute top-0 z-10 px-2 py-1 m-5 text-xs text-white rounded bg-pending/80">
                    Featured
                  </span>
                )}
                <div className="absolute bottom-0 z-10 px-5 pb-6 text-white">
                  <a href="" className="block text-base font-medium">
                    {fakerData[0].products[0].name}
                  </a>
                  <span className="mt-3 text-xs text-white/90">
                    {fakerData[0].products[0].category}
                  </span>
                </div>
              </div>
              <div className="mt-5 text-slate-600 dark:text-slate-500">
                <div className="flex items-center">
                  <Lucide icon="Link" className="w-4 h-4 mr-2" /> Price: $
                  {fakerData[0].totals[0]}
                </div>
                <div className="flex items-center mt-2">
                  <Lucide icon="Layers" className="w-4 h-4 mr-2" />
                  {fakerData[0].statusStock[0]}
                </div>
                {(user.role === userRoles.Admin || user.role === userRoles.Seller) &&
                  <div className="flex items-center mt-2">
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                    Status:
                    {" " + fakerData[0].statusProduct[0]}
                  </div>
                }
                {user.role === userRoles.Admin &&
                  <div className="flex items-center mt-2">
                    <Lucide icon="Truck" className="w-4 h-4 mr-2" />{" "}
                    Seller:
                    {" " + fakerData[0].users[0].name}
                  </div>
                }
                <div className="flex mt-2">
                  <Lucide icon="MessageSquare" className="w-4 h-4 mr-2 mt-1" />{" "}
                  Description: You may want to consider destructuring the action creators and exporting them individually, for ease of searching for references in a larger codebase.
                </div>
                {user.role === userRoles.Customer &&
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
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setPreviewInfoModal(false);
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
                setPreviewInfoModal(false);
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
        open={editProductModal}
        onClose={() => {
          setEditProductModal(false);
        }}
        initialFocus={editButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide
              icon="Edit3"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to edit these records? <br />
              This process can be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setEditProductModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              ref={editButtonRef}
            >
              Edit
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Edit Product Modal */}


      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
        initialFocus={deleteButtonRef}
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
                setDeleteConfirmationModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              ref={deleteButtonRef}
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
