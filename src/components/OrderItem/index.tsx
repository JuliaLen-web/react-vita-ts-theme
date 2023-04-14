import clsx from "clsx";
import Lucide from "../../base-components/Lucide";
import Table from "../../base-components/Table";

function OrderItem({ ...props }) {
    return (
        <Table.Tr className="intro-x">
            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <div className="flex">
                    <div className="w-10 h-10 image-fit zoom-in">
                        <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                            src={props.order.image}
                        />
                    </div>
                </div>
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <a href="" className="font-medium whitespace-nowrap">
                    {props.order.name}
                </a>
                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    {props.order.category}
                </div>
            </Table.Td>
            {(props.admin || props.manager) &&
                <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {props.order.buyer}
                </Table.Td>
            }
            {props.admin &&
                <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {props.order.seller}
                </Table.Td>
            }
            <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                {props.order.stock === true ? 'In Stock' : 'Out of stock'}
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                ${props.order.total}
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <div
                    className={clsx({
                        "flex items-center justify-center": true,
                        "text-success": props.order.status === "active" || props.order.status === "paid",
                        "text-danger": props.order.status === "inactive" || props.order.status === "unpaid",
                    })}
                >
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                    {props.order.status}
                </div>
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                {/* {props.faker.dates[0]} */}
            </Table.Td>
            {!props.seller &&
                <Table.Td className="first:rounded-l-md last:rounded-r-md w-30 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                        <a className="flex items-center" href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                props.onPreview(true, props.order.id)
                            }}>
                            <Lucide icon="Maximize2" className="w-4 h-4 mr-1" />{" "}
                        </a>
                        {props.onEdit &&
                            <a className="flex items-center ml-3 mr-3" href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    props.onEdit(true, props.order.id)
                                }}
                            >
                                <Lucide icon="Edit" className="w-4 h-4 mr-1" />{" "}
                            </a>
                        }
                        {props.onDelete &&
                            <a
                                className="flex items-center text-danger"
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    props.onDelete(true, props.order.id)
                                }}
                            >
                                <Lucide icon="Trash2" className="w-4 h-4 mr-1" />
                            </a>
                        }
                    </div>
                </Table.Td>
            }
        </Table.Tr>
    );
}

export default OrderItem