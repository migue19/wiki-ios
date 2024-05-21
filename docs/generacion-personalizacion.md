### Generación y Personalización de Código en Intino Framework

El Intino Framework facilita el desarrollo de aplicaciones mediante la generación automática de código a partir de modelos definidos en Legio DLS. A continuación, se explica el proceso de generación de código y cómo personalizar y extender el código generado para satisfacer necesidades específicas del proyecto.

#### 1. Generación Automática de Código

El proceso de generación de código en Intino se basa en la definición de modelos en Legio DLS. Estos modelos se transforman automáticamente en código fuente, que puede incluir estructuras de datos, lógica de negocio, persistencia y partes de la interfaz de usuario.

**Pasos para la Generación de Código**:

1. **Definición del Modelo en Legio**:
   - Crear y definir las entidades y sus relaciones en el archivo `model.legio`.

   ```legio
   entity Cliente {
       @Id int id;
       String nombre;
       String direccion;
       @Range(min=18, max=99) int edad;
   }

   entity Pedido {
       @Id int id;
       Date fecha;
       double total;
       Cliente cliente;
   }
   ```

2. **Ejecución del Generador de Código**:
   - Utilizar la herramienta de generación de código de Intino para transformar los modelos definidos en código fuente.
   - El comando puede variar según la configuración del proyecto, pero generalmente se ejecuta desde el entorno de desarrollo (IDE) o la línea de comandos.

   ```sh
   intino generate
   ```

3. **Revisión del Código Generado**:
   - El código generado se ubicará en el directorio `src/main/java/` y reflejará las definiciones del modelo.

#### 2. Estructura del Código Generado

El código generado generalmente incluye:
- **Entidades**: Clases Java que representan las entidades definidas en el modelo.
- **DAO (Data Access Objects)**: Clases para la gestión de la persistencia de datos.
- **Servicios**: Clases que encapsulan la lógica de negocio.
- **Controladores**: Clases que manejan las solicitudes y respuestas de la aplicación (si se generan interfaces de usuario).

**Ejemplo de Código Generado para `Cliente`**:

```java
@Entity
public class Cliente {
    @Id
    private int id;
    private String nombre;
    private String direccion;
    private int edad;

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }
}
```

#### 3. Personalización del Código Generado

Aunque el código generado proporciona una base sólida, a menudo es necesario personalizar y extender este código para cumplir con requisitos específicos del proyecto.

**Métodos para Personalizar el Código**:

1. **Extender Clases Generadas**:
   - Crear subclases de las clases generadas para añadir funcionalidades personalizadas sin modificar el código generado directamente.

   ```java
   public class ClienteExtended extends Cliente {
       // Métodos personalizados
       public String getNombreCompleto() {
           return this.getNombre() + " " + this.getDireccion();
       }
   }
   ```

2. **Añadir Métodos Personalizados**:
   - Modificar directamente las clases generadas para añadir nuevos métodos. Sin embargo, esta práctica puede dificultar la regeneración del código.

   ```java
   public class Cliente {
       // Código generado...

       // Método personalizado
       public String getNombreCompleto() {
           return this.nombre + " " + this.direccion;
       }
   }
   ```

3. **Utilizar Interfaces y Implementaciones**:
   - Definir interfaces para la lógica de negocio y proporcionar implementaciones personalizadas.

   ```java
   public interface ClienteService {
       void validarCliente(Cliente cliente);
   }

   public class ClienteServiceImpl implements ClienteService {
       @Override
       public void validarCliente(Cliente cliente) {
           // Lógica de validación personalizada
           if (cliente.getEdad() < 18) {
               throw new IllegalArgumentException("El cliente debe ser mayor de 18 años");
           }
       }
   }
   ```

4. **Configurar Archivos de Persistencia**:
   - Personalizar configuraciones de persistencia en archivos como `application.properties` o mediante anotaciones en las entidades.

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/mi_base_de_datos
   spring.datasource.username=usuario
   spring.datasource.password=contraseña
   ```

#### 4. Ejemplo Completo: Extensión y Personalización

**Modelo en Legio**:

```legio
entity Cliente {
    @Id int id;
    String nombre;
    String direccion;
    @Range(min=18, max=99) int edad;
}

entity Pedido {
    @Id int id;
    Date fecha;
    double total;
    Cliente cliente;
}
```

**Generación de Código**:
- Ejecutar el generador de código para transformar el modelo en clases Java.

**Personalización del Servicio de Cliente**:

```java
public interface ClienteService {
    void validarCliente(Cliente cliente);
    String getNombreCompleto(Cliente cliente);
}

public class ClienteServiceImpl implements ClienteService {
    @Override
    public void validarCliente(Cliente cliente) {
        if (cliente.getEdad() < 18) {
            throw new IllegalArgumentException("El cliente debe ser mayor de 18 años");
        }
    }

    @Override
    public String getNombreCompleto(Cliente cliente) {
        return cliente.getNombre() + " " + cliente.getDireccion();
    }
}
```

**Configuración de la Persistencia**:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mi_base_de_datos
spring.datasource.username=usuario
spring.datasource.password=contraseña
spring.jpa.hibernate.ddl-auto=update
```

### Resumen

El Intino Framework proporciona una poderosa herramienta para la generación automática de código a partir de modelos definidos en Legio DLS. Este proceso facilita el desarrollo rápido y eficiente de aplicaciones empresariales. Sin embargo, es común que se necesite personalizar y extender el código generado para cumplir con requisitos específicos. Comprender cómo realizar estas personalizaciones y extensiones es crucial para aprovechar al máximo las capacidades del Intino Framework y desarrollar aplicaciones robustas y adaptadas a las necesidades del negocio.