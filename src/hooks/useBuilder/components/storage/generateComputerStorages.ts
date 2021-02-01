import { Storage } from '../../../../types/components/Storage'
import { Component } from '../../computer/Component'

export const generateComputerStorages = (
    storages: Array<Storage | null>
): Array<Component | null> => {
    return storages.reduce(
        (storages: Array<Component | null>, storage: Storage | null): Array<Component | null> => {
            const computerStorage: Component | null =
                storages.find(
                    (component: Component | null) => component?.productId === storage?.productId
                ) ?? null

            if (computerStorage) {
                return [
                    ...storages.filter(
                        (component: Component | null) =>
                            component?.productId !== computerStorage.productId
                    ),
                    {
                        productId: computerStorage.productId,
                        quantity: computerStorage.quantity + 1
                    }
                ]
            }

            if (storage) {
                return [...storages, { productId: storage.productId, quantity: 1 }]
            }

            return [...storages, null]
        },
        []
    )
}
