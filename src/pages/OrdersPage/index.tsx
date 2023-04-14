import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect, FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Popover } from "../../base-components/Headless";
import { useAppSelector } from "../../stores/hooks";
import { userRoles } from "../../types/user";
import { selectUser } from "../../stores/userSlice";
import OrderTable from "../../components/OrderTable";

function Main() {
  const { role } = useAppSelector(selectUser)

  const accessAdmin = (role === userRoles.Admin)
  const accessManager = (role === userRoles.Manager)

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Orders</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Lucide
            icon="Sliders"
            className="w-6 h-6 mr-2"
          />

          {/* BEGIN: Filter Customers */}
          {(accessAdmin || accessManager) &&
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
          {accessAdmin &&
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
          <OrderTable />
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
    </>
  );
}

export default Main;
