import { useTranslation } from "@/hooks/useTranslation"
import { useAppSelector } from "@/services/store"
import { useState } from "react"

export const useSaveDraftCreatePost = () => {
  const stateCreatePost = useAppSelector(state => state.createPost)
  const t = useTranslation()
  const [isModalDraftsavedlOpen, setIsModalDrafSavedtOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

  interface DatabaseRecord {
    id?: number
    data: any
  }

  // Функция для открытия базы данных и создания хранилищ
  const openDatabase = (dbName: string, version: number): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(dbName, version)

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Проверяем, если хранилище не существует, создаём его
        if (!db.objectStoreNames.contains('croppedImages')) {
          db.createObjectStore('draftCreatePost', { autoIncrement: true, keyPath: 'id' })
        }
      }

      request.onsuccess = event => {
        const db = (event.target as IDBOpenDBRequest).result

        // Обработка события onversionchange
        db.onversionchange = () => {
          console.log('Database version has changed. Closing the connection.')

          // Закрыть соединение с базой данных, чтобы не блокировать обновление
          db.close()

          // Здесь можно уведомить пользователя о необходимости перезагрузки страницы
          alert('Database is being updated in another tab. Please reload the page.')
        }

        resolve(db)
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  // Функция для добавления данных
  const addData = (db: IDBDatabase, storeName: string, data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const transaction: IDBTransaction = db.transaction([storeName], 'readwrite')
      const store: IDBObjectStore = transaction.objectStore(storeName)
      const request: IDBRequest<IDBValidKey> = store.add({ data })

      request.onsuccess = () => {
        resolve('Data added successfully')
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  async function setDataIndexedDB() {
    console.log('setDataIndexedDB')
    try {
      const db = await openDatabase('myDatabase', 1)
      const resultCrop = await addData(db, 'draftCreatePost', stateCreatePost)
      console.log('resultCrop', resultCrop) // "Data added successfully"
      // console.log('resultImage', resultImage) // "Data added successfully"
      // console.log('resultPage', resultPage) // "Data added successfully"
      // console.log('resultPhotoUploadError', resultPhotoUploadError) // "Data added successfully"

      // await db.close()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleClickOverlay = async (open: boolean) => {
    if (!open) {
      console.log('handleClickOverlay')
      setIsModalDrafSavedtOpen(true)
    }
    if (open) {
      console.log('handleClickOpenDialog')
      setIsDialogOpen(true)
    }
  }

  const deleteDatabase = (dbName: string) => {
    const request = indexedDB.deleteDatabase(dbName)

    request.onsuccess = () => {
      console.log(`Database ${dbName} deleted successfully.`)
    }

    request.onerror = event => {
      console.error(`Error deleting database:`, (event.target as IDBRequest).error)
    }

    request.onblocked = () => {
      console.warn(`Database deletion blocked.`)
    }
  }

  // Вызов функции для удаления базы данных
  //deleteDatabase('myDatabase');

  const childrenModal = () => {
    return <div>{t.createPost.titleModalSavedDraft}</div>
  }
  const getModalArgs = () => {
    return {
      buttonRejectionTitle: t.createPost.titleButtonSaveDraft,
      buttonTitle: t.createPost.titleButtonDiscardDraft,
      children: childrenModal(),
      onClose: setDataIndexedDB,
      onCloseWithApproval: () => {},
      open: isModalDraftsavedlOpen,
      title: t.createPost.titleHeaderModalDiscardDraft,
      withConfirmation: true,
    }
  }
}
