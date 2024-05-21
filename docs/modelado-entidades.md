### Modelado de Entidades en Intino Framework

El modelado de entidades es un componente esencial en el desarrollo de aplicaciones con el Intino Framework. Este proceso implica definir las estructuras de datos y sus relaciones utilizando Legio DLS (Domain Specific Language). A continuación se explica cómo modelar entidades y relaciones en Intino.

#### 1. Conceptos Básicos

**Entidad**: 
Una entidad representa un objeto del mundo real o un concepto dentro del dominio de la aplicación. Por ejemplo, `Cliente`, `Producto` y `Pedido` pueden ser entidades en una aplicación de gestión de ventas.

**Atributo**:
Un atributo es una propiedad o característica de una entidad. Por ejemplo, un `Cliente` puede tener atributos como `nombre`, `dirección` y `edad`.

**Relación**:
Las relaciones describen cómo se asocian las entidades entre sí. Por ejemplo, un `Pedido` puede estar asociado con un `Cliente`.

#### 2. Definición de Entidades

Para definir una entidad en Legio DLS, se utiliza la palabra clave `entity`, seguida del nombre de la entidad y un bloque que contiene los atributos.

**Ejemplo: Definición de una entidad simple**

```legio
entity Cliente {
    String nombre;
    String direccion;
    int edad;
}
```

**Descripción**:
- `Cliente` es una entidad con tres atributos: `nombre` (de tipo `String`), `direccion` (de tipo `String`) y `edad` (de tipo `int`).

#### 3. Definición de Relaciones entre Entidades

Las relaciones entre entidades se definen utilizando los tipos de otras entidades como atributos.

**Ejemplo: Relación entre `Pedido` y `Cliente`**

```legio
entity Pedido {
    Date fecha;
    double total;
    Cliente cliente;
}
```

**Descripción**:
- `Pedido` es una entidad que tiene una relación con `Cliente`, indicada por el atributo `cliente`.

#### 4. Atributos Avanzados y Validaciones

Los atributos pueden tener características avanzadas como claves primarias, restricciones y validaciones.

**Ejemplo: Definición de un atributo con clave primaria y validación**

```legio
entity Cliente {
    @Id int id;
    String nombre;
    String direccion;
    @Range(min=18, max=99) int edad;
}
```

**Descripción**:
- `id` es un atributo que actúa como clave primaria, indicado por `@Id`.
- `edad` tiene una validación que restringe sus valores entre 18 y 99, indicada por `@Range(min=18, max=99)`.

#### 5. Herencia entre Entidades

Legio DLS permite definir herencia entre entidades, lo que facilita la reutilización de atributos y comportamientos comunes.

**Ejemplo: Herencia entre entidades**

```legio
entity Persona {
    String nombre;
    String direccion;
}

entity Cliente extends Persona {
    int edad;
}

entity Empleado extends Persona {
    String departamento;
    double salario;
}
```

**Descripción**:
- `Persona` es una entidad base con atributos `nombre` y `direccion`.
- `Cliente` y `Empleado` extienden `Persona`, heredando sus atributos y añadiendo los suyos propios (`edad` para `Cliente` y `departamento`, `salario` para `Empleado`).

#### 6. Definición de Reglas de Negocio

Las reglas de negocio se utilizan para definir lógica y restricciones que deben cumplirse en los datos de las entidades.

**Ejemplo: Regla de negocio para validar la edad del cliente**

```legio
rule validarEdad {
    Cliente.edad >= 18;
}
```

**Descripción**:
- `validarEdad` es una regla de negocio que asegura que la `edad` de un `Cliente` sea mayor o igual a 18.

#### Ejemplo Completo

A continuación se presenta un ejemplo completo que combina los conceptos anteriores:

```legio
entity Persona {
    String nombre;
    String direccion;
}

entity Cliente extends Persona {
    @Id int id;
    @Range(min=18, max=99) int edad;
    List<Pedido> pedidos;
}

entity Pedido {
    @Id int id;
    Date fecha;
    double total;
    Cliente cliente;
}

rule validarEdad {
    Cliente.edad >= 18;
}
```

### Descripción del Ejemplo Completo

1. **Entidad `Persona`**:
   - Base para `Cliente` con atributos `nombre` y `direccion`.

2. **Entidad `Cliente`**:
   - Extiende `Persona` e incluye un atributo `id` como clave primaria, una validación de rango para `edad`, y una lista de `Pedido` asociada.

3. **Entidad `Pedido`**:
   - Tiene atributos `id` (clave primaria), `fecha`, `total` y una relación con `Cliente`.

4. **Regla de Negocio `validarEdad`**:
   - Asegura que la edad del `Cliente` sea mayor o igual a 18.

### Resumen

El modelado de entidades en Intino Framework utilizando Legio DLS implica definir entidades, atributos y relaciones de manera clara y concisa. Además, permite incorporar validaciones, herencia y reglas de negocio para asegurar que los datos cumplan con las restricciones y lógica del negocio. Esta capacidad de modelado avanzado facilita el desarrollo de aplicaciones empresariales robustas y mantenibles.