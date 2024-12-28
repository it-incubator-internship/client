import { useState } from 'react'

import { useDataBaseVersionChange } from '@/components/posts/create/draft/hooks/useDataBaseVersionChange'
import {
  convertBlobToFile,
  convertFileToBase64,
} from '@/components/posts/create/draft/utils/dataConversion'
import { draftDataConfig } from '@/consts/draftDataConfig'
import { useTranslation } from '@/hooks/useTranslation'
import { useAppDispatch, useAppSelector } from '@/services/store'

import { CreatePostState, ImageType, resetState, setDraftData } from '../../model/create-post-slice'

type IndexedDBCreatePostState = {
  data: CreatePostState
  id?: number // Опциональное поле id, так как IndexedDB добавит его автоматически
}

export const useSaveDraftCreatePost = () => {
  const stateCreatePost = useAppSelector(state => state.createPost)
  const currentPage = useAppSelector(state => state.createPost.page)
  const t = useTranslation()
  const [isModalDraftSavedOpen, setIsModalDraftSavedOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { channel } = useDataBaseVersionChange()

  let dbInstance: IDBDatabase | null = null

  const openDatabaseWithVersionCheck = async (
    dbName: string,
    version: number
  ): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(dbName, version)

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const dbInstance = (event.target as IDBOpenDBRequest).result

        if (!dbInstance.objectStoreNames.contains(draftDataConfig.objectStorage)) {
          dbInstance.createObjectStore(draftDataConfig.objectStorage, {
            autoIncrement: true,
            keyPath: 'id',
          })
        }
      }

      request.onsuccess = event => {
        const dbInstance = (event.target as IDBOpenDBRequest).result

        dbInstance.onversionchange = () => {
          channel.postMessage(draftDataConfig.versionChange)
        }

        resolve(dbInstance)
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  const addOrUpdateData = async (
    db: IDBDatabase,
    storeName: string,
    data: CreatePostState,
    key?: IDBValidKey
  ): Promise<IDBValidKey> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], draftDataConfig.readwrite)
      const store = transaction.objectStore(storeName)

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
    if (currentPage === 0) {
      setIsDialogOpen(false)
    }
    if (!open && currentPage > 0) {
      setIsModalDraftSavedOpen(true)
    }
    if (open) {
      setIsDialogOpen(true)
    }
  }

  const getLastKey = async (db: IDBDatabase, storeName: string): Promise<number | string> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], draftDataConfig.readonly)
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
    try {
      dbInstance = await openDatabaseWithVersionCheck(draftDataConfig.name, 1)
      const imagesBase64 = await Promise.all(
        stateCreatePost.images.map(async (image, index) => {
          const response = await fetch(image.img)
          const blob = await response.blob()

          // Создаем объект File из Blob
          const file = convertBlobToFile(blob, `image-${index}.jpg`)
          const base64 = await convertFileToBase64(file)

          return { ...image, img: base64 as string }
        })
      )
      const croppedImagesBase64 = await Promise.all(
        stateCreatePost.croppedImages.map(async (image, index) => {
          const response = await fetch(image.img)
          const blob = await response.blob()

          // Создаем объект File из Blob
          const file = convertBlobToFile(blob, `image-${index}.jpg`)
          const base64 = await convertFileToBase64(file)

          return { ...image, img: base64 as string }
        })
      )
      const updatedStateCreatePost: CreatePostState = {
        ...stateCreatePost,
        croppedImages: croppedImagesBase64 as ImageType[],
        images: imagesBase64 as ImageType[],
      }

      await addOrUpdateData(dbInstance, draftDataConfig.objectStorage, updatedStateCreatePost)

      dispatch(resetState())
      setIsModalDraftSavedOpen(false)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getDraftData = async () => {
    try {
      if (!dbInstance) {
        dbInstance = await openDatabaseWithVersionCheck(draftDataConfig.name, 1)
      }

      const getData = (db: IDBDatabase, storeName: string, key: IDBValidKey): Promise<any> => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction([storeName], draftDataConfig.readonly)
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

      const lastKey = await getLastKey(dbInstance, draftDataConfig.objectStorage)

      const draftData = await getData(dbInstance, draftDataConfig.objectStorage, lastKey)

      if (draftData) {
        dispatch(setDraftData(draftData.data))
        await deleteRecord(dbInstance, draftDataConfig.objectStorage, lastKey)
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
      const transaction = db.transaction([storeName], draftDataConfig.readonly)
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => {
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
        dbInstance = await openDatabaseWithVersionCheck(draftDataConfig.name, 1)
      }

      const lastKey = await getLastKey(dbInstance, draftDataConfig.objectStorage)

      const recordExists = await checkIfRecordExists(
        dbInstance,
        draftDataConfig.objectStorage,
        lastKey
      )

      return recordExists
    } catch (error) {
      console.error('Error checking specific record in IndexedDB:', error)

      return false
    }
  }

  const deleteRecord = (db: IDBDatabase, storeName: string, key: IDBValidKey): Promise<void> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], draftDataConfig.readwrite)
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  const closeAllModals = async () => {
    setIsModalDraftSavedOpen(false)
    setIsDialogOpen(false)
    dispatch(resetState())
    try {
      //    // eslint-disable-next-line max-lines
      if (!dbInstance) {
        dbInstance = await openDatabaseWithVersionCheck(draftDataConfig.name, 1)
      }
      const lastKey = await getLastKey(dbInstance, draftDataConfig.objectStorage)
      const recordExists = await checkIfRecordExists(
        dbInstance,
        draftDataConfig.objectStorage,
        lastKey
      )

      if (recordExists) {
        await deleteRecord(dbInstance, draftDataConfig.objectStorage, lastKey)
      }
    } catch (error) {
      console.error('Error deleting draft data:', error)
    }
  }

  const childrenModal = () => {
    return <div>{t.createPost.titleModalSavedDraft}</div>
  }

  const getModalArgs = () => {
    return {
      buttonRejectionTitle: t.createPost.titleButtonDiscardDraft,
      buttonTitle: t.createPost.titleButtonSaveDraft,
      children: childrenModal(),
      onClose: () => setIsModalDraftSavedOpen(false),
      // eslint-disable-next-line max-lines
      onCloseWithApproval: setDataIndexedDB,
      onCloseWithoutApproval: closeAllModals,
      open: isModalDraftSavedOpen,
      title: t.createPost.titleHeaderModalDiscardDraft,
      withConfirmation: true,
    }
  }

  return {
    checkSpecificDraftExists,
    closeAllModals,
    getDraftData,
    getModalArgs,
    handleClickOverlay,
    isDialogOpen,
    isModalDraftSavedOpen: isModalDraftSavedOpen,
  }
}
