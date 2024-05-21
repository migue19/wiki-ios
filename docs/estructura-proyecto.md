### Estructura del Proyecto en Intino

Para aprovechar al máximo las capacidades del Intino Framework, es fundamental entender cómo se organiza un proyecto típico. A continuación se describe la estructura estándar de un proyecto en Intino, detallando los directorios y archivos principales que lo componen.

#### Estructura de Directorios y Archivos

Un proyecto típico en Intino Framework sigue una estructura organizada para facilitar el desarrollo, la gestión de modelos y la generación de código. A continuación se presenta una descripción de los directorios y archivos más importantes:

```
mi-proyecto/
├── src/
│   ├── main/
│   │   ├── java/
│   │   ├── resources/
│   │   └── legio/
│   │       └── model.legio
│   ├── test/
│   │   ├── java/
│   │   └── resources/
├── build/
├── lib/
├── config/
│   └── application.properties
├── scripts/
├── docs/
├── README.md
├── build.gradle
└── settings.gradle
```

#### Descripción de los Directorios y Archivos Principales

1. **src/**:
   - Contiene el código fuente del proyecto.

   - **main/**:
     - **java/**: Directorio para el código fuente Java de la aplicación.
     - **resources/**: Directorio para archivos de recursos como archivos de configuración, plantillas y otros recursos estáticos.
     - **legio/**: Directorio donde se definen los modelos Legio. El archivo principal es `model.legio`.

     ```legio
     // Ejemplo de un archivo Legio
     entity Cliente {
         String nombre;
         String direccion;
         int edad;
     }
     ```

   - **test/**:
     - **java/**: Directorio para el código fuente de las pruebas unitarias.
     - **resources/**: Directorio para archivos de recursos necesarios para las pruebas.

2. **build/**:
   - Contiene los archivos generados durante el proceso de compilación, como clases compiladas y artefactos empaquetados.

3. **lib/**:
   - Directorio para librerías externas que no se manejan a través de un gestor de dependencias (por ejemplo, JARs específicos).

4. **config/**:
   - Contiene archivos de configuración del proyecto.
   - **application.properties**: Archivo de configuración principal donde se definen propiedades de la aplicación, como configuración de base de datos, parámetros de la aplicación, etc.

     ```properties
     db.url=jdbc:mysql://localhost:3306/mi_base_de_datos
     db.username=usuario
     db.password=contraseña
     ```

5. **scripts/**:
   - Directorio para scripts auxiliares que pueden ser utilizados para tareas de automatización, despliegue, etc.

6. **docs/**:
   - Contiene la documentación del proyecto, como manuales de usuario, documentación técnica, etc.

7. **README.md**:
   - Archivo de texto que proporciona una descripción general del proyecto, incluyendo cómo configurarlo, ejecutarlo y contribuir a él.

8. **build.gradle**:
   - Archivo de configuración de Gradle donde se definen las tareas de construcción, dependencias y otros parámetros del proceso de construcción.

     ```groovy
     plugins {
         id 'java'
     }

     group 'com.miproyecto'
     version '1.0-SNAPSHOT'

     repositories {
         mavenCentral()
     }

     dependencies {
         implementation 'org.springframework.boot:spring-boot-starter'
         testImplementation 'org.springframework.boot:spring-boot-starter-test'
     }
     ```

9. **settings.gradle**:
   - Archivo de configuración de Gradle para proyectos multiproyecto, donde se definen las configuraciones globales del proyecto.

     ```groovy
     rootProject.name = 'mi-proyecto'
     ```

### Detalles Adicionales sobre el Archivo `model.legio`

El archivo `model.legio` es fundamental en un proyecto Intino, ya que contiene las definiciones de los modelos de dominio. Aquí se define la estructura de datos, relaciones y reglas de negocio que serán utilizadas por el generador de código para crear la implementación de la aplicación.

```legio
// Ejemplo de archivo Legio
entity Cliente {
    String nombre;
    String direccion;
    int edad;
}

entity Pedido {
    Date fecha;
    double total;
    Cliente cliente;
}

rule validarEdad {
    Cliente.edad >= 18;
}
```

### Proceso de Generación de Código

1. **Definición del Modelo**:
   - Los desarrolladores crean y editan el archivo `model.legio` para definir las entidades, atributos, relaciones y reglas de negocio.

2. **Generación de Código**:
   - El framework procesa el archivo `model.legio` y genera el código fuente correspondiente en el directorio `src/main/java/`.

3. **Personalización del Código**:
   - Los desarrolladores pueden personalizar y extender el código generado para añadir lógica específica y adaptar la aplicación a los requisitos particulares.

### Resumen

La estructura del proyecto en Intino está diseñada para ser clara y organizada, facilitando el desarrollo, la gestión de modelos y la generación de código. Comprender esta estructura es crucial para trabajar eficientemente con el Intino Framework, permitiendo a los desarrolladores centrarse en la lógica de negocio y beneficiarse de las capacidades de automatización y modularidad que ofrece el framework.