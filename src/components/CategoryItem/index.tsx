import Table from "../../base-components/Table";
import Lucide from "../../base-components/Lucide";

function CategoryItem({ ...props }) {
    return (
        <Table.Tr className="intro-x">
            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <div className="flex">
                    {props.category.images && props.category.images.map((image: string) => (
                        <div className="w-10 h-10 image-fit zoom-in" key={props.category.id + image}>
                            <img
                                alt="Midone Tailwind HTML Admin Template"
                                className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                                src={image}
                            />
                        </div>
                    ))}
                </div>
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <div className="font-medium whitespace-nowrap">
                    {props.category.name}
                </div>
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                <a
                    className="flex items-center mr-3 text-slate-500"
                    href="#"
                >
                    <Lucide icon="ExternalLink" className="w-4 h-4 mr-2" />
                    /categories/{props.category.slug}
                </a>
            </Table.Td>
            <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                <div className="flex items-center justify-center">
                    <a
                        className="flex items-center mr-3"
                        href="#"
                        onClick={(event) => {
                            event.preventDefault()
                            props.onEdit(true, props.category.id)
                        }}
                    >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                        Edit
                    </a>
                    <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={(event) => {
                            event.preventDefault()
                            props.onDelete(true, props.category.id)
                        }}
                    >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete

                    </a>
                </div>
            </Table.Td>
        </Table.Tr>
    )
}

export default CategoryItem