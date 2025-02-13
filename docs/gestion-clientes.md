### Proyecto de Ejemplo 1: Gestión de Clientes

Este proyecto de ejemplo tiene como objetivo demostrar cómo usar el Intino Framework para desarrollar una aplicación básica de gestión de clientes. El proyecto abarcará desde la definición del modelo en Legio DLS hasta la generación automática de código y la personalización de la interfaz de usuario.

#### 1. Definición del Modelo en Legio DLS

Primero, definimos las entidades necesarias en el archivo `model.legio`. En este caso, necesitamos una entidad `Cliente`.

**Archivo `model.legio`:**

```legio
entity Cliente {
    @Id int id;
    String nombre;
    String direccion;
    @Range(min=18, max=99) int edad;
}
```

#### 2. Generación de Código

Ejecutamos el generador de código de Intino para transformar los modelos definidos en clases Java y otros componentes necesarios.

**Comando para Generar Código:**

```sh
intino generate
```

Este comando generará las clases Java para la entidad `Cliente` y otras configuraciones necesarias para la persistencia y gestión de datos.

#### 3. Configuración de la Persistencia

Configuramos la persistencia de datos utilizando Spring Boot y una base de datos relacional como MySQL.

**Archivo `application.properties`:**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/clientesdb
spring.datasource.username=usuario
spring.datasource.password=contraseña
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

#### 4. Código Java Generado

Revisamos y ajustamos las clases generadas si es necesario.

**Clase `Cliente`:**

```java
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "clientes")
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

**Repositorio `ClienteRepository`:**

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
```

#### 5. Desarrollo del Servicio y Controlador

Desarrollamos el servicio y el controlador para gestionar las operaciones CRUD de `Cliente`.

**Servicio `ClienteService`:**

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    public Cliente getClienteById(int id) {
        return clienteRepository.findById(id).orElse(null);
    }

    public Cliente saveOrUpdateCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void deleteCliente(int id) {
        clienteRepository.deleteById(id);
    }
}
```

**Controlador `ClienteController`:**

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.getAllClientes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable int id) {
        Cliente cliente = clienteService.getClienteById(id);
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cliente);
    }

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteService.saveOrUpdateCliente(cliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable int id, @RequestBody Cliente clienteDetails) {
        Cliente cliente = clienteService.getClienteById(id);
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }
        cliente.setNombre(clienteDetails.getNombre());
        cliente.setDireccion(clienteDetails.getDireccion());
        cliente.setEdad(clienteDetails.getEdad());
        Cliente updatedCliente = clienteService.saveOrUpdateCliente(cliente);
        return ResponseEntity.ok(updatedCliente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable int id) {
        Cliente cliente = clienteService.getClienteById(id);
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }
        clienteService.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }
}
```

#### 6. Generación y Personalización de la Interfaz de Usuario

Utilizamos la generación automática de interfaces para crear formularios básicos y vistas para la entidad `Cliente`.

**HTML Generado para el Formulario de Cliente:**

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
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" name="direccion"><br><br>
        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" min="18" max="99"><br><br>
        <button type="submit">Enviar</button>
    </form>

    <script>
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
    </script>
</body>
</html>
```

#### 7. Ejecución y Pruebas

Iniciamos la aplicación Spring Boot y accedemos a la interfaz de usuario generada para probar las funcionalidades CRUD de `Cliente`.

```sh
mvn spring-boot:run
```

Accedemos a la URL `http://localhost:8080/clienteForm.html` para interactuar con la interfaz de usuario.

#### 8. Resumen

Este proyecto de ejemplo demuestra cómo utilizar el Intino Framework para desarrollar una aplicación básica de gestión de clientes. Desde la definición del modelo en Legio DLS hasta la generación y personalización de interfaces de usuario, el Intino Framework proporciona herramientas poderosas para acelerar el desarrollo y mantener la consistencia entre el modelo de datos y la implementación.