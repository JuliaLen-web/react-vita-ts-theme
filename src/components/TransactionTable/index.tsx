import { useEffect } from 'react'
import Table from '../../base-components/Table'
import { selectUser } from '../../stores/userSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { selectTransactions, selectTransactionsLoading } from '../../stores/transactionSlice'
import { fetchTransactions } from '../../stores/action-creators/transactions'
import { userRoles } from '../../types/user'
import TransactionItem from '../TransactionItem'
import LoadingIcon from '../../base-components/LoadingIcon'

const TransactionTable = () => {

    const { role } = useAppSelector(selectUser)

    const transactions = useAppSelector(selectTransactions)
    const loading = useAppSelector(selectTransactionsLoading)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const accessSeller = (role === userRoles.Seller)
    const accessAdmin = (role === userRoles.Admin)
    const accessManager = (role === userRoles.Manager)

    if (loading) {
        return (
            <div className='col-span-12 overflow-auto intro-y lg:overflow-visible'>
                <h1 className="text-4xl flex items-center justify-center font-medium text-center intro-y">
                    <LoadingIcon icon="hearts" className="w-20 h-20 mr-3" />Loading...
                </h1>
            </div>
        )
    }

    return (
        <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
                <Table.Tr>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                        INVOICE
                    </Table.Th>
                    {(accessAdmin || accessManager) &&
                        <Table.Th className="border-b-0 whitespace-nowrap">
                            BUYER NAME
                        </Table.Th>
                    }
                    {accessAdmin &&
                        <Table.Th className="border-b-0 whitespace-nowrap">
                            SELLER NAME
                        </Table.Th>
                    }
                    <Table.Th className="text-center border-b-0 whitespace-nowrap">
                        STATUS
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                        PAYMENT
                    </Table.Th>
                    <Table.Th className="text-right border-b-0 whitespace-nowrap">
                        TOTAL TRANSACTION
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {transactions.map(transaction =>
                    <TransactionItem
                        transaction={transaction}
                        key={transaction.id}
                        // onPreview={handlePreviewOrderModal}
                        // onEdit={(accessAdmin || accessSeller) ? handleEditOrderModal : undefined}
                        // onDelete={(accessAdmin || accessSeller) ? handleDeleteOrderModal : undefined}
                        admin={accessAdmin}
                        seller={accessSeller}
                        manager={accessManager}
                    />
                )}
            </Table.Tbody>
        </Table>
    )
}

export default TransactionTable