import clsx from "clsx";
import { Link } from "react-router-dom";
import Lucide from "../../base-components/Lucide";
import Table from "../../base-components/Table";

function TransactionItem({ ...props }) {
    return (
        <Table.Tr className="intro-x">
            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 !py-4 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <Link
                    to="/transaction-detail"
                    className="underline decoration-dotted whitespace-nowrap"
                >
                    {"#INV-" + props.transaction.invoice + "807556"}
                </Link>
            </Table.Td>
            {(props.admin || props.manager) &&
                <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <a href="" className="font-medium whitespace-nowrap">
                        {props.transaction.buyer}
                    </a>
                </Table.Td>
            }
            {props.admin &&
                <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <a href="" className="font-medium whitespace-nowrap">
                        {props.transaction.seller}
                    </a>
                </Table.Td>
            }
            <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <div
                    className={clsx({
                        "flex items-center justify-center whitespace-nowrap":
                            true,
                        "text-success": props.transaction.status === 'Active',
                        "text-danger": props.transaction.status !== 'Active',
                    })}
                >
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                    {props.transaction.status}
                </div>
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <div className="whitespace-nowrap">
                    {props.transaction.payment}
                </div>
                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    {props.transaction.date}
                </div>
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 text-right bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                ${props.transaction.sum + ",000,00"}
            </Table.Td>
        </Table.Tr>
    );
}

export default TransactionItem