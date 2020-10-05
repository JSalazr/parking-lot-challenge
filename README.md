# Parking Lot Challenge

Esta aplicación es un API diseñana para un estacionamiento. El API es capaz de calcular cantidades de cobro dependiendo del tipo de vehículos estacionado en dicho estacionamiento.

# Tecnologías
La aplicación fue desarrollada con Node.js usando Javascript como su lenguaje.
Como framewrok se utilizó [Express](https://expressjs.com/) y [Express-Gateway](https://expressjs.com/) para crear el Gateway que da el acceso a los microservicios.
Como Base de datos se utilizó [MongoDB](https://www.mongodb.com/es) y como ODM [Mongoose](https://mongoosejs.com).

# Instalacion
La instalación es bastante sencilla, abriendo una consola en la raiz del proyecto correr el comando `npm install`.

# Correr la Aplicación
Para poder correr la aplicación luego de la instalación, se debe agregar un archivo `.env` con el siguiente formato:
```
MONGO_CONNECTION_STRING=*string de conexion a la base de datos de MongoDB*
MONGO_VEHICLE=*DB de Vehículoss*
MONGO_PARKING_LOT=*DB de Parqueo*
```

Igualmente se debe crear un usuario por medio de la consola para poder conseguir las credenciales. Las instrucciones se encuentran [aquí](https://www.express-gateway.io/implementing-key-auth/).

Al crear un usuario se consigue un `keyId` y un `keySecret`. Para que la autenticación funcione se debe agregar el header de *Authorization* con formato `apiKey *keyId*:*keySecret*` al momento de hacer cualquier solicitud al API.

# Arquitectura
La aplicación como tal esta divida en tres partes:
- **API Gateway:**
  - Como se mencionó anteriormente, esta parte la aplicación fue creada con [Express-Gateway](https://expressjs.com/). Esta parte de la aplicación es la que se encarga de la autenticación. 
- **Microservicio de Vehicle:**
  - Este servicio contiene la información de los vehículos al igual de que tipo son.
  - Modelos:
    - Vehicles - Contiene información de los vehículos.
    - VehicleTypes - Contiene los tipos de vehículos.
  - Endpoints:
    - GET `/vehicles` - Obtener lista de vehículos.
    - POST `/vehicles` - Crear un nuevo vehículo.
    - GET `/vehicles/:licensePlate` - Buscar un vehículo por medio de su placa.
    - PUT `/vehicles/:licensePlate/:vehicleType` - Le aplica un tipo de vehículo al vehículo especificado.
    - GET `/vehicleTypes` - Obtener lista de tipos de vehículos.
    - GET `/vehicleTypes/:typeText` - Buscar un tipo de vehículo.
    - POST `/vehicleTypes` - Crear un nuevo tipo de vehículo.
- **Microservicio de Parking Lot:**
  - Este servicio contiene el registro de todos los vehículoss que se estacionan.
  - Modelos:
    - ParkingStay - Contiene el registro de todos los vehículoss estacionados.
    - ResidentTime - Contiene la estadía en minutos de cada vehículo residente del presente mes.
  - Endpoints:
    - GET `/parkingStays` - Obtener lista estadías activas de vehículos.
    - POST `/parkingStays/entrance` - Registra la entrada de un vehículo al estacionamiento.
    - PUT `/parkingStays/exit` - Registra la salida de un vehículo del estacionamiento.
    - PUT `/vehicles/newMonth` - Desactiva todos los registros activos y borra los registros de tiempo de estadía de vehículos residentes.
    - GET `/parkingStays/residentReport` - Genera un reporte de cuanto se debe pagar cada vehículo de residente.

## Casos de Uso
### Ingresar al sistema
Como se mencionó anteriormente, para poder accesar al sistema se debe agregar el header de `Authorization` con formato `apiKey *keyId*:*keySecret*` al momento de hacer cualquier solicitud al API.

### Creación de datos de prueba
Primero crearemos los 2 tipos de vehículos usando POST `http://localhost:8080/vehicleTypes` usando los siguientes datos:
```
//1
{
    "type": "Resident"
}
//2
{
    "type": "Official"
}
```

Luego los 3 vehículos que usaremos usando POST `http://localhost:8080/vehicles` y los siguientes datos:

```
//1
{
    "licensePlate": "PEC1234"
}
//2
{
    "licensePlate": "PEC5678"
}
//3
{
    "licensePlate": "PEC0000"
}
```

### Dar de alta vehículo oficial 
El endpoint hace una solicitud al microservicio de Vehículoss para conseguir el `id` del tipo de vehículo Oficial. Luego le asigna ese `id` al vehículo especificado.

Usando PUT `http://localhost:8080/vehicles/PEC1234/Official`.

### Dar de alta vehículo de residente 
El endpoint hace una solicitud al microservicio de Vehículoss para conseguir el `id` del tipo de vehículo Residente. Luego le asigna ese `id` al vehículo especificado.

Usando PUT `http://localhost:8080/vehicles/PEC5678/Resident`.

### Registrar entrada 
Antes de hacer el registro se valida que el vehículo no tenga un registro vigente (es decir que tenga una fecha de entrada pero no de salida).

Utilizando POST `http://localhost:8080/parkingStays/entrance` haremos 3 registros, uno para cada vehículos con los siguientes datos:

```
//1
{
    "licensePlate": "PEC1234"
}
//2
{
    "licensePlate": "PEC5678"
}
//3
{
    "licensePlate": "PEC0000"
}
```


### Registrar salida 
Al igual que al registrar una entrada, primero se revisa que el vehículo tenga una estadía vigente antes de guardar la salida. Se retorna el total a pagar, los vehículos No Residentes muestran su total a pagar mientras que los Oficiales y Residentes muestran un total de 0.

Utilizando PUT `http://localhost:8080/parkingStays/exit` haremos 3 solicitudes, uno para cada vehículos con los siguientes datos:

```
//1 - retorna el total a pagar en 0.
{
    "licensePlate": "PEC1234"
}
//2 - retorna el total a pagar en 0.
{
    "licensePlate": "PEC5678"
}
//3 - retorna el total a pagar basado en el tiempo de estadía.
{
    "licensePlate": "PEC0000"
}
```

### Pago de residentes
Genera un archivo `.csv` con el tiempo total en minutos que cada vehículo de tipo residente estuvo estacionado. Ademas del total a pagar de cada vehículos.

Usando GET `http://localhost:8080/parkingStays/residentReport`.
 

### Comienza mes
Este endpoint hace 2 funciones:
  - Los registros en el modelo de ParkStays los mueve a desactivado.
  - Borra los registros en el modelo de ResidentTimes.

Usando PUT `http://localhost:8080/parkingStays/newMonth`.
