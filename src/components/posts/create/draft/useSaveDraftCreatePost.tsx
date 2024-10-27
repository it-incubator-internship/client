import { useEffect, useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import { useAppDispatch, useAppSelector } from '@/services/store'

import { CreatePostState, setDraftData } from '../model/create-post-slice'

type IndexedDBCreatePostState = {
  data: CreatePostState
  id?: number // Опциональное поле id, так как IndexedDB добавит его автоматически
}

export const useSaveDraftCreatePost = () => {
  const stateCreatePost = useAppSelector(state => state.createPost)
  const t = useTranslation()
  const [isModalDraftsavedOpen, setIsModalDraftSavedOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const dispatch = useAppDispatch()

  let dbInstance: IDBDatabase | null = null

  const channel = new BroadcastChannel('db_version_channel')

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab is now active.')
        // Add any logic to check data freshness here if needed
      }
    }

    channel.onmessage = (event: MessageEvent) => {
		console.log('Message received:', event.data); 
      if (event.data === 'versionChange' && document.visibilityState !== 'visible') {
        alert('Database was updated in another tab. Please reload the page.')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      //channel.close()
    }
  }, [channel])

  const openDatabase = async (dbName: string, version: number): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(dbName, version)

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        dbInstance = (event.target as IDBOpenDBRequest).result

        if (!dbInstance.objectStoreNames.contains('draftCreatePost')) {
          dbInstance.createObjectStore('draftCreatePost', { autoIncrement: true, keyPath: 'id' })
        }
      }

      request.onsuccess = event => {
        dbInstance = (event.target as IDBOpenDBRequest).result
        // Обработка события onversionchange
        dbInstance.onversionchange = () => {
          console.log('Database version has changed. Closing the connection.')
          channel.postMessage('versionChange')

          // Закрыть соединение с базой данных, чтобы не блокировать обновление
          //dbInstance?.close()

          // Здесь можно уведомить пользователя о необходимости перезагрузки страницы
          //alert('Database is being updated in another tab. Please reload the page.')
        }
        resolve(dbInstance)
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  // Слушаем сообщения от других вкладок
//   channel.onmessage = (event: MessageEvent) => {
//     if (event.data === 'versionChange') {
//       // Если текущая вкладка не активна, показываем alert
//       if (document.visibilityState !== 'visible') {
//         alert('Database was updated in another tab. Please reload the page.')
//       }
//     }
//   }

//   // Обрабатываем изменение состояния видимости вкладки
//   document.addEventListener('visibilitychange', () => {
//     // Если вкладка становится активной, проверяем, не изменялась ли версия базы данных
//     if (document.visibilityState === 'visible') {
//       console.log('Tab is now active.')
//       // Можно добавить здесь логику для проверки актуальности данных
//     }
//   })

  const addOrUpdateData = async (
    db: IDBDatabase,
    storeName: string,
    data: CreatePostState,
    key?: IDBValidKey
  ): Promise<IDBValidKey> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)

		console.log('key', key)

      const request =
        key !== undefined
          ? store.put({ data, id: key } as IndexedDBCreatePostState)
          : store.add({ data } as IndexedDBCreatePostState)

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const handleClickOverlay = async (open: boolean) => {
    if (!open) {
      console.log('handleClickOverlay')
      setIsModalDraftSavedOpen(true)
    }
    if (open) {
      console.log('handleClickOpenDialog')
      setIsDialogOpen(true)
    }
  }

  const getLastKey = async (db: IDBDatabase, storeName: string): Promise<number | string> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)

      const request = store.openCursor(null, 'prev')

      request.onsuccess = event => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result

        if (cursor) {
          resolve(cursor.value.id) // Возвращаем последний id
        } else {
          resolve('') // Если записей нет
        }
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  const setDataIndexedDB = async () => {
    console.log('setDataIndexedDB')
    try {
      if (!dbInstance) {
        const dbVersion = 2

        dbInstance = await openDatabase('myDatabase', dbVersion)
      }

      //const lastKey = await getLastKey(dbInstance, 'draftCreatePost')

      const result = await addOrUpdateData(
        dbInstance,
        'draftCreatePost',
        stateCreatePost
        //lastKey // Или не передавайте, если хотите использовать autoIncrement
      )

      setIsModalDraftSavedOpen(false)
      setIsDialogOpen(false)

      console.log('Data added or updated successfully with key:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getDraftData = async () => {
    try {
      if (!dbInstance) {
        dbInstance = await openDatabase('myDatabase', 1)
      }

      const getData = (db: IDBDatabase, storeName: string, key: IDBValidKey): Promise<any> => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction([storeName], 'readonly')
          const store = transaction.objectStore(storeName)
          const request = store.get(key)

          request.onsuccess = () => {
            resolve(request.result)
          }

          request.onerror = () => {
            reject(request.error)
          }
        })
      }

      const lastKey = await getLastKey(dbInstance, 'draftCreatePost')

      const draftData = await getData(dbInstance, 'draftCreatePost', lastKey) // Получаем данные черновика

      if (draftData) {
        // Здесь делаем dispatch для обновления состояния
        dispatch(setDraftData(draftData.data)) // Обновляем состояние с полученными данными
        console.log('Draft data loaded and dispatched:', draftData)
        await deleteRecord(dbInstance, 'draftCreatePost', lastKey)
      } else {
        console.warn('No draft data found')
      }
    } catch (error) {
      console.error('Error fetching draft data from IndexedDB:', error)
    }
  }

  const checkIfRecordExists = (
    db: IDBDatabase,
    storeName: string,
    key: IDBValidKey
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)

      // Проверяем, существует ли запись с указанным ключом
      const request = store.get(key)

      request.onsuccess = () => {
        // Если результат не равен undefined, значит запись существует
        resolve(request.result !== undefined)
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  const checkSpecificDraftExists = async () => {
    try {
      if (!dbInstance) {
        dbInstance = await openDatabase('myDatabase', 1)
      }

      const lastKey = await getLastKey(dbInstance, 'draftCreatePost')

      const recordExists = await checkIfRecordExists(dbInstance, 'draftCreatePost', lastKey)

      console.log('Record with ID lastKey exists:', recordExists)

      return recordExists
    } catch (error) {
      console.error('Error checking specific record in IndexedDB:', error)

      return false
    }
  }

  // The rest of your code remains the same

  const deleteRecord = (db: IDBDatabase, storeName: string, key: IDBValidKey): Promise<void> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = () => {
        console.log(`Record with key ${key} deleted successfully.`)
        resolve()
      }

      request.onerror = () => {
        console.error(`Error deleting record with key ${key}:`, request.error)
        reject(request.error)
      }
    })
  }

  const closeAllModals = async () => {
    //setIsModalDraftSavedOpen(false)
    setIsDialogOpen(false)
    // eslint-disable-next-line max-lines

    // Удаляем черновик, если он существует
    //  try {
    //    //    // eslint-disable-next-line max-lines
    //    if (!dbInstance) {
    //      dbInstance = await openDatabase('myDatabase', 1)
    //    }
    //    const lastKey = await getLastKey(dbInstance, 'draftCreatePost')
    //    const recordExists = await checkIfRecordExists(dbInstance, 'draftCreatePost', lastKey)

    //    if (recordExists) {
    //      await deleteRecord(dbInstance, 'draftCreatePost', lastKey)
    //    }
    //  } catch (error) {
    //    console.error('Error deleting draft data:', error)
    //  }
  }

  const childrenModal = () => {
    return <div>{t.createPost.titleModalSavedDraft}</div>
  }

  const getModalArgs = () => {
    return {
      buttonRejectionTitle: t.createPost.titleButtonDiscardDraft,
      buttonTitle: t.createPost.titleButtonSaveDraft,
      children: childrenModal(),
      onClose: closeAllModals,
      onCloseWithApproval: setDataIndexedDB,
      open: isModalDraftsavedOpen,
      title: t.createPost.titleHeaderModalDiscardDraft,
      withConfirmation: true,
      // eslint-disable-next-line max-lines
    }
  }

  return {
    // eslint-disable-next-line max-lines
    checkSpecificDraftExists,
    getDraftData,
    getModalArgs,
    handleClickOverlay,
    isDialogOpen,
    isModalDraftsavedOpen,
  }
}
