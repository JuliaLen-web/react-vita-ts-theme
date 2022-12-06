import clsx from "clsx";
import { Link } from "react-router-dom";
import Lucide from "../../base-components/Lucide";
import Table from "../../base-components/Table";

function TransactionItem({ ...props }) {
    return (
        <Table.Tr key={props.fakerKey} className="intro-x">
            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 !py-4 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <Link
                    to="/transaction-detail"
                    className="underline decoration-dotted whitespace-nowrap"
                >
                    {"#INV-" + props.faker.totals[0] + "807556"}
                </Link>
            </Table.Td>
            {(props.user.role === props.userRoles.Admin || props.user.role === props.userRoles.Manager) &&
                <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <a href="" className="font-medium whitespace-nowrap">
                        {props.faker.users[0].name}
                    </a>
                    {props.faker.trueFalse[0] ? (
                        <div
                            v-if="props.faker.trueFalse[0]"
                            className="text-slate-500 text-xs whitespace-nowrap mt-0.5"
                        >
                            Ohio, Ohio
                        </div>
                    ) : (
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                            California, LA
                        </div>
                    )}
                </Table.Td>
            }
            {props.user.role === props.userRoles.Admin &&
                <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <a href="" className="font-medium whitespace-nowrap">
                        {props.faker.users[1].name}
                    </a>
                </Table.Td>
            }
            <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <div
                    className={clsx({
                        "flex items-center justify-center whitespace-nowrap":
                            true,
                        "text-success": props.faker.trueFalse[0],
                        "text-danger": !props.faker.trueFalse[0],
                    })}
                >
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                    {props.faker.trueFalse[0] ? "Active" : "Inactive"}
                </div>
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                {props.faker.trueFalse[0] ? (
                    <>
                        <div className="whitespace-nowrap">
                            Direct bank transfer
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                            25 March, 12:55
                        </div>
                    </>
                ) : (
                    <>
                        <div className="whitespace-nowrap">
                            Checking payments
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                            30 March, 11:00
                        </div>
                    </>
                )}
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 text-right bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                ${props.faker.totals[0] + ",000,00"}
            </Table.Td>
        </Table.Tr>
    );
}

export default TransactionItem