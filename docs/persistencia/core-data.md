---
sidebar_position: 1
---

# Core Data

## Obtener el path de la base de datos

**Simulador:**

```swift
if let path = NSSearchPathForDirectoriesInDomains(FileManager.SearchPathDirectory.documentDirectory, FileManager.SearchPathDomainMask.userDomainMask, true).first {
    print(path)
}
```

```swift
private static var persistentContainer: NSPersistentContainer = {
    let container = NSPersistentContainer(name: "ModuleName")
    container.loadPersistentStores { description, error in
        if let error = error {
                fatalError("Unable to load persistent stores: \(error)")
        }
    }
    return container
}()

var context: NSManagedObjectContext {
    return Self.persistentContainer.viewContext
}
```