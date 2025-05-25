import { useState } from 'react'

import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetMyPaymentsQuery } from '@/services/profile/profile-api'
import { Pagination } from '@robur_/ui-kit'

import styles from './MyPayments.module.scss'

export const MyPayments = () => {
  const { data: meData, isLoading: startIsLoading } = useMeQuery()
  const currentUserId = meData?.userId

  const [pagePagination, setPagePagination] = useState({
    pageNumber: 1,
    pageSize: 10,
  })

  const [sortMyPayments, setSortMyPayments] = useState({
    sortBy: 'dateOfPayment',
    sortDirection: 'desc',
  })

  const { data: myPayments, isLoading: isLoadingMyPayments } = useGetMyPaymentsQuery(
    { ...pagePagination, ...sortMyPayments },
    { skip: !currentUserId }
  )

  if (startIsLoading || isLoadingMyPayments || !myPayments) {
    return <Spinner />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date of Payment</th>
              <th>End date of subscription</th>
              <th>Price</th>
              <th>Subscription Type</th>
              <th>Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {myPayments?.items.map((row, idx) => (
              <tr key={idx}>
                <td>{row.dateOfPayment}</td>
                <td>{row.endDateOfSubscription}</td>
                <td>${row.price}</td>
                <td>{row.subscriptionType}</td>
                <td>{row.paymentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        className={styles.pagination}
        currentPage={pagePagination.pageNumber}
        onPageChange={page =>
          setPagePagination(prev => ({
            ...prev,
            pageNumber: page,
          }))
        }
        onPageSizeChange={size =>
          setPagePagination({
            pageNumber: 1, // всегда сбрасываем на первую страницу при смене размера
            pageSize: size,
          })
        }
        pageSize={pagePagination.pageSize}
        siblingCount={1}
        totalCount={myPayments.totalCount}
      />
    </div>
  )
}
