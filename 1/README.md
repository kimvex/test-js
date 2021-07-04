# Ejercicio 1

El fragmento de código de nuestro fichero `test.js` nos devuelve un output no 
deseado. Queremos imprimir un valor incremental a cada segundo pero lo que 
nos devuelve el código es el mismo valor en cada iteración. 

1. Sin necesidad de ejecutar el código, ¿sabrías decirnos qué valor imprimiría
 por consola el script? ¿Cuál es el motivo?
 - Después de revisar unos minutos me di cuenta que estará retornando el valor 4 o 5 en todas las veces podría ser 5 veces 4 o 5 veces 5
 - El motivo se debe a que esta declarado con el tipo de variable `var` el cual toma un valor global, pertenece al scope superior como al bloque local de donde fue declarada, por ese motivo la variable se estará actualizando a si misma y cuando termine el `setTimeout` su valor sera el ultimo almacenado en ella.
2. Sabiendo que el output que buscamos es el que encuentras bajo estas líneas… 
¿Cómo solucionarías el fragmento de código para que el output sea el deseado?

```
    > 0
    > 1
    > 2
    > 3
    > 4
```