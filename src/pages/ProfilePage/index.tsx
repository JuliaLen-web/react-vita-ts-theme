import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Menu, Tab } from "../../base-components/Headless";
import { Tab as HeadlessTab } from "@headlessui/react";
import OrderItem from "../../components/OrderItem";
import { selectUser, userRoles } from "../../stores/userSlice";
import { useAppSelector } from "../../stores/hooks";
import Table from "../../base-components/Table";
import ProductItem from "../../components/ProductItem";

function Main() {

  const user = useAppSelector(selectUser)

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Profile Layout</h2>
      </div>
      <Tab.Group>
        {/* BEGIN: Profile Info */}
        <div className="px-5 pt-5 mt-5 intro-y box">
          <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
            <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
              <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src={fakerData[0].photos[0]}
                />
                <div className="absolute bottom-0 right-0 flex items-center justify-center p-2 mb-1 mr-1 rounded-full bg-primary">
                  <Lucide icon="Camera" className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-5">
                <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                  {fakerData[0].users[0].name}
                </div>
                <div className="text-slate-500">{fakerData[0].jobs[0]}</div>
              </div>
            </div>
            <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3">
                Contact Details
              </div>
              <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                <div className="flex items-center truncate sm:whitespace-normal">
                  <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                  {fakerData[0].users[0].email}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Instagram" className="w-4 h-4 mr-2" /> Instagram
                  {fakerData[0].users[0].name}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Twitter" className="w-4 h-4 mr-2" /> Twitter
                  {fakerData[0].users[0].name}
                </div>
              </div>
            </div>
          </div>
          <Tab.List
            variant="link-tabs"
            className="flex-col justify-center text-center sm:flex-row lg:justify-start"
          >
            <Tab fullWidth={false}>
              <Tab.Button className="py-4 cursor-pointer">Dashboard</Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="py-4 cursor-pointer">
                Account & Profile
              </Tab.Button>
            </Tab>
          </Tab.List>
        </div>
        {/* END: Profile Info */}
        <Tab.Panels className="mt-5 intro-y">
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">

              {/* BEGIN: Products */}
              <Tab.Group className="col-span-12 intro-y box">
                <div>
                  <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">
                      Products
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 gap-6 mt-5">
                    {_.take(fakerData, 12).map((faker, fakerKey) => (
                      <ProductItem
                        faker={faker}
                        key={fakerKey}
                        user={user}
                        userRoles={userRoles}
                        // setPreviewInfoModal={setPreviewInfoModal}
                        // setEditProductModal={setEditProductModal}
                        // setDeleteConfirmationModal={setDeleteConfirmationModal}
                      />
                    ))}
                  </div>
                  </div>
                
              </Tab.Group>
              {/* END: Products */}
              {/* BEGIN: Orders */}
              <div className="col-span-12 intro-y box">
                <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Orders
                  </h2>
                </div>
                <div className="p-5">
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
                            BUYER
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
                      {_.take(fakerData, 30).map((faker, fakerKey) => (
                        <OrderItem
                          key={fakerKey}
                          faker={faker}
                          user={user}
                          userRoles={userRoles}
                        // setPreviewInfoModal={setPreviewInfoModal}
                        // setEditOrderModal={setEditOrderModal}
                        // setDeleteConfirmationModal={setDeleteConfirmationModal}
                        />)
                      )}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>
              {/* END: Orders */}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">
              {/* BEGIN: Edit Password */}
              <Tab.Group className="col-span-12 intro-y box lg:col-span-6">
                <div className="col-span-12 intro-y box">
                  <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">
                      Edit Password
                    </h2>
                  </div>
                </div>
              </Tab.Group>
              {/* END: Edit Password */}
              {/* BEGIN: Edit Main Information */}
              <Tab.Group className="col-span-12 intro-y box lg:col-span-6">
                <div className="col-span-12 intro-y box">
                  <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">
                      Edit Main Information
                    </h2>
                  </div>
                </div>
              </Tab.Group>
              {/* END: Edit Main Information */}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default Main;
