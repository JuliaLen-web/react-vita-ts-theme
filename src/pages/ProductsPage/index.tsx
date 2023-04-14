import _ from "lodash";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../base-components/Button";
import { FormCheck, FormInline, FormInput, FormLabel, FormSelect, FormSwitch, FormTextarea } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Popover } from "../../base-components/Headless";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { userRoles } from "../../types/user";
import { fetchProducts } from "../../stores/action-creators/product";
import { selectUser } from "../../stores/userSlice";
import { selectProducts } from "../../stores/productSlice";
import ProductTable from "../../components/ProductTable";

function Main() {
  const { role } = useAppSelector(selectUser)
  const products = useAppSelector(selectProducts)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const accessSeller = (role === userRoles.Seller)
  const accessAdmin = (role === userRoles.Admin)

  const sellers = [...new Set(products.map(product => product.seller))]
  const categories = [...new Set(products.map(product => product.category))]

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

        {/* BEGIN: Data List -*/}
        <ProductTable />
        {/* END: Data List -*/}
      </div>
    </>
  );
}

export default Main;
