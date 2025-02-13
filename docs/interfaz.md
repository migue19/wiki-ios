### Generación de Interfaces Básicas en Intino Framework

El Intino Framework facilita la generación de interfaces de usuario (UI) básicas a partir de los modelos definidos en Legio DLS. A continuación se detalla cómo se puede generar, personalizar y extender interfaces de usuario utilizando Intino.

#### 1. Introducción a la Generación de Interfaces

El proceso de generación de interfaces en Intino consiste en transformar los modelos de dominio definidos en Legio DLS en componentes de interfaz de usuario básicos. Estos componentes permiten a los usuarios interactuar con los datos almacenados y procesados en el sistema.

#### 2. Definición del Modelo en Legio

Antes de generar una interfaz, es necesario definir las entidades y sus relaciones en el archivo `model.legio`.

**Ejemplo de Definición de Modelo:**

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

#### 3. Generación Automática de Interfaces

El Intino Framework puede generar automáticamente formularios y vistas básicas a partir de los modelos definidos. Este proceso crea componentes de interfaz de usuario que permiten la visualización, creación, actualización y eliminación de registros de las entidades.

**Pasos para la Generación de Interfaces:**

1. **Ejecutar el Generador de Código de UI:**
   - Utilizar el comando de generación de código del Intino Framework para transformar los modelos en componentes de UI.

   ```sh
   intino generate-ui
   ```

2. **Revisión de la Estructura Generada:**
   - El código generado se ubicará en el directorio `src/main/webapp/` o en una estructura similar dentro del proyecto.

**Ejemplo de Código Generado para la Entidad `Cliente`:**

- **Formulario de Cliente (HTML/JavaScript):**

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Cliente Form</title>
  </head>
  <body>
      <h1>Cliente Form</h1>
      <form id="clienteForm">
          <label for="id">ID:</label>
          <input type="text" id="id" name="id"><br><br>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre"><br><br>
          <label for="direccion">Direccion:</label>
          <input type="text" id="direccion" name="direccion"><br><br>
          <label for="edad">Edad:</label>
          <input type="number" id="edad" name="edad" min="18" max="99"><br><br>
          <button type="submit">Submit</button>
      </form>
  </body>
  </html>
  ```

- **Script de Cliente (JavaScript):**

  ```javascript
  document.getElementById('clienteForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const cliente = {
          id: document.getElementById('id').value,
          nombre: document.getElementById('nombre').value,
          direccion: document.getElementById('direccion').value,
          edad: document.getElementById('edad').value
      };
      fetch('/api/clientes', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(cliente)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  });
  ```

#### 4. Personalización y Extensión de Interfaces

Aunque el Intino Framework genera interfaces básicas automáticamente, es común que se necesiten personalizar y extender estos componentes para cumplir con requisitos específicos de diseño y funcionalidad.

**Métodos para Personalizar y Extender Interfaces:**

1. **Modificar Plantillas Generadas:**
   - Ajustar las plantillas HTML y scripts JavaScript generados para mejorar la apariencia y funcionalidad.

   ```html
   <form id="clienteForm" class="form-horizontal">
       <!-- Añadir clases CSS para mejor estilo -->
       <div class="form-group">
           <label for="id">ID:</label>
           <input type="text" id="id" name="id" class="form-control">
       </div>
       <!-- Más campos de formulario -->
   </form>
   ```

2. **Añadir Funcionalidades Adicionales:**
   - Implementar validaciones adicionales, interacciones con APIs externas, y manejo avanzado de eventos.

   ```javascript
   document.getElementById('clienteForm').addEventListener('submit', function(event) {
       event.preventDefault();
       const edad = document.getElementById('edad').value;
       if (edad < 18 || edad > 99) {
           alert('La edad debe estar entre 18 y 99 años.');
           return;
       }
       // Proceso de envío de formulario
   });
   ```

3. **Integrar con Frameworks de UI:**
   - Integrar las interfaces generadas con frameworks de UI modernos como React, Angular o Vue.js para mejorar la experiencia de usuario.

**Ejemplo de Integración con React:**

- **Componentes de Cliente en React:**

  ```javascript
  import React, { useState } from 'react';

  const ClienteForm = () => {
      const [cliente, setCliente] = useState({
          id: '',
          nombre: '',
          direccion: '',
          edad: ''
      });

      const handleChange = (e) => {
          const { name, value } = e.target;
          setCliente({ ...cliente, [name]: value });
      };

      const handleSubmit = (e) => {
          e.preventDefault();
          fetch('/api/clientes', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(cliente)
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
      };

      return (
          <form onSubmit={handleSubmit}>
              <label>
                  ID:
                  <input type="text" name="id" value={cliente.id} onChange={handleChange} />
              </label>
              <label>
                  Nombre:
                  <input type="text" name="nombre" value={cliente.nombre} onChange={handleChange} />
              </label>
              <label>
                  Direccion:
                  <input type="text" name="direccion" value={cliente.direccion} onChange={handleChange} />
              </label>
              <label>
                  Edad:
                  <input type="number" name="edad" value={cliente.edad} onChange={handleChange} min="18" max="99" />
              </label>
              <button type="submit">Submit</button>
          </form>
      );
  };

  export default ClienteForm;
  ```

#### 5. Ejemplo Completo: Proyecto con Interfaces Generadas y Personalizadas

**Modelo en Legio:**

```legio
entity Cliente {
    @Id int id;
    String nombre;
    String direccion;
    @Range(min=18, max=99) int edad;
}
```

**Generación Automática de Interfaces:**

```sh
intino generate-ui
```

**Personalización y Extensión:**

- **HTML Generado Modificado:**

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Cliente Form</title>
      <link rel="stylesheet" href="styles.css"> <!-- Integrar CSS personalizado -->
  </head>
  <body>
      <h1>Cliente Form</h1>
      <form id="clienteForm" class="form-horizontal">
          <div class="form-group">
              <label for="id">ID:</label>
              <input type="text" id="id" name="id" class="form-control">
          </div>
          <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" class="form-control">
          </div>
          <div class="form-group">
              <label for="direccion">Direccion:</label>
              <input type="text" id="direccion" name="direccion" class="form-control">
          </div>
          <div class="form-group">
              <label for="edad">Edad:</label>
              <input type="number" id="edad" name="edad" class="form-control" min="18" max="99">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  </body>
  </html>
  ```

- **JavaScript Generado Modificado:**

  ```javascript
  document.getElementById('clienteForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const edad = document.getElementById('edad').value;
      if (edad < 18 || edad > 99) {
          alert('La edad debe estar entre 18 y 99 años.');
          return;
      }
      const cliente = {
          id: document.getElementById('id').value,
          nombre: document.getElementById('nombre').value,
          direccion: document.getElementById('direccion').value,
          edad: document.getElementById('edad').value
      };
      fetch('/api/clientes', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(cliente)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  });
  ```

#### Resumen

El Intino Framework proporciona herramientas para la generación automática de interfaces de usuario básicas a partir de modelos definidos en Legio DLS. Aunque estas interfaces generadas proporcionan una base sólida, es común que se necesite personalizar y extender estas interfaces para cumplir con los requisitos específicos del proyecto. Mediante la modificación de plantillas, la integración con frameworks de UI modernos y la implementación de funcionalidades adicionales, los desarrolladores pueden crear interfaces de usuario robustas y adaptadas a las necesidades del negocio.