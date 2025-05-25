import { useState } from 'react'

import { SortableTh } from '@/components/MyPayments/SortableTh'
import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetMyPaymentsQuery } from '@/services/profile/profile-api'
import { Pagination } from '@robur_/ui-kit'

import styles from './MyPayments.module.scss'

export const MyPayments = () => {
  const { data: meData, isLoading: startIsLoading } = useMeQuery()

  const [pagePagination, setPagePagination] = useState({
    pageNumber: 1,
    pageSize: 5,
  })

  const [sortMyPayments, setSortMyPayments] = useState({
    sortBy: 'dateOfPayment',
    sortDirection: 'desc',
  })

  const { data: myPayments, isLoading: isLoadingMyPayments } = useGetMyPaymentsQuery(
    { ...pagePagination, ...sortMyPayments },
    { skip: !meData }
  )

  if (startIsLoading || isLoadingMyPayments || !myPayments) {
    return <Spinner />
  }

  return (
    <div className={styles.wrapper}>
      {!myPayments.items || myPayments.items.length === 0 ? (
        <div>No subscriptions found</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <SortableTh
                  field={'dateOfPayment'}
                  label={'Date of Payment'}
                  setSort={setSortMyPayments}
                  sort={sortMyPayments}
                />
                <SortableTh
                  field={'endDateOfSubscription'}
                  label={'End date of subscription'}
                  setSort={setSortMyPayments}
                  sort={sortMyPayments}
                />
                <SortableTh
                  field={'price'}
                  label={'Price'}
                  setSort={setSortMyPayments}
                  sort={sortMyPayments}
                />
                <SortableTh
                  field={'subscriptionType'}
                  label={'Subscription Type'}
                  setSort={setSortMyPayments}
                  sort={sortMyPayments}
                />
                <SortableTh
                  field={'paymentType'}
                  label={'Payment Type'}
                  setSort={setSortMyPayments}
                  sort={sortMyPayments}
                />
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
      )}

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
