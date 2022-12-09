import _ from "lodash";
import clsx from "clsx";
import fakerData from "../../utils/faker";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../stores/hooks";
import { selectDashboard } from "../../stores/dashboardSlice";
import { userRoles } from "../../types/user";
import { selectUser } from "../../stores/userSlice";

const contentWithSidebar = 'col-span-12 2xl:col-span-9'
const contentWithoutSidebar = 'col-span-12 2xl:col-span-12'

function Main() {
  const user = useAppSelector(selectUser)
  const dashboardItemsByRole = useAppSelector(selectDashboard)

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className={user.role === userRoles.Customer ? contentWithSidebar : contentWithoutSidebar}>
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                General Report
              </h2>
              <a href="" className="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" />
                Reload Data
              </a>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              {user.role && dashboardItemsByRole[user.role].map(el => {
                return <Link to={el.link && el.link ? el.link : '#'} key={el.link + '' + el.sum} className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                  <div
                    className={clsx([
                      "relative zoom-in",
                      "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                    ])}
                  >
                    <div className="p-5 box">
                      <div className="flex">
                        {el.icon &&
                          <Lucide
                            icon={el.icon}
                            className={"w-[28px] h-[28px]" + ' ' + el.status}
                          />
                        }
                        <div className="ml-auto">
                          {el.difference &&
                            <Tippy
                              as="div"
                              className={
                                "cursor-pointer py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium" + (el.difference > 0 ? ' bg-success' : ' bg-danger')
                              }
                              content={el.difference > 0 ? el.difference + "% Higher than last month" : el.difference + "% lower than last month"}
                            >
                              {el.difference}%
                              <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                            </Tippy>
                          }
                        </div>
                      </div>
                      <div className="mt-6 text-3xl font-medium leading-8">
                        {el.sum}
                      </div>
                      <div className="mt-1 text-base text-slate-500">
                        {el.title}
                      </div>
                    </div>
                  </div>
                </Link>
              })}
            </div>
          </div>
        </div>
      </div>
      {user.role === userRoles.Customer &&
        <div className="col-span-12 2xl:col-span-3">
          <div className="pb-10 -mb-10 2xl:border-l">
            <div className="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6">
              {/* BEGIN: Transactions */}
              <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 2xl:mt-8">
                <div className="flex items-center h-10 intro-x">
                  <h2 className="mr-5 text-lg font-medium truncate">
                    Personal Manager
                  </h2>
                </div>
                <div className="mt-5">
                  {_.take(fakerData, 1).map((faker, fakerKey) => (
                    <div key={fakerKey} className="intro-x">
                      <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                        <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            src={faker.photos[0]}
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">{faker.users[0].name}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Main;
