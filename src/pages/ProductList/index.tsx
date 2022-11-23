import _ from "lodash";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect, FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Popover } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import OrderItem from "../../components/OrderItem";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { loadUser, selectUser, userRoles } from "../../stores/userSlice";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);

  const [editOrderModal, setEditOrderModal] = useState(false);
  const editButtonRef = useRef(null);

  const [previewInfoModal, setPreviewInfoModal] = useState(false);

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Product List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Lucide
            icon="Sliders"
            className="w-6 h-6 mr-2"
          />

          {/* BEGIN: Filter Customers */}
          {(user.role === userRoles.Admin || user.role === userRoles.Manager) &&
            <div className="mr-2">
              <Popover className="inline-block">
                {(
                  <>
                    <Popover.Button as={Button} variant="primary">
                      Customers
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
          }

          {/* END: Filter Customers */}
          {/* BEGIN: Filter Sellers */}
          {user.role === userRoles.Admin &&
            <div className="mr-2">
              <Popover className="inline-block">
                {(
                  <>
                    <Popover.Button as={Button} variant="primary">
                      Sellers
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
          }
          {/* END: Filter Sellers */}

          {/* BEGIN: Filter Date */}
          <div className="mr-2">
            <Popover className="inline-block">
              {(
                <>
                  <Popover.Button as={Button} variant="primary">
                    Date
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
          {/* END: Filter Date */}
          {/* BEGIN: Filter Sum */}
          <div className="mr-2">
            <Popover className="inline-block">
              {(
                <>
                  <Popover.Button as={Button} variant="primary">
                    Sum
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
          {/* END: Filter Sum */}
          {/* BEGIN: Filter Status */}
          <div className="mr-2">
            <Popover className="inline-block">
              {(
                <>
                  <Popover.Button as={Button} variant="primary">
                    Status
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
          {/* END: Filter Status */}


          <div className="hidden mx-auto md:block text-slate-500">
            Showing 1 to 10 of 150 entries
          </div>
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
        {/* BEGIN: Data List -*/}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  IMAGE
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  PRODUCT NAME
                </Table.Th>
                {(user.role === userRoles.Admin || user.role === userRoles.Manager) &&
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    CUSTOMER
                  </Table.Th>
                }
                {user.role === userRoles.Admin &&
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    SELLER
                  </Table.Th>
                }
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STOCK
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  PRICE
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  DATE
                </Table.Th>
                {user.role !== userRoles.Seller &&
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    ACTIONS
                  </Table.Th>
                }

              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {_.take(fakerData, 30).map((faker, fakerKey) => {
                if (user.role === userRoles.Admin) {
                  return (
                    <OrderItem
                      key={fakerKey}
                      faker={faker}
                      user={user}
                      userRoles={userRoles}
                      setPreviewInfoModal={setPreviewInfoModal}
                      setEditOrderModal={setEditOrderModal}
                      setDeleteConfirmationModal={setDeleteConfirmationModal}
                    />)
                } else if (user.role === userRoles.Manager) {
                  return (
                    <OrderItem
                      key={fakerKey}
                      faker={faker}
                      user={user}
                      userRoles={userRoles}
                      setPreviewInfoModal={setPreviewInfoModal}
                      setEditOrderModal={setEditOrderModal}
                      setDeleteConfirmationModal={setDeleteConfirmationModal}
                    />
                  )

                } else if (user.name === faker.users[1].name && user.role === userRoles.Seller) {
                  return (
                    <OrderItem
                      key={fakerKey}
                      faker={faker}
                      user={user}
                      userRoles={userRoles}
                      setPreviewInfoModal={setPreviewInfoModal}
                      setEditOrderModal={setEditOrderModal}
                      setDeleteConfirmationModal={setDeleteConfirmationModal}
                    />)
                } else if (user.name === faker.users[0].name && user.role === userRoles.Customer) {
                  return (
                    <OrderItem
                      key={fakerKey}
                      faker={faker}
                      user={user}
                      userRoles={userRoles}
                      setPreviewInfoModal={setPreviewInfoModal}
                      setEditOrderModal={setEditOrderModal}
                      setDeleteConfirmationModal={setDeleteConfirmationModal}
                    />)
                } else {
                  return null
                }
              })}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List -*/}
        {/* BEGIN: Pagination -*/}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
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
        </div>
        {/* END: Pagination -*/}
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

      {/* BEGIN: Edit Order Modal */}
      <Dialog
        open={editOrderModal}
        onClose={() => {
          setEditOrderModal(false);
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
                setEditOrderModal(false);
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
      {/* END: Edit Order Modal */}
      {/* BEGIN: Delete Confirmation Modal -*/}
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
      {/* END: Delete Confirmation Modal -*/}
    </>
  );
}

export default Main;
