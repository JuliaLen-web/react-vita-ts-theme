import { useEffect, useState } from "react";
import Button from "../../base-components/Button";
import { Dialog } from "../../base-components/Headless";
import LoadingIcon from "../../base-components/LoadingIcon";
import Lucide from "../../base-components/Lucide";
import Table from "../../base-components/Table";
import { fetchOrders } from "../../stores/action-creators/orders";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { selectOrders, selectOrdersLoading } from "../../stores/orderSlice";
import { selectUser } from "../../stores/userSlice";
import { userRoles } from "../../types/user";
import OrderItem from "../OrderItem";

function OrderTable() {
    const { role } = useAppSelector(selectUser)
    const orders = useAppSelector(selectOrders)
    const loading = useAppSelector(selectOrdersLoading)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const accessSeller = (role === userRoles.Seller)
    const accessAdmin = (role === userRoles.Admin)
    const accessManager = (role === userRoles.Manager)


    const [selectOrderId, setSelectOrderId] = useState(0)

    const [deleteOrderModal, setDeleteOrderModal] = useState(false)
    function handleDeleteOrderModal(value: boolean, id: number) {
        setDeleteOrderModal(value)
        setSelectOrderId(id)
    }

    const [editOrderModal, setEditOrderModal] = useState(false)
    function handleEditOrderModal(value: boolean, id: number) {
        setEditOrderModal(value)
        setSelectOrderId(id)
    }

    const [previewOrderModal, setPreviewOrderModal] = useState(false)
    function handlePreviewOrderModal(value: boolean, id: number) {
        setPreviewOrderModal(value)
        setSelectOrderId(id)
    }

    if (loading) {
        return (
            <h1 className="text-4xl flex items-center justify-center font-medium text-center intro-y">
                <LoadingIcon icon="hearts" className="w-20 h-20 mr-3" />Loading...
            </h1>
        )
    }

    return (
        <>
            <Table className="border-spacing-y-[10px] border-separate -mt-2">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th className="border-b-0 whitespace-nowrap">
                            IMAGE
                        </Table.Th>
                        <Table.Th className="border-b-0 whitespace-nowrap">
                            PRODUCT NAME
                        </Table.Th>
                        {(accessAdmin || accessManager) &&
                            <Table.Th className="border-b-0 whitespace-nowrap">
                                BUYER
                            </Table.Th>
                        }
                        {accessAdmin &&
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
                        {!accessSeller &&
                            <Table.Th className="text-center border-b-0 whitespace-nowrap">
                                ACTIONS
                            </Table.Th>
                        }
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {orders.map(order =>
                        <OrderItem
                            order={order}
                            key={order.id}
                            onPreview={handlePreviewOrderModal}
                            onEdit={(accessAdmin || accessSeller) ? handleEditOrderModal : undefined}
                            onDelete={(accessAdmin || accessSeller) ? handleDeleteOrderModal : undefined}
                            admin={accessAdmin}
                            seller={accessSeller}
                            manager={accessManager}
                        />
                    )}
                </Table.Tbody>
            </Table>
            {/* BEGIN: View additional info Modal */}
            <Dialog
                open={previewOrderModal}
                onClose={() => {
                    setPreviewOrderModal(false);
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
                                setPreviewOrderModal(false);
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
                                setPreviewOrderModal(false);
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
                    setEditOrderModal
                }}
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
                        >
                            Edit
                        </Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END: Edit Order Modal */}
            {/* BEGIN: Delete Confirmation Modal -*/}
            <Dialog
                open={deleteOrderModal}
                onClose={() => {
                    setDeleteOrderModal(false);
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
                                setDeleteOrderModal(false);
                            }}
                            className="w-24 mr-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            type="button"
                            className="w-24"
                        >
                            Delete
                        </Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END: Delete Confirmation Modal -*/}
        </>
    )
}

export default OrderTable