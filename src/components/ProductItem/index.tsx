import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";

function ProductItem({ ...props }) {
    return (
        <div
            className="col-span-12 intro-y md:col-span-6 lg:col-span-4 xl:col-span-3"
        >
            <div className="box">
                <div className="p-5">
                    <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                        <img
                            alt="Midone - HTML Admin Template"
                            className="rounded-md"
                            src={props.faker.images[0]}
                        />
                        {props.faker.trueFalse[0] && (
                            <span className="absolute top-0 z-10 px-2 py-1 m-5 text-xs text-white rounded bg-pending/80">
                                Featured
                            </span>
                        )}
                        <div className="absolute bottom-0 z-10 px-5 pb-6 text-white">
                            <a href="" className="block text-base font-medium">
                                {props.faker.products[0].name}
                            </a>
                            <span className="mt-3 text-xs text-white/90">
                                {props.faker.products[0].category}
                            </span>
                        </div>
                    </div>
                    <div className="mt-5 text-slate-600 dark:text-slate-500">
                        <div className="flex items-center">
                            <Lucide icon="Link" className="w-4 h-4 mr-2" /> Price: $
                            {props.faker.totals[0]}
                        </div>
                        <div className="flex items-center mt-2">
                            <Lucide icon="Layers" className="w-4 h-4 mr-2" />
                            {props.faker.statusStock[0]}
                        </div>
                        {(props.user.role === props.userRoles.Admin || props.user.role === props.userRoles.Seller) &&
                            <div className="flex items-center mt-2">
                                <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                                Status:
                                {" " + props.faker.statusProduct[0]}
                            </div>
                        }
                        {props.user.role === props.userRoles.Admin &&
                            <div className="flex items-center mt-2">
                                <Lucide icon="Truck" className="w-4 h-4 mr-2 w-full" />{" "}
                                Seller:
                                {" " + props.faker.users[0].name}
                            </div>
                        }
                    </div>
                    {props.user.role === props.userRoles.Customer &&
                        <div
                            className="text-center mt-4">
                            <Button
                                type="button"
                                variant="primary"
                                className="w-full "
                            >
                                Buy
                            </Button>
                        </div>
                    }
                </div>

                <div className="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400">
                    <a
                        className="flex items-center mr-auto text-primary"
                        href="#"
                        onClick={(event) => {
                            event.preventDefault();
                            props.setPreviewInfoModal(true);
                        }}
                    >
                        <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Preview
                    </a>
                    {(props.user.role === props.userRoles.Admin || props.user.role === props.userRoles.Seller) &&
                        <a
                            className="flex items-center mr-3"
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                props.setEditProductModal(true);
                            }}
                        >
                            <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                        </a>
                    }
                    {(props.user.role === props.userRoles.Admin || props.user.role === props.userRoles.Seller) &&
                        <a
                            className="flex items-center text-danger"
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                props.setDeleteConfirmationModal(true);
                            }}
                        >
                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                        </a>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductItem