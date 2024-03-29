import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect, FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Menu, Popover } from "../../base-components/Headless";
import { Link } from "react-router-dom";
import { selectUser } from "../../stores/userSlice";
import { useAppSelector } from "../../stores/hooks";
import { userRoles } from "../../types/user";

function Main() {
  const { role } = useAppSelector(selectUser)
  const accessAdmin = (role === userRoles.Admin)

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Users Layout</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md">
            Add New User
          </Button>
          {accessAdmin &&
            <div className="mr-2">
              <Popover className="inline-block">
                <Popover.Button as={Button} variant="primary">
                  Role
                  <Lucide
                    icon="ChevronDown"
                    className="w-4 h-4 ml-2"
                  />
                </Popover.Button>
                <Popover.Panel placement="bottom-start">
                  <div>
                    {/* {sellers.map(seller =>
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
                    )} */}
                    <div className="flex items-center">
                      <Button
                        variant="primary"
                        className="w-32 ml-2"
                      >
                        Filter
                      </Button>
                    </div>
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          }
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

        
        {/* BEGIN: Users Layout */}
        {_.take(fakerData, 10).map((faker, fakerKey) => (
          <div key={fakerKey} className="col-span-12 intro-y md:col-span-6">
            <div className="box">
              <div className="flex flex-col items-center p-5 lg:flex-row">
                <div className="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src={faker.photos[0]}
                  />
                </div>
                <div className="mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
                  <a href="" className="font-medium">
                    {faker.users[0].name}
                  </a>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {faker.jobs[0]}
                  </div>
                </div>
                <Link to="/profile-page" className="flex mt-4 lg:mt-0">
                  <Button variant="outline-secondary" className="px-2 py-1">
                    Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* BEGIN: Users Layout */}
        {/* END: Pagination */}
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
        {/* END: Pagination */}
      </div>
    </>
  );
}

export default Main;
