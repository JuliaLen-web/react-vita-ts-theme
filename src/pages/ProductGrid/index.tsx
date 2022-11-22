import _ from "lodash";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect, FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu, Popover } from "../../base-components/Headless";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { loadUser, selectUser, userRoles } from "../../stores/userSlice";
import ProductItem from "../../components/ProductItem";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);

  const [editProductModal, setEditProductModal] = useState(false);
  const editButtonRef = useRef(null);

  const [previewInfoModal, setPreviewInfoModal] = useState(false);

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Product Grid</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          {(user.role === userRoles.Admin || user.role === userRoles.Seller) &&
            <Link to="/add-product">
              <Button variant="primary" className="mr-2 shadow-md">
                Add New Product
              </Button>
            </Link>
          }
          {user.role === userRoles.Admin &&
            < Link to="/categories">
              <Button variant="primary" className="mr-2 shadow-md">
                Add\Edit Categories
              </Button>
            </Link>
          }
          <div className="hidden mx-auto md:block text-slate-500">
            Showing 1 to 10 of 150 entries
          </div>

          {user.role === userRoles.Admin &&
            <div className="mr-2">
              <Popover className="inline-block">
                {(
                  <>
                    <Popover.Button as={Button} variant="primary">
                      Filter Sellers
                      <Lucide
                        icon="ChevronDown"
                        className="w-4 h-4 ml-2"
                      />
                    </Popover.Button>
                    <Popover.Panel placement="bottom-start">
                      <div>
                        {_.take(fakerData, 9).map((faker, fakerKey) => (
                          <div key={fakerKey} className="mb-2">
                            <FormSwitch className="w-full mt-3 sm:w-auto sm:mt-0">
                              <FormSwitch.Input
                                id={faker.users[0].name}
                                className="ml-1"
                                type="checkbox"
                              />
                              <FormSwitch.Label htmlFor={faker.users[0].name}>
                                {faker.users[0].name}
                              </FormSwitch.Label>
                            </FormSwitch>
                          </div>
                        ))}
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
                  </>
                )}
              </Popover>
            </div>
          }

          {/* BEGIN: Filter Categories */}
          <div className="mr-2">
            <Popover className="inline-block">
              {(
                <>
                  <Popover.Button as={Button} variant="primary">
                    Filter Categories
                    <Lucide
                      icon="ChevronDown"
                      className="w-4 h-4 ml-2"
                    />
                  </Popover.Button>
                  <Popover.Panel placement="bottom-start">
                    <div>
                      {_.take(fakerData).map((faker, fakerKey) => (
                        <div key={fakerKey} className="mb-2">
                          <FormSwitch className="w-full mt-3 sm:w-auto sm:mt-0">
                            <FormSwitch.Input
                              id={faker.categories[0].name}
                              className="ml-1"
                              type="checkbox"
                            />

                            <FormSwitch.Label htmlFor={faker.categories[0].name}>
                              {faker.categories[0].name}
                            </FormSwitch.Label>
                          </FormSwitch>
                        </div>
                      ))}
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
                </>
              )}
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

        {/* BEGIN: Users Layout */}
        {_.take(fakerData, 12).map((faker, fakerKey) => {
          if (user.role === userRoles.Admin) {
            return (
              <ProductItem
                user={user}
                userRoles={userRoles}
                faker={faker}
                key={fakerKey}
                setPreviewInfoModal={setPreviewInfoModal}
                setEditProductModal={setEditProductModal}
                setDeleteConfirmationModal={setDeleteConfirmationModal}
              />
            )
          } else if (faker.statusProduct[0] === "approved" && user.role === userRoles.Manager) {
            return (
              <ProductItem
                user={user}
                userRoles={userRoles}
                faker={faker}
                key={fakerKey}
                setPreviewInfoModal={setPreviewInfoModal}
                setEditProductModal={setEditProductModal}
                setDeleteConfirmationModal={setDeleteConfirmationModal}
              />
            )

          } else if (user.name === faker.users[0].name && user.role === userRoles.Seller) {
            return (
              <ProductItem
                user={user}
                userRoles={userRoles}
                faker={faker}
                key={fakerKey}
                setPreviewInfoModal={setPreviewInfoModal}
                setEditProductModal={setEditProductModal}
                setDeleteConfirmationModal={setDeleteConfirmationModal}
              />
            )
          } else if (faker.statusProduct[0] === "approved" && faker.statusStock[0] === "In Stock" && user.role === userRoles.Customer) {
            return (
              <ProductItem
                user={user}
                userRoles={userRoles}
                faker={faker}
                key={fakerKey}
                setPreviewInfoModal={setPreviewInfoModal}
                setEditProductModal={setEditProductModal}
                setDeleteConfirmationModal={setDeleteConfirmationModal}
              />
            )
          } else {
            return null
          }
        })}
        {/* END: Users Layout */}
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
          <div className="p-5 text-center">
            <Lucide
              icon="Maximize2"
              className="w-16 h-16 mx-auto mt-3"
            />
            <div className="mt-5 text-3xl">Information about this product</div>
            <div className="mt-2 text-slate-500">
              Do you really want to know about these records? <br />
              This process cannot be undone.
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
