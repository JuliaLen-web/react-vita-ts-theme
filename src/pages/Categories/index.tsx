import _ from "lodash";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInline, FormInput, FormLabel, FormSelect, FormTextarea } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import CategoryItem from "../../components/CategoryItem";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { selectCategories, selectCategoriesLoading } from "../../stores/categoriesSlice";
import { addCategory, deleteCategory, editCategory, fetchCategories } from "../../stores/action-creators/categories";
import LoadingIcon from "../../base-components/LoadingIcon";
import { Category } from "../../types/category";

function Main() {
  const categories = useAppSelector(selectCategories)
  const loading = useAppSelector(selectCategoriesLoading)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [selectCategoryId, setSelectCategoryId] = useState(0)

  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
  function handleDeleteCategoryModal(value: boolean, id: number) {
    setDeleteCategoryModal(value)
    setSelectCategoryId(id)
  }

  const [editCategoryModal, setEditCategoryModal] = useState(false)
  function handleEditCategoryModal(value: boolean, id: number) {
    setEditCategoryModal(value)
    setSelectCategoryId(id)
  }

  const [addCategoryModal, setAddCategoryModal] = useState(false)

  const categoryForModal = categories.filter(el => el.id === selectCategoryId)[0]

  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset } = useForm<Category>()
  const { register: registerAdd, handleSubmit: handleSubmitAdd } = useForm<Category>({
    defaultValues: {
      name: ''
    }
  })

  const onSubmitAdd: SubmitHandler<Category> = (data: any) => dispatch(addCategory(data))
  const onSubmitEdit: SubmitHandler<Category> = (data: any) => dispatch(editCategory(data))

  useEffect(() => {
    reset(categoryForModal)
  }, [categoryForModal])


  if (loading) {
    return (
      <h1 className="text-4xl flex items-center justify-center font-medium text-center intro-y">
        <LoadingIcon icon="hearts" className="w-20 h-20 mr-3" />Loading...
      </h1>
    )
  }

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Categories</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button
            variant="primary"
            className="mr-2 shadow-md"
            onClick={() => {
              setAddCategoryModal(true);
            }}
          >
            Add New Category
          </Button>
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
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  IMAGES
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CATEGORY NAME
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  SLUG
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ACTIONS
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {categories.map(category => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  onEdit={handleEditCategoryModal}
                  onDelete={handleDeleteCategoryModal}
                />
              ))}
            </Table.Tbody>
          </Table>
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
      {/* BEGIN: Add Category Modal */}
      <Dialog
        open={addCategoryModal}
        onClose={() => {
          setAddCategoryModal(false);
        }}
      >
        <Dialog.Panel>
          <form onSubmit={handleSubmitAdd(onSubmitAdd)}>
            <div className="p-5 text-center">
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
                    {...registerAdd("name")}
                    id="product-name"
                    type="text"
                    placeholder="Product name"
                  />
                </div>
              </FormInline>
            </div>

            <div className="px-5 pb-8 text-center">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => {
                  setAddCategoryModal(false);
                }}
                className="w-24 mr-1"
              >
                Cancel
              </Button>
              <Button
                variant="success"
                type="submit"
                className="w-24 text-white"
                onClick={() => {
                  setAddCategoryModal(false);
                }}
              >
                Create
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
      {/* END: Add Category Modal */}
      {/* BEGIN: Edit Category Modal */}
      <Dialog
        open={editCategoryModal}
        onClose={() => {
          setEditCategoryModal(false);
        }}
      >
        <Dialog.Panel>
          <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
            {categoryForModal &&
              <div className="p-5 text-center">
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
                      {...registerEdit("name")}
                      id="product-name"
                      type="text"
                      defaultValue={categoryForModal.name}
                      placeholder="Product name"
                    />
                  </div>
                </FormInline>
              </div>
            }
            <div className="px-5 pb-8 text-center">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => {
                  setEditCategoryModal(false);
                }}
                className="w-24 mr-1"
              >
                Cancel
              </Button>
              <Button
                variant="success"
                type="submit"
                className="w-24 text-white"
                onClick={() => {
                  setEditCategoryModal(false)
                }}
              >
                Edit
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
      {/* END: Edit Category Modal */}
      {/* BEGIN: Delete Category Modal */}
      <Dialog
        open={deleteCategoryModal}
        onClose={() => {
          setDeleteCategoryModal(false);
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
                setDeleteCategoryModal(false);
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
                setDeleteCategoryModal(false)
                dispatch(deleteCategory(selectCategoryId))
              }}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Category Modal */}
    </>
  );
}

export default Main;
