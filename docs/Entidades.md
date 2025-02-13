# Mapeo de las Entidades para el manejo de Errores

**Funciones para decodificar**
```swift
public func decodeEntity<T: Codable>(responseType: T.Type, data: Data, serviceName: String) {
    if let response = self.decode(responseType, from: data, serviceName: serviceName) {
        self.delegate?.didReceiveEntityFromDagger(serviceName: serviceName, entity: response)
    } else {
        decodeBaseEntity(data: data, serviceName: serviceName)
    }
}
```

```swift
public func decodeEntityMiddleware<T: Codable>(responseType: T.Type, data: Data, serviceName: String) {
    if let response = self.decode(responseType, from: data, serviceName: serviceName) as? BBMiddlewareResponse {
        if !BlackBeard.sharedInstance.dictionary.isEmpty {
            self.decodeMessage(entity: response, serviceName: serviceName)
        } else {
            self.delegate?.didReceiveEntityFromDagger(serviceName: serviceName, entity: response)
        }
    } else {
        decodeBaseEntity(data: data, serviceName: serviceName)
    }
}
```

```swift
public func decodeBaseEntity(data: Data, serviceName: String) {
    if let baseResponse = self.decode(BBDBaseResponse.self, from: data, serviceName: serviceName) {
        self.delegate?.didReceiveEntityFromDagger(serviceName: serviceName, entity: baseResponse.toBaseEntity)
    } else if let baseEntity = self.decode(BBDBaseEntity.self, from: data, serviceName: serviceName) {
        self.delegate?.didReceiveEntityFromDagger(serviceName: serviceName, entity: baseEntity)
    } else {
        catchError(dataError: data, serviceName: serviceName)
    }
}
```

**Entidad que representa una respuesta base o generica.**
```swift
open class BBDBaseResponse: Codable, CustomStringConvertible, BBClassDescribing {
    /// Estatus de la respuesta del servicio.
    public var statusCode: String
    /// Mensaje que representa el estatus de la respuesta del servicio.
    public var statusMessage: String
    /// Llaves para codificar.
    public var container: KeyedEncodingContainer<CodingKeys>?
    /// Llaves para decodificar.
    public var values: KeyedDecodingContainer<CodingKeys>?
    /// Enumeración de llaves.
    public enum CodingKeys: String, CodingKey {
        /// Estatus de la respuesta del servicio.
        case statusCodeKey = "statuscode"
        /// Mensaje que representa el estatus de la respuesta de un servicio.
        case statusMessageKey  = "statusmessage"
        /// Objeto que representa el detalle de la respuesta de un servicio.
        case resultset = "resultset"
    }
}
```

**Representa la base para todas las respuestas del servidor.**
```swift
public struct BBDBaseEntity: Codable, CustomStringConvertible {
    /// Exito: 1 Error: 3 - Inicialización predefinida.
    public var code: Int = 3
    /// En caso de error se llenara este objeto para mostrarlo al usuario.
    public var message: String = ""
}
```

**Entidad para un error del lado del servidor.**
```swift
public struct BBErrorResponse: Codable {
    /// Fecha en la que ocurrió el error.
    public let timestamp: String?
    /// Mensaje de error.
    public let error: String?
    /// Código http.
    public let status: Int?
    /// Ruta del error.
    public let path: String?
    /// Id de la petición.
    public let requestId: String?
}
```

**Ejemplo:**
```json
{
  "timestamp": "2025-02-12T17:07:09.487+00:00",
  "path": "/api/pn-cuentas-tarj/cuenta/012978380041/movimiento/filtro/0",
  "status": 404,
  "error": "Not Found",
  "message": null,
  "requestId": "0ada19ca-369789"
}
```

**Entidad que recibe un error de Middleware.**
```swift
public struct BBMiddlewareResponse: Codable {
    /// Duration del servicio.
    public let duration: String?
    /// Identificador de la traza.
    public let traceid: String?
    /// Código de error.
    public let code: String?
    /// Mensaje Interno de error.
    public let internalmessage: String?
    /// Error que ocurrió.
    public let error: String?
    /// Mensaje del servicio.
    public let message: String?
    /// Estatus del mensaje
    public let statusmessage: String?
    /// URI del servicio
    public let uri: String?
    /// Código de estatus.
    public let status: Int?
    /// Fecha del error.
    public let timestamp: String?
    /// Código de respuesta.
    public let responseCode: String?
}
```

**Ejemplo:**
```json
{
  "duration": "8",
  "code": "encriptar->seguridad->8d08eac874502074",
  "error": "CREDENCIALES_ERRONEAS",
  "message": "Credenciales Erroneas.",
  "status": 401,
  "timestamp": "2025-02-10T15:58:02.237",
  "traceid": "ad24c3019d25d6f5"
}
```
**Entidad para mapear un error de servicios usando PinPoint.:**
```swift
public struct BBPinPointErrorEntity {
    /// Código de estatus de manejo interno en apps Banregio(1,2,04).
    public let statuscode: String?
    /// Mensaje del servicio.
    public let statusmessage: String?
    /// Ruta asociada al microservicio.
    public let uri: String?
    /// Marca de tiempo en la ejecución de tiempo.
    public let timestamp: String?
    /// Nombre del servicio que generó el error.
    public let serviceName: String
    /// Código de error http(401,500).
    public let status: String?
    /// Método http de la petición(GET, POST).
    public let httpMethod: String?
}
```