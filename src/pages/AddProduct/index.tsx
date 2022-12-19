import _ from "lodash";
import { useState } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormInline,
  FormSelect,
  FormLabel,
  FormHelp,
  FormCheck,
  InputGroup,
  FormSwitch,
} from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";
import { ClassicEditor } from "../../base-components/Ckeditor";
import Alert from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import Table from "../../base-components/Table";

function Main() {
  const [subcategory, setSubcategory] = useState(["0"]);
  const [editorData, setEditorData] = useState("<p>Content of the editor.</p>");

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Add Product</h2>
      </div>
      <div className="grid grid-cols-11 pb-20 mt-5 gap-x-6">
        {/* BEGIN: Notification */}
        <Alert
          variant="primary"
          dismissible
          className="col-span-11 mb-6 intro-y box dark:border-darkmode-600"
        >
          {({ dismiss }) => (
            <>
              <div className="flex items-center">
                <span>
                  <Lucide icon="Info" className="w-4 h-4 mr-2" />
                </span>
                <span>
                  Starting May 10, 2021, there will be changes to the Terms &
                  Conditions regarding the number of products that may be added
                  by the Seller.
                  <a
                    href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
                    className="ml-1 underline"
                    target="blank"
                  >
                    Learn More
                  </a>
                </span>
                <Alert.DismissButton
                  className="text-white"
                  onClick={dismiss}
                  aria-label="Close"
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </Alert.DismissButton>
              </div>
            </>
          )}
        </Alert>
        {/* BEGIN: Notification */}
        <div className="col-span-11 intro-y 2xl:col-span-9">
          {/* BEGIN: Uplaod Product */}
          <div className="p-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Upload
                Product
              </div>
              <div className="mt-5">
                <div className="flex items-center text-slate-500">
                  <span>
                    <Lucide icon="Lightbulb" className="w-5 h-5 text-warning" />
                  </span>
                  <div className="ml-2">
                    <span className="mr-1">
                      Avoid selling counterfeit products / violating
                      Intellectual Property Rights, so that your products are
                      not deleted.
                    </span>
                    <a
                      href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
                      className="font-medium text-primary"
                      target="blank"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
                <FormInline className="flex-col items-start mt-10 xl:flex-row">
                  <FormLabel className="w-full xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Photos</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <div>
                          The image format is .jpg .jpeg .png and a minimum size
                          of 300 x 300 pixels (For optimal images use a minimum
                          size of 700 x 700 pixels).
                        </div>
                        <div className="mt-2">
                          Select product photos or drag and drop up to 5 photos
                          at once here. Include min. 3 attractive photos to make
                          the product more attractive to buyers.
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400">
                    <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                      {_.take(fakerData, 5).map((faker, fakerKey) => (
                        <div
                          key={fakerKey}
                          className="relative col-span-5 cursor-pointer md:col-span-2 h-28 image-fit zoom-in"
                        >
                          <img
                            className="rounded-md"
                            alt="Midone - HTML Admin Template"
                            src={faker.photos[0]}
                          />
                          <Tippy
                            content="Remove this image?"
                            className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger"
                          >
                            <Lucide icon="X" className="w-4 h-4" />
                          </Tippy>
                        </div>
                      ))}
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
              </div>
            </div>
          </div>
          {/* END: Uplaod Product */}
          {/* BEGIN: Product Information */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Information
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Name</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        Include min. 40 characters to make it more attractive
                        and easy for buyers to find, consisting of product type,
                        brand, and information such as color, material, or type.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                      id="product-name"
                      type="text"
                      placeholder="Product name"
                    />
                    <FormHelp className="text-right">
                      Maximum character 0/70
                    </FormHelp>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Category</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSelect id="category">
                      {_.take(fakerData, 9).map((faker, fakerKey) => (
                        <option key={fakerKey} value={faker.categories[0].name}>
                          {faker.categories[0].name}
                        </option>
                      ))}
                    </FormSelect>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Product Information */}
          {/* BEGIN: Product Detail */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Detail
              </div>
              <div className="mt-5">

                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Description</div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                      id="product-description"
                      type="text"
                      placeholder="Product description"
                    />
                    <FormHelp className="text-right">
                      Maximum character 0/70
                    </FormHelp>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Product Detail */}
          {/* BEGIN: Product Management */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Management
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Publication status</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="flex flex-col sm:flex-row">
                      <FormCheck className="mr-4">
                        <FormCheck.Input
                          id="moderation"
                          type="radio"
                          name="status-publication"
                        />
                        <FormCheck.Label htmlFor="moderation">
                          Moderation
                        </FormCheck.Label>
                      </FormCheck>
                      <FormCheck className="mt-2 mr-4 sm:mt-0">
                        <FormCheck.Input
                          id="rejected"
                          type="radio"
                          name="status-publication"
                        />
                        <FormCheck.Label htmlFor="rejected">
                          Rejected
                        </FormCheck.Label>
                      </FormCheck>
                      <FormCheck className="mt-2 mr-4 sm:mt-0">
                        <FormCheck.Input
                          id="approved"
                          type="radio"
                          name="status-publication"
                        />
                        <FormCheck.Label htmlFor="approved">
                          Approved
                        </FormCheck.Label>
                      </FormCheck>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Stock</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="flex flex-col sm:flex-row">
                      <FormCheck className="mr-4">
                        <FormCheck.Input
                          id="in-stock"
                          type="radio"
                          name="status-stock"
                        />
                        <FormCheck.Label htmlFor="in-stock">
                          In of stock
                        </FormCheck.Label>
                      </FormCheck>
                      <FormCheck className="mt-2 mr-4 sm:mt-0">
                        <FormCheck.Input
                          id="out-stock"
                          type="radio"
                          name="status-stock"
                        />
                        <FormCheck.Label htmlFor="out-stock">
                          Out of stock
                        </FormCheck.Label>
                      </FormCheck>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">
                          Price
                        </div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="price" type="text" placeholder="Input price" />
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Product Management */}
          <div className="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            <Button
              type="button"
              className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
            >
              Save & Add New Product
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-full py-3 md:w-52"
            >
              Save
            </Button>
          </div>
        </div>
        <div className="hidden col-span-2 intro-y 2xl:block">
          <div className="sticky top-0 pt-10">
            <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]">
              <li className="pl-5 mb-4 font-medium border-l-2 border-primary dark:border-primary text-primary">
                <a href="">Upload Product</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Product Information</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Product Detail</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Product Management</a>
              </li>
            </ul>
            <div className="relative p-5 mt-10 border rounded-md bg-warning/20 dark:bg-darkmode-600 border-warning dark:border-0">
              <Lucide
                icon="Lightbulb"
                className="absolute top-0 right-0 w-12 h-12 mt-5 mr-3 text-warning/80"
              />
              <h2 className="text-lg font-medium">Tips</h2>
              <div className="mt-5 font-medium">Price</div>
              <div className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-500">
                <div>
                  The image format is .jpg .jpeg .png and a minimum size of 300
                  x 300 pixels (For optimal images use a minimum size of 700 x
                  700 pixels).
                </div>
                <div className="mt-2">
                  Select product photos or drag and drop up to 5 photos at once
                  here. Include min. 3 attractive photos to make the product
                  more attractive to buyers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
