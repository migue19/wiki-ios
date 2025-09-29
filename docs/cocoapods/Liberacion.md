# Liberar Pod público

# 1) Preparar versión

**Changelog**

* Actualiza el `CHANGELOG.md` con el numero de version, fecha y bullets de cambios.
```bash
**1.0.2**-*17 de Septiembre 2025*
    - Se corrige el log para imprimir los detalles de la peticion en modo debug.
    - Se corrige el error cuando el response no es HTTPURLResponse.
    - Se validan correntamente los estatus de exito 200...299.
    - Se agrega logica para 400's y 500's.
    - Se actualiza el minimum deploy target a iOS 13.
    - Update README.md
```

**Marketing Version (Xcode)**

```bash
# En la raíz del proyecto Xcode del Pod
agvtool new-marketing-version 1.1.4
# (Opcional) Aumenta build number si usas CURRENT_PROJECT_VERSION
agvtool new-version 114
```

**Podspec**

* Sube `s.version = "1.1.4"`.
* Asegúrate de tener:

  * `s.source = { :git => "https://github.com/tu-org/tu-repo.git", :tag => s.version.to_s }`
  * `s.ios.deployment_target = "12.0"` (o el que uses)
  * `s.swift_versions = ["5.0", "5.9"]` (o una sola: `s.swift_version = "5.9"`)
  * `s.license`, `s.homepage`, `s.summary`, `s.source_files`, `s.resources` correctos.

> **Tip:** Si usas recursos, valida rutas reales (globs) y evita incluir carpetas enteras innecesarias.

# 2) Prueba local (antes de etiquetar)

**Opción A (lint local del spec sin tag):**
En el `.podspec`, temporalmente apunta a tu rama actual:

```ruby
s.source = { :git => "https://github.com/tu-org/tu-repo.git", :branch => "tu-rama" }
```

Lint:

```bash
pod spec lint TU_LIB.podspec --allow-warnings --no-clean --verbose
```

**Opción B (lint del código sin depender del spec remoto):**

```bash
pod lib lint --allow-warnings --no-clean --verbose
```

**Opción C (probar en app ejemplo):**
En el `Podfile` de una app de pruebas:

```ruby
pod 'TU_LIB', :path => '../TU_LIB'   # si está local
# o
pod 'TU_LIB', :git => 'https://github.com/tu-org/tu-repo.git', :branch => 'tu-rama'
```

Luego:

```bash
pod install
```

# 3) Crear TAG y empujar

Cuando pase el lint local, regresa el `podspec` a `:tag`:

```ruby
s.source = { :git => "https://github.com/tu-org/tu-repo.git", :tag => s.version.to_s }
```

Crea el tag y súbelo:

```bash
git add .
git commit -m "Release 1.1.4"
git tag 1.1.4
git push origin main
git push --tags
```

# 4) Validar con el tag

```bash
pod spec lint TU_LIB.podspec --allow-warnings --no-clean --verbose
```

# 5) Registrar y verificar sesión (solo 1ª vez)

```bash
pod trunk register miguelmexicano18@gmail.com 'Miguel Mexicano Herrera' --description='Mac Mini'
# Revisa tu correo y confirma el enlace de CocoaPods
pod trunk me
```

# 6) Publicar al trunk

```bash
pod trunk push TU_LIB.podspec --allow-warnings --verbose --synchronous
```

# 7) Verificación post-release

```bash
pod trunk info TU_LIB
pod repo update
pod search TU_LIB
```

---

## Troubleshooting rápido

* **“The `source` does not specify a tag”**: asegúrate de `:tag => s.version.to_s` y que el **tag exista y esté pusheado**.
* **Archivos no encontrados**: revisa `s.source_files`/`s.resources` (globs) y directorios reales.
* **Swift version**: usa `s.swift_versions = [...]` o `s.swift_version = "5.x"` consistente con tu `SWIFT_VERSION` del proyecto.
* **Warnings**: usa `--allow-warnings` pero intenta mantenerlos en cero para futuras versiones.
* **Licencia/Homepage**: requeridos; si falta, el push falla.
* **Repos privados**: `s.source` debe apuntar a un repo **público** accesible.

---

## Template mínimo de `.podspec`

```ruby
Pod::Spec.new do |s|
  s.name             = 'TU_LIB'
  s.version          = '1.1.4'
  s.summary          = 'Descripción corta.'
  s.description      = <<-DESC
  Descripción larga del Pod.
  DESC
  s.homepage         = 'https://github.com/tu-org/tu-repo'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'Miguel Mexicano Herrera' => 'miguelmexicano18@gmail.com' }
  s.source           = { :git => 'https://github.com/tu-org/tu-repo.git', :tag => s.version.to_s }

  s.platform         = :ios, '12.0'
  s.swift_versions   = ['5.0', '5.9']
  # o: s.swift_version = '5.9'

  s.source_files     = 'Sources/**/*.{swift}'
  s.resources        = ['Resources/**/*']
  # s.resource_bundles = { 'TU_LIB_Resources' => ['Resources/**/*'] }

  # Si tienes dependencias:
  # s.dependency 'Alamofire', '~> 5.8'
end
```

---

## Flujo “todo en uno” (copy-paste)

> Ajusta nombres y versión antes de correr.

```bash
# 1) Bump versión de marketing/build (opcional)
agvtool new-marketing-version 1.1.4
agvtool new-version -all 114

# 2) Edita TU_LIB.podspec: s.version="1.1.4" y s.source con :branch para probar
pod lib lint --allow-warnings --no-clean --verbose || exit 1
pod spec lint TU_LIB.podspec --allow-warnings --no-clean --verbose || exit 1

# 3) Cambia s.source a :tag => s.version, commit + tag
git add .
git commit -m "Release 1.1.4"
git tag 1.1.4
git push origin main
git push --tags

# 4) Lint con tag
pod spec lint TU_LIB.podspec --allow-warnings --no-clean --verbose || exit 1

# 5) (Solo primera vez) trunk register y confirmar por correo
pod trunk me

# 6) Push
pod trunk push TU_LIB.podspec --allow-warnings --verbose --synchronous

# 7) Verificar
pod trunk info TU_LIB
```

Si quieres, dime el nombre real del Pod y te genero el `.podspec` listo y un script Bash que automatice el flujo con tu versión, rama y tag.
