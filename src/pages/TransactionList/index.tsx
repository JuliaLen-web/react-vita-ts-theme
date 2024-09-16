import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormCheck, FormInput, FormSelect, FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Popover } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import TransactionItem from "../../components/TransactionItem";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { userRoles } from "../../types/user";
import { selectUser } from "../../stores/userSlice";
import { selectTransactions, selectTransactionsLoading } from "../../stores/transactionSlice";
import { useEffect } from "react";
import { fetchTransactions } from "../../stores/action-creators/transactions";
import TransactionTable from "../../components/TransactionTable";

function Main() {
  const user = useAppSelector(selectUser)

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Transaction List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
          <div className="flex w-full sm:w-auto">
            <div className="relative w-48 text-slate-500">
              <FormInput
                type="text"
                className="w-48 pr-10 !box"
                placeholder="Search by invoice..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
            <div className="ml-2">
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
          </div>
          <div className="hidden mx-auto xl:block text-slate-500">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="flex items-center w-full mt-3 xl:w-auto xl:mt-0">
            <Button variant="primary" className="mr-2 shadow-md">
              <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
              Excel
            </Button>
            <Button variant="primary" className="mr-2 shadow-md">
              <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to PDF
            </Button>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y 2xl:overflow-visible">
          <TransactionTable/>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
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
